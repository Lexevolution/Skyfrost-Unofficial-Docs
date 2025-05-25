# Message types

All messages types are the same, only the `content` field change, this page will only talks about the `content` field.

Please note that in this page, this is properly JSON formatted, but in real-life, the `content` fields contains JSON serialized as string !
So you have to parse in JSON the whole API returns, AND the `content` field every time.

# Message type 'Text'
Not going to shows only `content` here, so you have the whole message as example.

```json
{
  "id": "MSG-UUIDv4",
  "senderId": "U-Resonite",
  "recipientId": "U-userId",
  "otherId": "U-Resonite",
  "messageType": "Text",
  "content": "OS: Unix 5.15.176.3\nRuntime: 9.0.3\nInstanceID: ZHVKUZID\nUptime: 1 days 13 hours 26 minutes 33 seconds",
  "sendTime": "2025-05-22T13:32:27.8668139Z",
  "lastUpdateTime": "2025-05-22T13:32:27.866814Z",
  "readTime": "2025-05-22T19:08:42.9612677Z",
  "isMigrated": false,
  "ownerId": "U-userId"
}
```

# Message type 'Sound'
```json
{
  "id": "R-UUIDv4",
  "ownerId": "U-userId",
  "assetUri": "resdb:///something-something.ogg",
  "version": {
    "globalVersion": 0,
    "localVersion": 1,
    "lastModifyingUserId": "U-userId",
    "lastModifyingMachineId": "a machine ID hash"
  },
  "name": "Voice Message",
  "description": null,
  "recordType": "audio",
  "ownerName": null,
  "tags": [
    "message_item",
    "message_id:MSG-UUIDv4"
  ],
  "path": null,
  "thumbnailUri": null,
  "isPublic": false,
  "isForPatrons": false,
  "isListed": false,
  "isReadOnly": false,
  "lastModificationTime": "2025-05-22T19:09:10.3843124Z",
  "rootRecordId": null,
  "creationTime": "2025-05-22T19:09:10.3813016Z",
  "firstPublishTime": null,
  "isDeleted": false,
  "visits": 0,
  "rating": 0,
  "randomOrder": 0,
  "submissions": null,
  "migrationMetadata": null,
  "assetManifest": [
    {
      "hash": "the hash of the file probably",
      "bytes": 15678
    }
  ],
  "IsValidOwnerId": true,
  "IsValidRecordId": true,
  "neosDBmanifest": null
}
```

# Message type 'SessionInvite'
```json
{
  "name": "Tutorial [fr-FR]",
  "description": null,
  "correspondingWorldId": {
    "recordId": "R-UUIDv4",
    "ownerId": "G-Resonite"
  },
  "tags": [
    "tutorial",
    "intro",
    "basics"
  ],
  "sessionId": "S-SESSION-ID-UUIDv4",
  "normalizedSessionId": "s-SESSION-ID-UUIDv4",
  "hostUserId": "U-userId",
  "hostUserSessionId": "an UUIDv4",
  "hostMachineId": "a machine ID hash",
  "hostUsername": "user username",
  "compatibilityHash": "aUCpUrWMSIkaoedW+imSXw==",
  "systemCompatibilityHash": "VSjZ/wzHcTkTha7/1/JUjQ==",
  "dataModelAssemblies": [
    {
      "name": "Elements.Assets",
      "compatibilityHash": "JcC1xbe7FJhw0/WIdNkOcg=="
    },
    {
      "name": "Elements.Core",
      "compatibilityHash": "0FLhmcgSDXyUnzkDID8Crw=="
    },
    {
      "name": "FrooxEngine",
      "compatibilityHash": "JUsf8YnGF/QVYp3TqJ6ZFA=="
    },
    {
      "name": "FrooxEngine.Store",
      "compatibilityHash": "K22/sKfODKjKTdTi7M/GnQ=="
    },
    {
      "name": "PhotonDust",
      "compatibilityHash": "JCoK6VvRnfkuqtpoWxhIPA=="
    },
    {
      "name": "ProtoFlux.Nodes.Core",
      "compatibilityHash": "XxMkLAc6ulemxNEOJo7IOQ=="
    },
    {
      "name": "ProtoFlux.Nodes.FrooxEngine",
      "compatibilityHash": "AZwrIVhAr+DJ9kosHmizsg=="
    },
    {
      "name": "ProtoFluxBindings",
      "compatibilityHash": "6oJsF1BeEf4jEJciHjwKQQ=="
    },
    {
      "name": "SkyFrost.Base",
      "compatibilityHash": "te30htqkPqTW/nEKuspZsA=="
    },
    {
      "name": "SkyFrost.Base.Models",
      "compatibilityHash": "pi+qiFhdImZ42rvy8ybJnQ=="
    }
  ],
  "universeId": null,
  "appVersion": "2025.5.1.1282",
  "headlessHost": false,
  "sessionURLs": [
    "res-steam://something-something/1/S-SESSION-ID-UUIDv4"
  ],
  "parentSessionIds": [],
  "nestedSessionIds": [],
  "sessionUsers": [
    {
      "username": "user username",
      "userID": "U-userId",
      "userSessionId": null,
      "isPresent": true,
      "outputDevice": 1
    }
  ],
  "thumbnailUrl": null,
  "joinedUsers": 1,
  "activeUsers": 1,
  "totalJoinedUsers": 1,
  "totalActiveUsers": 1,
  "maxUsers": 16,
  "mobileFriendly": false,
  "sessionBeginTime": "2025-05-06T18:18:39.3994193Z",
  "lastUpdate": "2025-05-06T18:43:08.9381717Z",
  "accessLevel": "Private",
  "hideFromListing": false,
  "broadcastKey": null,
  "awayKickEnabled": true,
  "awayKickMinutes": 5,
  "HasEnded": false,
  "IsValid": true
}
```

# Message type 'InviteRequest'
```json
{
  "inviteRequestId": "UUIDv4",
  "userIdToInvite": "U-userId",
  "usernameToInvite": "username",
  "requestingFromUserId": "U-userId",
  "requestingFromUsername": "username",
  "forSessionId": null,
  "forSessionName": null,
  "isContactOfHost": null,
  "response": null,
  "invite": null
}
```

`content`

# Message type 'Object'

No sample available yet :(
