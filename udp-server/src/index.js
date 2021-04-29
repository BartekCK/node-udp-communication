const dgram = require('dgram');

// services
const fileService = require('./services/fileService');

// types
const ActionType = require('./types');

const PORT = 8080;
const HOST = '127.0.0.1';

const socket = dgram.createSocket('udp4');

socket.on('listening', () => {
    console.log('UDP server start listening');
});

socket.on('connect', () => {
    console.log('New client connect');
});

socket.on('message', async (msg) => {
    const obj = JSON.parse(Buffer.from(msg, 'utf-8').toString());
    const { action, content, fileName } = obj;

    switch (action) {
        case ActionType.createFile:
            await fileService.createFile(fileName);
            break;

        case ActionType.writeIntoFile:
            await fileService.writeToFile(fileName, content);
            break;

        case ActionType.deleteFile:
            await fileService.deleteFile(fileName);
            break;

        default:
            console.log('Action not found');
    }
});

socket.bind(PORT, HOST);
