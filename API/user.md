# Fetch one user
`GET /users/<userId>`

If the `userId` doesn't starts with `U-` you might apparently need to pass `?byusername=true`

Needs Authorization: no

Example response:
```json
{
  "id": "U-userId",
  "username": "username",
  "normalizedUsername": "username",
  "registrationDate": "2024-01-18T16:05:48.6143996Z",
  "isVerified": true,
  "isLocked": false,
  "supressBanEvasion": false,
  "2fa_login": false,
  "profile": {
    "iconUrl": "resdb:///some hash.webp",
    "tagline": "meow",
    "displayBadges": [],
    "description": "just a fluffy otter"
  },
  "supporterMetadata": [
    {
      "$type": "patreon",
      "isActiveSupporter": true,
      "isActive": true,
      "totalSupportMonths": 1,
      "totalSupportCents": -1,
      "lastTierCents": -1,
      "highestTierCents": -1,
      "lowestTierCents": -1,
      "firstSupportTimestamp": "2025-05-08T12:10:19.0391431Z",
      "lastSupportTimestamp": "2025-05-08T12:10:19.0391431Z"
    }
  ],
  "entitlements": [
    {
      "$type": "credits",
      "creditType": "Basic",
      "friendlyDescription": "Basic text credit",
      "entitlementOrigins": [
        "Patreon"
      ]
    },
    {
      "$type": "badge",
      "badgeType": "Static2D",
      "badgeCount": 1,
      "entitlementOrigins": [
        "Patreon"
      ]
    }
  ],
  "isActiveSupporter": true
}
```

# Update user profile
`PUT /users/<userId>/profile`

The body will be send as JSON serialized string

Needs Authorization: yes

This will set the content of the `profile` dict.

> [!WARNING]
> send everything like you got it, if you have an `iconUrl` and only send `tagline` you will erase everything and just put `tagline` !

> [!NOTE]
> `tagline` and `description` seems to be unused for now in Resonite
