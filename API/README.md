# Resonite API

> [!WARNING]
> This is a work in progress, some examples are missing or incomplete, some might be assuming the wrong thing, don't hesistate to fix stuff.

# Generalities

The API is compromised of two parts:

- One with standard HTTP queries on `https://api.resonite.com`
- One that uses a WebSocket and talks SignalR protocol at `https://api.resonite.com/hub`

Both talks JSON.

Thoses two APIs doesn't have CORS setup, see https://github.com/Yellow-Dog-Man/Resonite-Issues/issues/3537 for updates.

Also notes that the SignalR WebSocket can only be used in `HTTP Long Polling` if used from a Web-Browser app (including Electron, unless the SignalR part is in the main process and not renderer) due to the impossibility to send custom headers with a WebSocket.

# Conventions

When you sees `UUIDv4` that means it's an UUIDv4, else it can also be denoted `userId`, `some username`, `blah blah blah` etc.

# Authorization

Most API endpoints will needs auth, you have to first login to get a token, then pass a custom header to your queries:

The format for the header is:
- key: "Authorization"
- value: "res userId:token"

> [!NOTE]
> this is not a standard Authorization Bearer.

# IDs syntax

A bunch of IDs are formatted using an identifier then a dash and something (like `U-userId` or `S-UUIDv4`), known ones are:
- UserID: `U`
- Session: `S`
- Record: `R`
- Group ?: `G`
- Message: `MSG`

Except User IDs and `G` (groups ?), all ID should be `X-` followed by an UUIDv4.

# Assets domain

Let's say you have an audio message, you will get a `resdb:///xxx` link, to get the asset domain equivalent, just substitute it with `https://assets.resonite.com/xxx`

# 'classic' endpoints

- [Login, Logout](auth.md)
- [Stats](stats.md)
- [Contacts](contacts.md)
- [User](user.md)
- [Sessions](sessions.md)
- [Records (inventory)](records.md)
- [Worlds search](worlds.md)

# SignalR 'hub'
- [see this file](signalr-hub.md)
