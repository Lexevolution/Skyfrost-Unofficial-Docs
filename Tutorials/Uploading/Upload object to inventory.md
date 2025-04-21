# How to upload an object to your inventory

## Edit Data Tree
You will need to edit the Data Tree of your object (the `.brson` file), and change every `local:///` uri in that to a `resdb:///` uri. 

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

You will also populate the [asset manifest](/Data%20Types/Record.md#asset-manifest) with every asset associated with the data tree, the data tree itself, and the thumbnail image. Populate it with the hash and the size in bytes.

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

The object in the successful response will also contain a list of Asset Diff objects.
## Upload Assets
### If isDirectUpload = true
### If isDirectUpload = false

## Upload Record