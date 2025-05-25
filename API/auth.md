# Login
`POST /userSessions`

With the following body:
```json
{
  "username": "the username",
  "authentication": {
    "$type": "password",
    "password": "guess what"
  },
  "rememberMe": true,
  "secretMachineId": "xxx"
}
```

- `rememberMe`: if true, will provides a 30-days token validity
- `secretMachineId`: a random 128 chars value

And Headers:
- `Content-Type`: `application/json`
- `UID`: The SHA-256 of.. whatever
- `TOTP`: if 2FA is enabled, it's the current valid token

You will then get as a result something like:
```json
{
  "entity": {
    "userId": "U-urUserId",
    "token": "THE-TOKEN-VALUE=",
    "created": "2025-05-24T20:49:29.6335177Z",
    "expire": "2025-06-23T20:49:29.63359Z",
    "rememberMe": true,
    "secretMachineIdHash": "xxx=",
    "secretMachineIdSalt": "xxx=",
    "uidHash": "xxx=",
    "uidSalt": "xxx=",
    "originalLoginType": "Password",
    "originalLoginId": "Auth-AN-UUID-V4",
    "logoutUrlClientSide": false,
    "sessionLoginCounter": 1,
    "sourceIP": "12.34.56.78",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) resoweb/1.0.0 Chrome/136.0.7103.93 Electron/36.2.1 Safari/537.36",
    "isMachineBound": false,
    "partitionKey": "U-urUserId",
    "rowKey": "THE-SAME-VALUE-AS-TOKEN=",
    "eTag": null
  }
}
```

# Extending token life

TODO

# Logout

`DELETE /userSessions/<userId>/<token>`

Needs Authorization: yes
