const socket = io('http://localhost:3000');

socket.on("connect", () => {
    console.log("Connecté au serveur via socket !"); 
});

document.querySelector("#sendMessage").addEventListener('click',() => {
    socket.emit("new-message",{
        message : document.querySelector("#message").value
    });
})