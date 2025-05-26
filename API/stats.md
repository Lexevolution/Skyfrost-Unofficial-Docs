# Stats
`GET /stats/onlineStats`

Needs Authorization: nope

You will get something like:
```json
{
  "captureTimestamp": "2025-05-24T21:00:34.8549833Z",
  "visibleSessionsByAccessLevel": {
    "Anyone": 89,
    "Contacts": 86,
    "RegisteredUsers": 66,
    "ContactsPlus": 38,
    "Private": 17
  },
  "hiddenSessionsByAccessLevel": {
    "ContactsPlus": 30,
    "Anyone": 6,
    "RegisteredUsers": 6,
    "Contacts": 10,
    "LAN": 1,
    "Private": 14
  },
  "activeVisibleSessionsByAccessLevel": {
    "Anyone": 5,
    "Private": 12,
    "ContactsPlus": 6,
    "Contacts": 6,
    "RegisteredUsers": 7
  },
  "activeHiddenSessionsByAccessLevel": {
    "ContactsPlus": 4,
    "Private": 8,
    "RegisteredUsers": 1
  },
  "registeredUsers": 299,
  "presentUsers": 151,
  "awayUsers": 148,
  "instanceCount": 345,
  "usersInVR": 92,
  "usersInScreen": 58,
  "usersOnDesktop": 150,
  "usersOnMobile": 0,
  "usersInVisiblePublicSessions": 40,
  "usersInVisibleSemiAccessibleSessions": 17,
  "usersInHiddenSessions": 20,
  "usersInPrivateSessions": 66,
  "usersBySessionAccessLevel": {
    "Private": 66,
    "RegisteredUsers": 30,
    "Contacts": 6,
    "ContactsPlus": 31,
    "Anyone": 10
  },
  "usersByClientType": {
    "Headless": 141,
    "ChatClient": 8,
    "GraphicalClient": 150
  }
}
```
