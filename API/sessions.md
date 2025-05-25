# Get Sessions
`GET /sessions`

The following query parameters are available:
- `includeEnded`, boolean, include ended sessions ?
- `includeIncompatible`, boolean, include incompatible sessions ?
- `hostName`, string, should match this host name
- `minActiveUsers`, integer, minimum users
- `includeEmptyHeadless`, boolean, include empty headless sessions ?

Needs Authorization: probably not


# Get one session details
`GET /sessions/<sessionId>`

Needs Authorization: probably not

Example response:
```json
{
  "name": "The <color=yellow>Hidden Star Theater</color>",
  "description": "world description here",
  "tags": [
    "amaster",
    "movie",
    "world",
    "hidden",
    "star",
    "theater",
    "fixing",
    "it",
    "rawr",
    "build",
    "time",
    "te",
    "broken",
    "today",
    "testing"
  ],
  "sessionId": "S-U-xxx:HiddenStarTheater",
  "normalizedSessionId": "s-u-xxx:hiddenstartheater",
  "hostUserId": "U-xxx",
  "hostUserSessionId": "UUIDv4",
  "hostMachineId": "a machine id hash",
  "hostUsername": "SomeoneHeadless",
  "compatibilityHash": "0ZVcSlI4nCEG0BgXRnedcw==",
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
      "compatibilityHash": "qkZbccA7DlZ4K2AK3Z3SmQ=="
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
  "appVersion": "2025.5.23.42",
  "headlessHost": true,
  "sessionURLs": [
    "lnl-nat://UUIDv4/S-U-xxx:HiddenStarTheater"
  ],
  "parentSessionIds": [],
  "nestedSessionIds": [],
  "sessionUsers": [
    {
      "username": "someone",
      "userID": "U-userId",
      "isPresent": false
    },
    {
      "username": "someone else",
      "userID": "U-userId",
      "isPresent": true,
      "outputDevice": 1
    }
  ],
  "thumbnailUrl": "https://skyfrost-archive.resonite.com/thumbnails/UUIDv4.webp",
  "joinedUsers": 2,
  "activeUsers": 2,
  "totalJoinedUsers": 2,
  "totalActiveUsers": 2,
  "maxUsers": 34,
  "mobileFriendly": false,
  "sessionBeginTime": "2025-05-23T04:17:44.8237316Z",
  "lastUpdate": "2025-05-24T21:34:09.0745107Z",
  "accessLevel": "Anyone",
  "hideFromListing": false,
  "awayKickEnabled": false,
  "awayKickMinutes": 5,
  "hasEnded": false,
  "isValid": true
}
```