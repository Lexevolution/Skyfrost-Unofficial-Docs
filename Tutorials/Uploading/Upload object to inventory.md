# How to upload an object to your inventory

## Edit Data Tree
You will need to edit the Data Tree of your object (the `.brson` file), and change every `local:///` (or `packdb:///` if you're editing a resonite package) uri in that to a `resdb:///` uri. 

This requires decoding the `.brson` file and re-encoding after modifications have been made.

Hash every asset file that is associated with this Data Tree using SHA-256, and the resulting hash in hex is your resdb link.

Because the Data Tree is also an asset that needs to be uploaded, you will need to hash this too after modification.

Keep a list of every asset, its size in bytes, and the hash of the asset in a list to use later.
## Create Record object
Create a [Record object](/Data%20Types/Record.md) (or modify an existing one if updating a record) in JSON with:
- a unique record ID (starting with `R-`)
- version.localVersion set to 1 (or increment by one )
- creation and last modification time set to now
- path set to whatever folder you want to save the object to (starting with `Inventory/`)

You will also populate the [asset manifest](/Data%20Types/Record.md#asset-manifest) with every asset associated with the data tree, the data tree itself, and the thumbnail image (This can be any Resonite supported image in  any aspect ratio btw). Populate it with the hash and the size in bytes.

## Start Pre-process
Send an authenticated POST request to `https://api.resonite.com/users/USERID/records/RECORDID/preprocess`; where:
- `USERID` is your User ID
- `RECORDID` is the record ID you have created in the record object.

The body of the request is the Record object as JSON (make sure you set the `Content-Type` header to `application/json`!).

This request is asking Resonite's cloud to check if any of the assets in your object have already been uploaded.

This will return a [RecordPreprocessStatus object](/Data%20Types/Record%20Preprocess%20Status.md)

Now send an authenticated GET request to `https://api.resonite.com/users/USERID/records/RECORDID/preprocess/PREPROCESSID`; where:
- `USERID` is your User ID
- `RECORDID` is the record ID you have created in the record object
- `PREPROCESSID` is the id you get from the RecordPreprocessStatus from the previous request

This will also return a RecordPreprocessStatus object, but now you need this object to be returned in a specific state.

Send this request every 1 second (this is how quickly Resonite does it) until the `state` in the object is `Success`.

The object in the successful response will also contain a list of [Asset Diff](/Data%20Types/Record%20Preprocess%20Status.md#assetdiff) objects. You will want to upload every asset in this list where the state = 0 and the isUploaded bool = false.

## Upload Assets
For every asset in the AssetDiff list that you want to upload, send an authenticated POST request to `https://api.resonite.com/users/USERID/assets/RESDBHASH/upload?size=BYTES`; where:
- `USERID` is your User ID
- `RESDBHASH` is the hash of the asset you want to upload
- `BYTES` is the size of the asset in bytes

(Both `RESDBHASH` and `BYTES` can easily be taken from the AssetDiff)

This POST request does not have a body.

This request will return the [Asset Upload Data object](/Data%20Types/Asset%20Upload%20Data.md). This contains all the information about how and where to upload the asset. You will need to store this object in a mutable variable, due to needing to return an edited version later on.

If the asset is large enough (>16MB in my experience), the `isDirectUpload` boolean from the Asset Upload Data object will likely be false, the `totalChunks` will be greater than 1, and the `chunkSize` will be smaller than `totalBytes`. This means you will need to split the asset file into `chunkSize` chunks, with the last chunk being the remaining bytes. The total amount of chunks you have split the asset in to should equal `totalChunks`.

The process for uploading a chunked asset (where isDirectUpload = false) and a smaller asset in one go (where isDirectUpload = true) varies enough that they are in separate sections. Keep in mind that for larger uploads, you will likely have a mix of both direct and chunked uploads.

### If isDirectUpload = true
Send a PUT request to the URL provided in `AssetUploadData.uploadEndpoint` (not authenticated using Resonite's authentication), with these headers:
- `Upload-Key`: The string from `AssetUploadData.uploadKey`
- `Upload-Timestamp`: The time string from `AssetUploadData.createdOn`

The body of this request will be the raw asset data. You do not need a `Content-Type` header.

The URL provided is for the specific asset whose hash you provided in the previous request. Do not attempt to upload a different asset using the same URL provided.

You should get an empty 200 OK response back.

Now you need to signify to the cloud that you have finished uploading the asset. Send an authenticated PATCH request to `https://api.resonite.com/users/USERID/assets/RESDBHASH/upload/UPLOADID`; where:

- `USERID` is your User ID
- `RESDBHASH` is the hash of the asset you want to upload
- `UPLOADID` is the value of `id` from the AssetUploadData object

The body of the request is the AssetUploadData object as JSON (make sure you set the `Content-Type` header to `application/json`!).

You should get back a "204 No Content" response.

### If isDirectUpload = false
For each chunk, send a PUT request to the URL provided in `AssetUploadData.uploadEndpoint` (not authenticated using Resonite's authentication), with these headers:
- `Upload-Key`: The string from `AssetUploadData.uploadKey`
- `Part-Number`: A number indicating which chunk you are uploading (index starting at 1).

The body of this request is the raw data of the associated chunk of the asset.

You will be re-using the provided URL for each chunk of this asset.

These requests should each return a [Cloudflare Chunk Result object](/Data%20Types/Asset%20Upload%20Data.md#cloudflarechunkresult) that has a lot more data than you actually need in it. You only need to wory about the `ETag` value. You will create an [AssetChunk object](/Data%20Types/Asset%20Upload%20Data.md#assetchunk), set the value of `index` to the zero-indexed chunk you uploaded (so just minus one from `Part-Number`), and set the value of `key` to the value of the `ETag` you received. Add this object to the `chunks` array in your AssetUploadData object for this asset.

After you have uploaded every chunk and added the resulting data to the AssetUploadData object, you need to signify to the cloud that you have finished uploading the asset. Send an authenticated PATCH request to `https://api.resonite.com/users/USERID/assets/RESDBHASH/upload/UPLOADID`; where:

- `USERID` is your User ID
- `RESDBHASH` is the hash of the asset you want to upload
- `UPLOADID` is the value of `id` from the AssetUploadData object

The body of the request is the AssetUploadData object as JSON (make sure you set the `Content-Type` header to `application/json`!). This object should have the `chunks` list you made.

You should get back a "204 No Content" response.

You will now also need to save this specific data from this asset upload for later use:
- The asset hash
- AssetUploadData.id

I recommend to store these two as it's own object in a list. You will need this from every asset that was a chunked upload.

## Check for Asset Combination
Resonite's asset store sometimes takes a long time to re-combine any chunked assets you might have uploaded. So now for every chunked asset you've uploaded, send an authenticated GET request to `https://api.resonite.com/users/USERID/assets/RESDBHASH/upload/UPLOADID`; where:

- `USERID` is your User ID
- `RESDBHASH` is the hash of the asset you have uploaded
- `UPLOADID` is the value of `id` from the AssetUploadData object

This is where the list of objects I told you to store comes in handy.

This will return back the AssetUploadData for that asset, and you will know when that asset is completely processed and combined in the cloud by the `uploadState` being `Uploaded`. Resonite sends this request every 1.5 seconds for each asset, until `uploadState` = `Uploaded`, so you should probably do that too. In my experience this can take quite a while for larger assets (e.g. ~50MB audio file took ~90 seconds to finish re-combining).

Once all chunked assets' `uploadState` are `Uploaded`, you can move to the next step.

## Asset Variance
There is some asset variance steps here, however, from my testing, they are not needed, as Resonite's cloud seems to be able to handle asset variance generation on its own. So I  did not research this part.

## Upload Record
Now that you've uploaded every asset, you actually need to tell the cloud that your object exists.

Send an authenticated PUT request to `https://api.resonite.com/users/USERID/records/RECORDID?ensureFolder=True`; where:
- `USERID` is your User ID
- `RECORDID` is the record ID you have created in the record object
- `ensureFolder=True` is to make the cloud validate that you actually have a valid folder path in your record object, so you can actually access the object after this request.

The body of this request is the Record object as JSON (make sure you set the `Content-Type` header to `application/json`!).

This should just return a 200 OK and just relay back your Record object, now with `version.globalVersion` set to 1.

----
You have successfully uploaded an object to your inventory!