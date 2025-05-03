// import {loginInfo} from "./login.mjs"; //You can put your login info (see Line 93 for more info) in your own file like I did if you want, or just slap in in the same file
import { randomUUID, randomBytes, createHash } from "crypto"; 
import {botLog} from "./logging.mjs";
import fs from "fs";

const baseAPIURL = "https://api.resonite.com";
const botUID = GenerateUID();

//I just ripped the class and login function from my mvcontact-bot project
class TestingBot {
    constructor(inConfig) {
        super();
        this.config = {
            "username": inConfig.username,
            "password": inConfig.password,
            "TOTP": inConfig.TOTP ?? "",
            "logToFile": inConfig.logToFile ?? true,
            "logPath": inConfig.logPath ?? "./"
        }
        this.data = {
            "currentMachineID": GenerateRandomMachineId(),
            "sessionId": randomUUID(),
            "userId": "",
            "token": "",
            "fullToken": "",
            "tokenExpiry": "",
            "loggedIn": false,
            "whitelist": []
        }
        this.autoRunners = {};
        this.signalRConnection = undefined;
        this.logger = new botLog(this.config.username, this.config.logToFile, this.config.logPath);
    }

    async login() {
        const loginData = {
            "username": this.config.username,
            "authentication": {
                "$type": "password",
                "password": this.config.password
            },
            "rememberMe": false,
            "secretMachineId": this.data.currentMachineID
        };

        const res = await fetch(`${baseAPIURL}/userSessions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": JSON.stringify(loginData).length,
                    "UID": botUID,
                    "TOTP": this.config.TOTP
                },
                body: JSON.stringify(loginData)
            }
        );
        
        if (res.status === 200){
            const loginResponse = await res.json();
            this.data.userId = loginResponse.entity.userId;
            this.data.token = loginResponse.entity.token;
            this.data.fullToken = `res ${loginResponse.entity.userId}:${loginResponse.entity.token}`;
            this.data.tokenExpiry = loginResponse.entity.expire;
            this.data.loggedIn = true;
            await this.logger.log("INFO", `Successfully logged in as ${loginResponse.entity.userId}`);
        }
        else {
            await this.logger.log("ERROR", `Unexpected return code ${res.status}: ${await res.text()}`);
            throw new Error(`Unexpected return code ${res.status}: ${await res.text()}`);
        }
    }
}

function GenerateRandomMachineId(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    for (let i = 0; i < 128; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function GenerateUID(){
    let result = '';
    const data = `test-bot-${randomBytes(16).toString('base64')}`;
    result = createHash('sha256').update(data).digest('hex').toUpperCase();
    return result;
}

//Actual testing code starts here

const testBot = new TestingBot(loginInfo); //Follow the mvcontact-bot config schema for the login info: https://github.com/Lexevolution/mvcontact-bot/tree/main#config-schema
await testBot.login();

const testRecord = JSON.parse(fs.readFileSync("./TestRecord.json")); //Change to your own record

testRecord.creationTime = (new Date(Date.now())).toISOString();
testRecord.lastModificationTime = (new Date(Date.now())).toISOString();

testBot.logger.log("INFO", `Starting preprocess: ${baseAPIURL}/users/${testBot.data.userId}/records/${testRecord.id}/preprocess`);

const startPreprocess = await fetch(`${baseAPIURL}/users/${testBot.data.userId}/records/${testRecord.id}/preprocess`, {
    method: "POST",
    headers: {
        "Authorization": testBot.data.fullToken,
        "UID": botUID,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(testRecord)
});

if (!startPreprocess.ok){
    await testBot.logger.log("ERROR", await startPreprocess.text());
    throw new Error(await startPreprocess.text());
}

const preprocessResult = await startPreprocess.json();
testBot.logger.log("INFO", `Preprocess started: ${JSON.stringify(preprocessResult)}`);

let assetDiffs;
const pppCheckRunner = setInterval(preprocessProgressCheck, 1000);
let uploadedAssets = [];
let chunkedAssets = [];
let uploadedChunkedAssets = [];

async function preprocessProgressCheck(){
    testBot.logger.log("INFO", "Preprocess progress check");
    const pppCheckQuery = await fetch(`${baseAPIURL}/users/${testBot.data.userId}/records/${testRecord.id}/preprocess/${preprocessResult.id}`, {
        headers: {
            "Authorization": testBot.data.fullToken,
            "UID": botUID
        }
    });

    const pppCheckStatus = await pppCheckQuery.json();
    if (pppCheckStatus.state === "Success"){
        await testBot.logger.log("INFO", `Preprocess progress check finished: ${JSON.stringify(pppCheckStatus)}`);
        assetDiffs = pppCheckStatus.resultDiffs;
        clearInterval(pppCheckRunner);
        assetUpload();
    }
    else if (pppCheckStatus.state !== "Preprocessing"){
        await testBot.logger.log("ERROR", JSON.stringify(pppCheckStatus));
        throw new Error(JSON.stringify(pppCheckStatus));
    }
}

async function assetUpload() { //put every asset here and create a map array for them (replace the files & the hashmap)
    const imageFile = fs.readFileSync('./image.png');
    const dataTreeFile = fs.readFileSync('./Resonite Rulez ready.brson');
    const fileHashMap = [
        {"hash": createHash('sha256').update(dataTreeFile).digest('hex'), "file": dataTreeFile},
        {"hash": createHash('sha256').update(imageFile).digest('hex'), "file": imageFile}    
    ];

    await testBot.logger.log("INFO", `Imported files. Image: ${createHash('sha256').update(imageFile).digest('hex')}, DataTree: ${createHash('sha256').update(dataTreeFile).digest('hex')}`);
    const assetsToUpload = assetDiffs.filter((asset) => asset.isUploaded == false);

    if (assetsToUpload.length == 0){uploadRecord(chunkedAssets, uploadedChunkedAssets);}

    assetsToUpload.forEach(async asset => {
        await testBot.logger.log("INFO", `Starting asset upload: ${JSON.stringify(asset)}`);
        const requestAssetUploadData = await fetch(`${baseAPIURL}/users/${testBot.data.userId}/assets/${asset.hash}/upload?size=${asset.bytes}`, {
            method: "POST",
            headers: {
                "Authorization": testBot.data.fullToken,
                "UID": botUID
            }
        });

        if (!requestAssetUploadData.ok){
            const errMsg = await requestAssetUploadData.text();
            await testBot.logger.log("ERROR", errMsg);
            throw new Error(errMsg);
        }

        let assetUploadData = await requestAssetUploadData.json();
        await testBot.logger.log("INFO", `Asset upload requested: ${JSON.stringify(assetUploadData)}`);
        assetUploadData.chunks = null;

        let assetChunks = [];

        const chosenAsset = fileHashMap.find(fileData => fileData.hash == asset.hash);

        for (let i = 0; i < assetUploadData.totalChunks; i++) {
            assetChunks.push(chosenAsset.file.subarray(i * assetUploadData.chunkSize, (i+1) * assetUploadData.chunkSize));
        }

        if (!assetUploadData.isDirectUpload) {
            assetUploadData.chunks = [];
            chunkedAssets.push({"id": assetUploadData.id, "hash": asset.hash});
        }
        
        await testBot.logger.log("INFO", `Chunked asset ${asset.hash}. assetChunks length: ${assetChunks.length}`);

        let uploadChunkRequestHeaders = new Headers({
            "Upload-Key": assetUploadData.uploadKey
        });
        
        for (let i = 0; i < assetChunks.length; i++) {
            if (assetUploadData.isDirectUpload) {
                uploadChunkRequestHeaders.set("Upload-Timestamp", assetUploadData.createdOn);
            }
            else {
                uploadChunkRequestHeaders.set("Part-Number", i+1);
            }
            
            await testBot.logger.log("INFO", `Uploading asset chunk ${i+1} to ${assetUploadData.uploadEndpoint}`);
            const uploadChunk = await fetch(assetUploadData.uploadEndpoint, {
                method: "PUT",
                headers: uploadChunkRequestHeaders,
                body: assetChunks[i]
            });
            await testBot.logger.log("TEST", `chunk hash: ${createHash('sha256').update(assetChunks[i]).digest('hex')}`);
            const uploadChunkResponse = await uploadChunk.text();
            if (!assetUploadData.isDirectUpload){
                const uploadChunkResponseJSON = JSON.parse(uploadChunkResponse);
                assetUploadData.chunks.push({"index": i, "key": uploadChunkResponseJSON.ETag});
            }

            if (!uploadChunk.ok){
                await testBot.logger.log("ERROR", uploadChunkResponse);
                throw new Error(uploadChunkResponse);
            }
            await testBot.logger.log("INFO", `Asset chunk ${i+1} upload success`);
        }

        await testBot.logger.log("INFO", `Finalising asset upload for ${asset.hash}`);
        const finaliseAssetUpload = await fetch(`${baseAPIURL}/users/${testBot.data.userId}/assets/${asset.hash}/upload/${assetUploadData.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": testBot.data.fullToken,
                "UID": botUID,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assetUploadData)
        });

        if (!finaliseAssetUpload.ok){
            const errMsg = await finaliseAssetUpload.text();
            await testBot.logger.log("ERROR", errMsg);
            throw new Error(errMsg);
        }

        await testBot.logger.log("INFO", `Asset ${asset.hash} finalised`);
        uploadedAssets.push(asset);
        if (assetsToUpload.length == uploadedAssets.length){
            checkCombinedRecords();
        }
    });
}

async function checkCombinedRecords(){
    if (chunkedAssets.length == 0){
        uploadRecord(chunkedAssets, uploadedChunkedAssets);
    }

    chunkedAssets.forEach(async chunkedAsset => {
        await testBot.logger.log("INFO", `Checking uploaded chunked asset for combination: ${chunkedAsset.hash}`);
        const checkUploadedAsset = setInterval(async () => {
            await testBot.logger.log("INFO", `Checking ${chunkedAsset.hash}...`);
            const checkUploadRequest = await fetch(`${baseAPIURL}/users/${testBot.data.userId}/assets/${chunkedAsset.hash}/upload/${chunkedAsset.id}`, {
                headers: {
                    "Authorization": testBot.data.fullToken,
                    "UID": botUID
                }
            });

            const assetUploadState = await checkUploadRequest.json();
            await testBot.logger.log("INFO", `Checked asset ${chunkedAsset.hash} status: ${assetUploadState.uploadState}`);
            if (!checkUploadRequest.ok){
                await testBot.logger.log("ERROR", JSON.stringify(assetUploadState));
                clearInterval(checkUploadedAsset);
                throw new Error(JSON.stringify(assetUploadState));
            }
            
            if (assetUploadState.uploadState == "Uploaded"){
                await testBot.logger.log("INFO", `Uploaded asset ${chunkedAsset.hash} successfully finalised.`);
                clearInterval(checkUploadedAsset);
                uploadedChunkedAssets.push(chunkedAsset);
                uploadRecord(chunkedAssets, uploadedChunkedAssets);
            }
        }, 1500);
    });
}

async function uploadRecord(chunkedAssets, finalisedChunkedAssets){
    await testBot.logger.log("INFO", `Attempting record upload. Chunked Assets: ${chunkedAssets.length}, Finalised Chunked Assets: ${finalisedChunkedAssets.length}`);
    if (chunkedAssets.length == finalisedChunkedAssets.length){
        await testBot.logger.log("INFO", `Uploading record...`);
        const uploadRecordRequest = await fetch(`${baseAPIURL}/users/${testBot.data.userId}/records/${testRecord.id}?ensureFolder=True`, {
            method: "PUT",
            headers: {
                "Authorization": testBot.data.fullToken,
                "UID": botUID,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(testRecord)
        });

        if (!uploadRecordRequest.ok){
            const errMsg = await uploadRecordRequest.text();
            await testBot.logger.log("ERROR", errMsg);
            throw new Error(errMsg);
        }

        await testBot.logger.log("SUCCESS", "Successfully uploaded object!!!");
    }
}