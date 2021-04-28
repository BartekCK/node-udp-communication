const dgram = require("dgram");
const ActionType = require('./types');
const fileService = require('./services/fileService');
const queue = require('./models/Queue');

const PORT = 8080;
const HOST = "127.0.0.1";

const socket = dgram.createSocket("udp4");

socket.on("listening", () => {
    console.log('UDP server start listening');
})

socket.on("connect", () => {
    console.log('New client connect');
})

socket.on("message", async (msg) => {
    const obj = JSON.parse(Buffer.from(msg, "utf-8").toString());
    const {action, content, fileName} = obj;

    switch (action) {
        case ActionType.createFile:

            queue.addToList(() => fileService.createFile(fileName));
            console.log('1. Action for file create');
            break;

        case ActionType.writeIntoFile:
            queue.addToList(() => fileService.writeToFile(fileName, content));
            console.log('2. Action for file update');
            break;

        case ActionType.deleteFile:
            queue.addToList(() => fileService.deleteFile(fileName));
            console.log('3. Action for file delete');
            break;

        default:
            console.log('Action not found');
    }

})

socket.bind(PORT, HOST);
