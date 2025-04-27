# How to send a custom audio message

Most of the steps are the same as [Uploading an object to your inventory](/Tutorials/Uploading/Upload%20object%20to%20inventory.md), so I'll be referring back to that instead of repeating the same steps here.

Since there is no Data Tree file for an audio message, you do not need to edit any data tree files.

This tutorial assumes you already know how to connect to Resonite's SignalR hub

## Create Audio Message object
When you eventually send the SignalR function "SendMessage", you'll need both the audio [message object](/Data%20Types/Message.md), and the fully uploaded audio asset and associated record to go with it. Because the message object and record object reference each other for an audio message, it's recommended to create the message object first, with these filled out:

- A random id starting with `MSG-`
- The sender id being your user ID
- The messageType being `Sound`
- The recipient ID being the user ID of whoever you want to send the audio message to

## Create audio record object
This will be done the same way as [making an object record](/Tutorials/Uploading/Upload%20object%20to%20inventory.md#create-record-object), with these changes:

- The name of the record can be whatever you want, but Resonite always puts it as "Voice Message"
- Path will be null
- Thumbnail URI will be null
- Record Type set to `audio`
- Tags have these two strings:
  - `message_item`
  - `message_id:MESSAGEID` (where MESSAGEID is the id of the message object you made earlier)

(I am unsure if you actually need the tags, however, every audio message has these, so IMO better being safe than sorry.)

## Prepare your audio file
Resonite uses OGG Vorbis files (.ogg) for voice messages. You can probably send audio messages with any audio format Resonite supports, however, I would stick with .ogg, mainly for space saving reasons.

Hash your audio file using SHA-256, and use the resulting hash as the resdb link for your `assetUri` in the Record object (`resdb:///HASH.ogg`). Also add the hash and size of the audio file as an asset manifest, in the [same way as an object](/Tutorials/Uploading/Upload%20object%20to%20inventory.md#create-record-object). Even though there is only going to be the single audio asset to upload, you still need it as an array with a single asset manifest object.

## Asset uploading
This step is exactly the same as asset uploading for objects, so start with the [record preprocess step](/Tutorials/Uploading/Upload%20object%20to%20inventory.md#start-pre-process), then the [asset uploading step](/Tutorials/Uploading/Upload%20object%20to%20inventory.md#upload-assets), and follow all the way and stop before you do any of the [upload record step](/Tutorials/Uploading/Upload%20object%20to%20inventory.md#upload-record).

## Upload Record
Now that you've uploaded the audio asset, you actually need to tell the cloud that your audio record exists.

Send an authenticated PUT request to `https://api.resonite.com/users/USERID/records/RECORDID`; where:
- `USERID` is your User ID
- `RECORDID` is the record ID you have created in the record object

(The difference between this and the object one is that you don't need to ensure it's accessible in a folder)

The body of this request is the Record object as JSON (make sure you set the `Content-Type` header to `application/json`!).

This should just return a 200 OK and just relay back your Record object, now with `version.globalVersion` set to 1.

You will need to store the RETURNED record to use in the message object in the next step.

## Send audio message
Now that you have the audio asset uploaded and the record that references it, you can now send the voice message.

Add the returned record from the previous upload record step to the message object's content field as stringified JSON.

Now you can send the message using the "SendMessage" SignalR function target, with the message object as the argument.

---
You have successfully sent a custom audio message!