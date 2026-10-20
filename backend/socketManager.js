let io = null;
const fs = require('fs');

const initSocket = (server) => {
    const { Server } = require("socket.io");

    io = new Server(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connecté : " + socket.id);
        socket.on("new-message", async (data) => {
            fs.appendFileSync("./backend/message.txt", data.message + '\n');
        });
    })


}

const getIo = () => {
    if (!io) {
        return null;
    }
    return io;
}

module.exports = { getIo, initSocket };