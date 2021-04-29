const dgram = require('dgram');

const PORT = 8080;
const HOST = '127.0.0.1';

const socket = dgram.createSocket('udp4');

const createFile = (fileName) =>
    new Promise((resolve, reject) =>
        socket.send(
            Buffer.from(JSON.stringify({ action: 'CREATE_FILE', fileName })),
            PORT,
            HOST,
            (err) => {
                if (err) reject(err);
                resolve('1. File should be created');
            },
        ),
    );

const writeToFile = (fileName, msg) =>
    new Promise((resolve, reject) =>
        socket.send(
            Buffer.from(
                JSON.stringify({
                    action: 'WRITE_INTO_FILE',
                    fileName,
                    content: msg,
                }),
            ),
            PORT,
            HOST,
            (err) => {
                if (err) reject(err);
                resolve('2. Content should be saved');
            },
        ),
    );

const deleteFile = (fileName) =>
    new Promise((resolve, reject) =>
        socket.send(
            Buffer.from(JSON.stringify({ action: 'DELETE_FILE', fileName })),
            PORT,
            HOST,
            (err) => {
                if (err) reject(err);
                resolve('3. File should be removed');
            },
        ),
    );

const startApp = async () => {
    console.log(await createFile('test.txt'));
    console.log(await writeToFile('test.txt', 'I want to save the message'));

    setTimeout(async () => {
        console.log(await deleteFile('test.txt'));
        socket.close();
    }, 10000);
};

startApp();
