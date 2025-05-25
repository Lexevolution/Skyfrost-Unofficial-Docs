# Get inventory usage
`GET /users/<userId>/storage

Needs Authorization: yes

Example response:
```json
{
  "id": "U-userId",
  "usedBytes": 866195200,
  "quotaBytes": 53687091200,
  "fullQuotaBytes": 53687091200,
  "groupShareableQuotaBytes": 0,
  "groupAndUsersShareableBytes": 0,
  "quotaSources": [
    {
      "id": "new-account",
      "bytes": 1073741824,
      "createdOn": "2024-01-18T16:05:51.9223804Z",
      "group": "base",
      "type": "Base",
      "maximumShareLevel": "None",
      "name": "Basic Storage",
      "description": "Basic storage for new registered accounts"
    },
    {
      "id": "Patreon-2025-x-x-xxx-xxx",
      "bytes": 53687091200,
      "expiresOn": "2025-06-12T06:49:51Z",
      "createdOn": "2025-05-08T06:49:51Z",
      "group": "patreon",
      "type": "Normal",
      "maximumShareLevel": "None",
      "name": "Patreon",
      "description": "Additional storage space reward for Patreon supporters"
    }
  ],
  "quotaShares": [],
  "lastUpdate": "2025-05-08T12:10:27.6094993Z",
  "docDBId": "U-userId",
  "ownerId": "U-userId"
}
```

# Get records from user at path
`GET /users/<userId>/records?path=<path>`

Needs Authorization: yes

To get the root inventory content the path is just `Inventory`, for a subfolder like `Tools` path will be `Inventory\Tools`

Example response with default Resonite Essentials folder, a user-made one, and a random Object saved here:
```json
[
  {
    "id": "R-9e43f68d-ffd9-41ac-87d9-59add987b55a",
    "assetUri": "resrec:///G-Resonite/Inventory/Resonite Essentials",
    "version": {
      "globalVersion": 0,
      "localVersion": 0,
      "lastModifyingUserId": "G-Resonite"
    },
    "name": "Resonite Essentials",
    "recordType": "link",
    "ownerName": "ottpossum",
    "path": "Inventory",
    "isPublic": false,
    "isForPatrons": false,
    "isListed": false,
    "isReadOnly": false,
    "isDeleted": false,
    "lastModificationTime": "0001-01-01T00:00:00",
    "randomOrder": 0,
    "visits": 0,
    "rating": 0,
    "ownerId": "U-userId"
  },
  {
    "id": "R-xxxx",
    "version": {
      "globalVersion": 1,
      "localVersion": 1,
      "lastModifyingUserId": "U-userId",
      "lastModifyingMachineId": "some machine id hash"
    },
    "name": "Tools",
    "recordType": "directory",
    "ownerName": "owner username",
    "tags": [
      "tools"
    ],
    "path": "Inventory",
    "isPublic": false,
    "isForPatrons": false,
    "isListed": false,
    "isReadOnly": false,
    "isDeleted": false,
    "creationTime": "2025-05-09T09:20:42.5354934Z",
    "lastModificationTime": "2025-05-09T09:20:42.5354934Z",
    "randomOrder": 0,
    "visits": 0,
    "rating": 0,
    "ownerId": "U-userId"
  },
  {
    "id": "R-UUIDv4",
    "assetUri": "resdb:///some object hash.brson",
    "version": {
      "globalVersion": 1,
      "localVersion": 1,
      "lastModifyingUserId": "U-userId",
      "lastModifyingMachineId": "some machine id hash"
    },
    "name": "nightride.mp3",
    "recordType": "object",
    "ownerName": "owner username",
    "tags": [
      "holder",
      "nightride",
      "mp",
      "canvas",
      "background",
      "mask",
      "backing",
      "panel",
      "... it was a player with an mp3 stream link so a shitload of tags ...",
      "valueinc",
      "relay",
      "onstart"
    ],
    "path": "Inventory",
    "thumbnailUri": "resdb:///some hash here.webp",
    "isPublic": false,
    "isForPatrons": false,
    "isListed": false,
    "isReadOnly": false,
    "isDeleted": false,
    "creationTime": "2025-05-16T11:32:40.3948913Z",
    "lastModificationTime": "2025-05-16T11:32:40.398904Z",
    "randomOrder": 0,
    "visits": 0,
    "rating": 0,
    "ownerId": "U-userId"
  }
]
```

# Get user record details
`GET /users/<userId>/records/<recordId>`

Needs Authorization: yes

# Get group records from path
`GET /groups/<groupId>/records?path=<path>`

Needs Authorization: yes

# Get group record details
`GET /groups/<groupId>/records/<recordId>`

Needs Authorization: yes
