# Record
## Description
Object that contains most of the metadata about a main asset. This is the details the end user sees for every world and object.

## Schema
### Record
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The unique identifier of the Record object |
| `ownerId` | String | Yes | The User ID that owns this Record |
| `assetUri` | String | Yes | The main asset that this Record describes |
| `version` | [Record Version object](#record-version) | Yes | The iteration of the Record, both in the cloud and locally |
| `name` | String | Yes | The name of the Record/main asset |
| `description` | String | No | A description of the Record/main asset. Used mainly in worlds |
| `recordType` | String | Yes | A string that tells the cloud and the client what type of data the main asset is. See this link for the current known types |
| `ownerName` | String | No | The owner user's username. |
| `tags` |  String array | Yes | An array of arbitrary strings that can help identify the Record/main asset |
| `path` | String | No | The folder that this record can be found under. Is `null` for worlds and message objects |
| `thumbnailUri` | String | No | The image asset used as a thumbnail for an object, world or object attachment in a message. Will be null for a Sound Message |
| `lastModificationTime` | String (as ISO 8601 DateTime) | Yes | The time that this Record object was last modified (will be the same as the creation time if newly created Record) |
| `creationTime` | String (as ISO 8601 DateTime) | Yes | The time that this Record object was created |
| `firstPublishTime` | String (as ISO 8601 DateTime) | No | The time that this object was published to the world browser. Only applies to recordType `world` |
| `isDeleted` | bool | Yes | Determines whether this Record has been deleted from the cloud. Will likely always be false |
| `isPublic` | bool | Yes | Determines whether any user (not just the owner) can access this Record |
| `isForPatrons` | bool | Yes | Determines whether users subscribed to Resonite's patreon (unsure if also works with Stripe) can access this Record |
| `isListed` | bool | Yes | |
| `isReadOnly` | bool | Yes | |
| `visits` | int | Yes | Will be 0 for anything except worlds |
| `rating` | double | Yes | Unused. Set to 0
| `randomOrder` | int | Yes | Determines the order of the worlds in the Random category in the world browser. Set to zero for any other type of record |
| `submissions` |
| `assetManifest` | [Asset Manifest object](#asset-manifest) array | Yes |
| `migrationMetadata` |

### Record Version
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `globalVersion` | int | Yes | The iteration of the Record in the cloud. Will be 0 for a newly created Record |
| `localVersion` | int | Yes | The iteration of the Record locally. Will be 1 for a newly created Record
| `lastModifyingUserId` | String | No | The User ID who last modified the Record
| `lastModifyingMachineId` | String | No | The machine ID of the last user that modified the Record

### Asset Manifest
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `hash` | String | Yes
| `bytes` | int | Yes
## Currently known Record types
- `object`
- `world`
- `audio`
- `directory` (regular private folder)
- `link` (public folder)