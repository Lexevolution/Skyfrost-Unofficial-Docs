# Search worlds
`POST /records/pagedSearch`

Needs Authorization: probably no

With filters as body in serialized JSON like:

```json
{
  "requiredTags": ["foo", "bar", "baz"],
  "sortDirection": "xxx",
  "sortBy": "xxx",
  "count": 10,
  "offset": 0,
  "recordType": "world"
}
```

- `sortDirection` values: `ascending`, `descending`
- `sortBy` values: `creationDate`, `lastUpdateDate`, `firstPublishTime`, `totalVisits`, `name`, `rand` (random)
- `count`: limits the number to return
- `offset`: how much to offset
- `recordType` always `world`

Use `count` and `offset` for your pagination, unfortunately the API doesn't seems to returns a total count so...

Example return:
```json
{
  "records": [
    {
      "id": "R-UUIDv4",
      "assetUri": "resdb:///some hash.brson",
      "version": {
        "globalVersion": 243,
        "localVersion": 244
      },
      "name": "<b><color=#CC6633>Obsidian's 8 Bit </color> <color=#FFFFFF>8 Ball</color> <color=#FFFFFF>Pocket 🎱</color></b>",
      "description": "Come play and hangout in resonites very first billiard bar!",
      "recordType": "world",
      "ownerName": "ObsidianTux",
      "tags": [
        "Billard",
        "Eightball",
        "ObsidianTux",
        "Ball",
        "Bar",
        "Pub",
        "obsidian",
        "bit",
        "ball",
        "circuit",
        "pocket",
        "game",
        "social",
        "hangout"
      ],
      "thumbnailUri": "resdb:///some hash.webp",
      "isPublic": true,
      "isForPatrons": false,
      "isListed": true,
      "isReadOnly": false,
      "isDeleted": false,
      "creationTime": "2025-04-07T20:58:29.378+00:00",
      "firstPublishTime": "2025-04-14T22:01:35.019+00:00",
      "lastModificationTime": "2025-05-24T21:42:04.2577Z",
      "randomOrder": 0,
      "visits": 221,
      "rating": 0,
      "submissions": [
        {
          "id": "UUIDv4",
          "targetRecordId": {
            "recordId": "R-UUIDv4",
            "ownerId": "U-userId"
          },
          "submissionTime": "2025-04-19T21:21:43.5272225Z",
          "submittedById": "U-userId",
          "submittedByName": "some username",
          "featured": true,
          "featuredByUserId": "U-userId",
          "featuredTimestamp": "2025-04-19T21:21:43.5362243Z",
          "type": "Submission",
          "ownerId": "G-userId",
          "_etag": "*"
        }
      ],
      "type": "Record",
      "ownerId": "U-userId"
    }
  ],
  "hasMoreResults": true
}
```