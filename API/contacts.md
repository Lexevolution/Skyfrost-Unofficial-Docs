# Fetch contacts
`GET /users/<userId>/contacts`

Needs Authorization: yes

# Fetch one contact infos
`GET /users/<userId>/contacts/<contactUserId>`

Needs Authorization: yes

# Get messages from one contact
`GET /users/<yourOwnUserId>/messages`

With the parameters:
- `maxItems`: max messages to return
- `unread`: only unread messages
- `fromTime`: from this date
- `fromUserId`: from this userId

Needs Authorization: yes

It will returns messages with the latest one first.

Example response:
```json
[
  {
    "id": "MSG-SOME-UUID-V5",
    "senderId": "U-Resonite",
    "recipientId": "U-yourUserId",
    "otherId": "U-Resonite",
    "messageType": "Text",
    "content": "OS: Unix 5.15.176.3\nRuntime: 9.0.3\nInstanceID: ZHVKUZID\nUptime: 1 days 13 hours 42 minutes 8 seconds",
    "sendTime": "2025-05-22T13:48:02.0945221Z",
    "lastUpdateTime": "2025-05-22T13:48:02.0945221Z",
    "readTime": "2025-05-22T19:08:42.9612677Z",
    "isMigrated": false,
    "ownerId": "U-yourUserId"
  },
  {
    "id": "MSG-SOME-UUID-V5",
    "senderId": "U-yourUserId",
    "senderUserSessionId": "SOME-UUID-V5",
    "recipientId": "U-Resonite",
    "otherId": "U-Resonite",
    "messageType": "Text",
    "content": "/serverinfo",
    "sendTime": "2025-05-22T13:48:01.479Z",
    "lastUpdateTime": "2025-05-22T13:48:02.094475Z",
    "isMigrated": false,
    "ownerId": "U-yourUserId"
  }
]
```

See [this](messages.md) for various message types and contents.
