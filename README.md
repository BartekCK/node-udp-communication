# UDP communication with Node.js

TCP is everyhere, so everyone should ***rest*** sometimes 😎 <br/>
I made simple server which listen to datagrams and do actions with file system by 'fs' module.

This example is a `small` antipattern. We shouldn't send a datagram with commands for file system manage (but it depends ...). If we send command for **delete file**, but file not exist, client should get a response with error, but this is not TCP ☺️<br/>So in this kind of problem client/user cannot get information about transaction.
<br/><br/>
I created also `UDP client` with Node for show faster way to see result.
For both app I use 'dgram' and 'fs module in server part.

## File system server commands
Server for fs management should get a special data buffer. In this kind I use a JSON.

- Create file
```json
{
    "action": "CREATE_FILE",
    "fileName": "test.txt",
}
```

- Update file
```json
{
    "action": "WRITE_INTO_FILE",
    "fileName": "test.txt",
    "content": "ala ma kota"
}
```

- Delete file
```json
{
    "action": "DELETE_FILE",
    "fileName": "test.txt",
}
```
## Start server

Go to ***node-udp-communication/udp-server*** and exc commands:
```
npm i
npm start
```


## Execute commands for client (before this step start server)

### With `netcat`
![client with netcat](./assets/netcatClient.gif)
<br/>
- Create file
```bash
echo "{\"action\": \"CREATE_FILE\", \"fileName\": \"test.txt\"}" | nc -w1 -u 127.0.0.1 8080
```

- Update file
```bash
echo "{\"action\": \"WRITE_INTO_FILE\", \"fileName\": \"test.txt\", \"content\": \"ala ma kota\"}" | nc -w1 -u 127.0.0.1 8080
```

- Delete file
```bash
echo "{\"action\": \"DELETE_FILE\", \"fileName\": \"test.txt\"}" | nc -w1 -u 127.0.0.1 8080
```


### With Node.js client app
![client with netcat](./assets/nodeClient.gif)
<br/>
Go to ***node-udp-communication/udp-client*** and exc commands:
```
npm i
npm start
```
***(App send DETELE command after 10 sec)***


## Requirements
- Node.js >= 10.0
- npm >= 6.0
