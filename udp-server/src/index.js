const dgram = require("dgram");

const PORT = 8080;
const HOST = "127.0.0.1";

const socket = dgram.createSocket("udp4");

socket.on("listening", () => {
    console.log('UDP server start listening');
})

socket.on("connect", () => {
    console.log('New client connect');
})

socket.on("message", (msg) => {
    console.log(`I get a message = ${msg}`);
})

socket.bind(PORT, HOST);
