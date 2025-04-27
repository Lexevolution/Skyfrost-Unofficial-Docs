# Message
## Description

## Schema
### Message
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The id of the message (always starts with `MSG-`)
| `ownerId` | String | Yes | The user ID of the owner of this message object (always? matches `senderId`)
| `recipientId` | String | Yes | The user ID of whoever is receiving the message
| `senderId` | String | Yes | The user ID of the user that is sending the messasge (always? matches `ownerId`)
| `senderUserSessionId` | String | No | The id of the "user session" of the sender
| `messageType` | enum as String | Yes | Can currently be: `Text`, `Object`, `Sound`, `SessionInvite`, `InviteRequest`
| `content` | String | Yes | For messageType `Text`, is a plain string. For the others, it is a stringified object.
| `sendTime` | String (as ISO 8601 DateTime) | Yes |
| `readTime` | String (as ISO 8601 DateTime) | No |