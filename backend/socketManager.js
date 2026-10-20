let io = null;
const fs = require('fs');
const jwt = require('jsonwebtoken');

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

        socket.on("join-room", (roomId) => {
            const room = io.sockets.adapter.rooms.get(roomId);
            if(room && room.size >=2){
                socket.to(roomId).emit("room-full");
                return;
            }
            socket.join(roomId);
            socket.to(roomId).emit("room-joined");
            if(room && room.size === 2){
                socket.to(roomId).emit("start-call");
            }
        });

        socket.on("offer", ({roomId, offer})=>{
            socket.to(roomId).emit("offer",offer);
        });

        socket.on("answer", ({roomId, answer}) => {
            socket.to(roomId).emit("answer", answer);
        })

        socket.on("ice-candidate", ({roomId, answer}) => {
            socket.to(roomId).emit("ice-candidate", answer);
        })

        if (socket.handshake.auth && socket.handshake.auth.token != 'data') {
            const payload = jwt.verify(socket.handshake.auth.token, "verg61er6g51r651b6e1tg6rt851hg61rt5");
            socket.nickname = payload.nickname;
            socket.on("new-message", async (data) => {
                fs.appendFileSync("./backend/message.txt", socket.nickname + " : " + data.message + '\n');
                io.emit("message",socket.nickname + " : " + data.message);
            });
        }
    })


}

const getIo = () => {
    if (!io) {
        return null;
    }
    return io;
}

module.exports = { getIo, initSocket };