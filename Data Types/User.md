# User
## Description
The info of a user on the cloud.
## Schema
| Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `id` | String | Yes | The user ID of the user |
| `username` | String | Yes | The username of the user |
| `alternateNormalizedNames` | String[] | No | A list of usernames that can be alternately used for processing. Currently not used by Reosnite client. |
| `email` | String | No | The user's email address (only shows your own, and only when authenticated) |
| `dateOfBirth` | String (as ISO 8601 dateTime) | No | The user's date of birth (only shows your own, and only when authenticated) |
| `registrationDate` | String (as ISO 8601 dateTime) | No | |
| `isVerified` |  |  |
| `accountBanExpiration` |  |  |
| `publicBanExpiration` |  |  |
| `publicBanType` |  |  |
| `spectatorBanExpiration` |  |  |
| `muteBanExpiration` |  |  |
| `listingBanExpiration` |  |  |
| `uniqueDeviceIDs` |  |  |
| `tags` |  |  |
| `referrerUserId` |  |  |
| `profile` |  |  |
| `supporterMetadata` |  |  |
| `entitlements` |  |  |
| `migrationCredentials` |  |  |
| `migratedData` |  |  |