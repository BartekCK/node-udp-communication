const dgram = require('dgram');

const PORT = 8080;
const HOST = "127.0.0.1";

const socket = dgram.createSocket("udp4");

const createFile = (fileName) => new Promise((resolve, reject) =>
    socket.send(Buffer.from(JSON.stringify({action: "CREATE_FILE", content: fileName})), PORT, HOST, (err) => {
        if (err) reject(err);
        resolve('File should be created');
    })
)

const writeToFile = (msg) => new Promise((resolve, reject) =>
    socket.send(Buffer.from(JSON.stringify({action: "WRITE_INTO_FILE", content: msg})), PORT, HOST, (err) => {
        if (err) reject(err);
        resolve('Content should be saved');
    })
)

const deleteFile = () => new Promise((resolve, reject) =>
    socket.send(Buffer.from(JSON.stringify({action: "DELETE_FILE"})), PORT, HOST, (err) => {
        if (err) reject(err);
        resolve('File should be removed');
    })
)

const startApp = async () => {
    await createFile("test.txt");
    await writeToFile("I want to save the message");

    setTimeout(async () => {
        await deleteFile();
        socket.close()
    },10000)
}

startApp();
