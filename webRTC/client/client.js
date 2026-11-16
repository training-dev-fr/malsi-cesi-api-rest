const socket = io();
const eventDom = document.querySelector('.event');

function log(texte) {
    eventDom.innerHTML += `<li>${texte}</li>`;
}

document.querySelector('#join-room').addEventListener('click', () => {
    let roomName = document.querySelector('#room-name').value;
    socket.emit('join', roomName);
});

let localStream;
document.querySelector('#start-camera').addEventListener('click', async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.querySelector('#local-video').srcObject = localStream;
        log("Caméra activé");
    } catch (error) {
        log("Caméra inaccessible : " + error.message);
    }
});

socket.on('connect', () => {
    log("Socket.io connecté")
});

socket.on('disconnect', () => {
    log('Socket.io déconnecté');
});

socket.on('room-joined', (room) => {
    log("Salon rejoins :" + room)
});

socket.on('room-full', () => {
    log("Le salon est déjà plein");
});

socket.on('room-ready', (room) => {
    log("Salon " + room + " prêt pour webRTC");
});

let pair, canal;
let pendingCandidates = [];

socket.on('create-offer', async () => {
    pair = createPair();
    await pair.setLocalDescription(await pair.createOffer());
    socket.emit('offer', pair.localDescription.toJSON());
});

function createPair() {
    if (pair) {
        return pair;
    }
    pair = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    for (const track of localStream.getTracks()) {
        pair.addTrack(track, localStream);
    }
    pair.onconnectionstatechange = () => {
        log('Etat webRTC : ' + pair.connectionState);
    }
    pair.ondatachannel = e => {
        canal = e.channel;
        canal.onopen = () => {
            log("Canal de données ouvert");
        }
        canal.onclose = () => {
            log("Canal de données fermé");
        }
    }
    pair.ontrack = (event) => {
        document.querySelector('#remote-video').srcObject = event.streams[0];
        log("Vidéo distante reçue");
    }
    pair.onicecandidate = event => {
        if (event.candidate){
            socket.emit('ice-candidate',event.candidate.toJSON());
        }
    }
    return pair;
}

socket.on('offer', async offer => {
    const connection = createPair();
    await connection.setRemoteDescription(offer);
    log("Offre reçue");
    await connection.setLocalDescription(await connection.createAnswer());
    socket.emit('answer', connection.localDescription.toJSON());
    log('Réponse envoyée');
});

socket.on('answer', async (answer) => {
    const connection = pair;
    await connection.setRemoteDescription(answer);
    log("Réponse reçue");
});

socket.on('ice-candidate',async (candidate) => {
    const connection = createPair();
    if(connection.remoteDescription){
        await connection.addIceCandidate(candidate);
    }else{
        pendingCandidates.push(candidate);
    }
    log('Candidat ICE reçu');
})