# Asset Upload Data
## Description

## Schema
### AssetUploadData
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | String | Yes | The hash of the asssociated asset |
| `variant` | String | No | Has to do with the asset variance system, but unsure apart form that.
| `id` | String | Yes | The unique ID of this asset upload information |
| `ownerId` | String | Yes | The User ID of the owner of this asset upload information |
| `totalBytes` | int | Yes | The total size of the asset in bytes |
| `chunkSize` | int | Yes | The size of each chunk the split up asset in bytes needs to be (except for the final chunk) |
| `totalChunks` | int | Yes | The total amount of chunks the asset needs to be split up in to |
| `uploadState` | enum as String | Yes | Can be "UploadingChunks", "Finalizing", "Uploaded" or "Failed" |
| `uploadKey` | String | Yes | The string required in the `Upload-Key` header in the upload request to the `uploadEndpoint` |
| `uploadEndpoint` | String | Yes | The URL to upload the associated asset to |
| `isDirectUpload` | bool | Yes | Will be true if splitting up the asset is **not** needed, will be false if splitting up the asset **is** needed. |
| `maxUploadConcurrency` | int | Yes | The maximum amount of chunks you can upload in parallel (at the same time) |
| `chunks` | AssetChunk object array | No | This array gets populated by the client with the response of each uploaded chunk, so the cloud can know which order the chunks go in to re-combine them. |
| `createdOn` | String (as ISO 8601 DateTime) | Yes | The time that this asset upload information was created

### AssetChunk
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `index` | int | Yes | The zero-indexed chunk number
| `key` | String | Yes | A String that is returned from the chunk upload request

### CloudflareChunkResult
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `ETag` | String | Yes |
| `ChecksumCRC32` | String | No | 