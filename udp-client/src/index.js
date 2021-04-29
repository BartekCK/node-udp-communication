const dgram = require('dgram');

// types
const ActionType = require('./types');

const PORT = 8080;
const HOST = '127.0.0.1';

const socket = dgram.createSocket('udp4');

const sendMsgBySocket = (
    command, // { action: ActionType, fileName: string, content?: string }
) =>
    new Promise((resolve, reject) => {
        const buffer = Buffer.from(JSON.stringify(command));
        socket.send(buffer, PORT, HOST, (err) => {
            if (err) reject(err);
            resolve(command.action);
        });
    });

const startApp = async () => {
    /**
     * Create new file
     */
    console.log(await sendMsgBySocket({ action: ActionType.createFile, fileName: 'test.txt' }));
    /**
     * Write msg to created file
     */
    console.log(
        await sendMsgBySocket({ action: ActionType.writeIntoFile, fileName: 'test.txt', content: 'Ala ma kota' }),
    );

    /**
     * Delete file
     */
    setTimeout(async () => {
        console.log(await sendMsgBySocket({ action: ActionType.deleteFile, fileName: 'test.txt' }));
        socket.close();
    }, 10000);
};

startApp();
