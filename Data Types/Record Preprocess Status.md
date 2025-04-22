# Record Preprocess Status
## Description

## Schema
### RecordPreprocessStatus
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes |
| `ownerId` | String | Yes |
| `recordId` | String | Yes |
| `state` | enum as String | Yes | Can be "Preprocessing", "Success" or "Failed"
| `progress` | float | Yes |
| `failReason` | String | No |
| `resultDiffs` | [AssetDiff object](#assetdiff) array | No | Will only be populated if state is "Success"
| `attempts` | int | Yes
| `ttl` | int | Yes

### AssetDiff
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | String | Yes |
| `bytes` | int | Yes |
| `state` | enum as int | Yes | 0 = Added, 1 = Unchanged, 2 = Removed
| `isUploaded` | bool | No | Will not exist if state is 1 or 2