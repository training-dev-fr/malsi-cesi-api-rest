const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(require('path').join(__dirname, 'client')));

io.on('connection', socket => {
    console.log('Connection socket :' + socket.id);

    socket.on('join', room => {
        let nombre = io.sockets.adapter.rooms.get(room)?.size || 0;
        if(nombre >= 2){
            socket.emit('room-full',room);
            return;
        }
        socket.join(room);
        socket.data.room = room;
        
        socket.emit('room-joined', room);
        console.log("Utilisateur :" + socket.id + " a rejoins le salon : " + room);
        nombre = io.sockets.adapter.rooms.get(room)?.size || 0;
        if(nombre === 2){
            io.to(room).emit("room-ready",room);
            socket.emit('create-offer');
        }
    });

    for(const event of ["offer","answer"]){
        console.log("Connection rcp reçue, type : " + event)
        socket.on(event, content => {
            if(!socket.data.room){
                return;
            }
            socket.to(socket.data.room).emit(event, content);
        })
    }
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Ecoute sur le port 3000');
});

