# SignalR "hub"

The hub URL is the API base url with `/hub`, the SignalR lib will automatically negociate the WebSocket.

You need some authorization custom headers:
- `Authorization` the 'res userId:token' one
- `UID` same as the login auth one
- `SecretClientAccessKey` the resonite secret client access key (?)

This API works by sending JSON to it, and subscribing to events to get values.

# Contacts
## Get initial contacts
As an alternative to the classic API, you can use this one to get the initial contacts list.

Do a `stream` of the `InitializeContacts` target, and on the `next` event you will get a contact info, should be the same as the other API.

## Register to status updates
Register a handler on `ReceiveStatusUpdate`.

Example messages:
```json
{
  "userId": "U-userId",
  "userSessionId": "UUIDv4",
  "sessionType": "GraphicalClient",
  "outputDevice": "Screen",
  "isMobile": false,
  "onlineStatus": "Online",
  "isPresent": true,
  "lastPresenceTimestamp": "2025-05-24T21:56:38.0139458Z",
  "lastStatusChange": "2025-05-24T21:56:38.0179458Z",
  "hashSalt": "xxx=",
  "appVersion": "2025.5.23.1096+ResoniteModLoader.dll",
  "compatibilityHash": null,
  "publicRSAKey": {
    "Exponent": "AQAB",
    "Modulus": "xxx==",
    "P": null,
    "Q": null,
    "DP": null,
    "DQ": null,
    "InverseQ": null,
    "D": null
  },
  "sessions": [
    {
      "sessionHash": "aaaa",
      "accessLevel": "Private",
      "sessionHidden": false,
      "isHost": true,
      "broadcastKey": null
    },
    {
      "sessionHash": "bbbb",
      "accessLevel": "Private",
      "sessionHidden": false,
      "isHost": false,
      "broadcastKey": null
    },
    {
      "sessionHash": "cccc",
      "accessLevel": "Private",
      "sessionHidden": true,
      "isHost": true,
      "broadcastKey": null
    }
  ],
  "currentSessionIndex": 2
}
```

## Register to sent messages
Register a handler on `MessageSent`.

Example messages:
```json
{
  "id": "MSG-UUIDv4",
  "ownerId": "U-userId",
  "senderId": "U-userId",
  "recipientId": "U-Resonite",
  "senderUserSessionId": "UUIDv4",
  "messageType": "Text",
  "content": "/serverinfo",
  "sendTime": "2025-05-24T22:04:10.485Z",
  "lastUpdateTime": "0001-01-01T00:00:00",
  "readTime": null,
  "isMigrated": false
}
```

## Register to received messages
Register a handler on `ReceiveMessage`.

Example messages:
```json
{
  "id": "MSG-UUIDv4",
  "ownerId": "U-userId",
  "recipientId": "U-userId",
  "senderId": "U-Resonite",
  "senderUserSessionId": null,
  "messageType": "Text",
  "content": "OS: Unix 5.15.176.3\nRuntime: 9.0.3\nInstanceID: ZHVKUZID\nUptime: 3 days 21 hours 58 minutes 17 seconds",
  "sendTime": "2025-05-24T22:04:11.1686452Z",
  "lastUpdateTime": "2025-05-24T22:04:11.1686453Z",
  "readTime": null,
  "isMigrated": false
}
```

## Broadcast own status
Do an Invoke on `BroadcastStatus`.


# Sessions
Do a classic API call to get the sessions anyway, no replacement with this one.

## Register to get session updates
Register a handler on `ReceiveSessionUpdate`.

If you has sessions filtering, you will have to filter the received messages as you will get *everything* from all sessions.

Example messages:
```json
{
  "name": "KemonoJP_Event",
  "description": "",
  "correspondingWorldId": {
    "recordId": "R-UUIDv4",
    "ownerId": "U-userId"
  },
  "tags": [
    "ケモノ広場",
    "new",
    "of"
  ],
  "sessionId": "S-U-userId:something",
  "normalizedSessionId": "s-u-userId:something",
  "hostUserId": "U-userId",
  "hostUserSessionId": "UUIDv4",
  "hostMachineId": "something",
  "hostUsername": "username",
  "compatibilityHash": "6FX9YaVxFsKTuvLJDnSyyA==",
  "systemCompatibilityHash": "VSjZ/wzHcTkTha7/1/JUjQ==",
  "dataModelAssemblies": [
    {
      "name": "Awwdio",
      "compatibilityHash": "Hzv2eaXC8iH4+rN2ycyonw=="
    },
    {
      "name": "Elements.Assets",
      "compatibilityHash": "bKJA3e8EB6HBa1QidkhORQ=="
    },
    {
      "name": "Elements.Core",
      "compatibilityHash": "Pay/WeLCyO3RsgDcAHMMsw=="
    },
    {
      "name": "FrooxEngine",
      "compatibilityHash": "zTW2xP6/aB2ypU+9JoAQFg=="
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
      "compatibilityHash": "snKFfc7e2OIJ9pvmCfaBxw=="
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
  "appVersion": "2025.5.16.1282",
  "headlessHost": true,
  "sessionURLs": [
    "lnl-nat://UUIDv4/S-U-UserId:something"
  ],
  "parentSessionIds": [],
  "nestedSessionIds": [],
  "sessionUsers": [
    {
      "username": "username",
      "userID": "U-userId",
      "userSessionId": null,
      "isPresent": false,
      "outputDevice": null
    }
  ],
  "thumbnailUrl": "https://skyfrost-archive.resonite.com/thumbnails/UUIDv4.webp",
  "joinedUsers": 0,
  "activeUsers": 0,
  "totalJoinedUsers": 0,
  "totalActiveUsers": 0,
  "maxUsers": 64,
  "mobileFriendly": false,
  "sessionBeginTime": "2025-05-20T11:57:39.9926227Z",
  "lastUpdate": "2025-05-24T22:06:34.2113506Z",
  "accessLevel": "Anyone",
  "hideFromListing": false,
  "broadcastKey": null,
  "awayKickEnabled": true,
  "awayKickMinutes": 5,
  "hasEnded": false,
  "isValid": true
}
```

## Register to get session removals
Register a handler on `RemoveSession`.
