const { grpc, Profiles } = require('./contract');
const server = new grpc.Server();

server.addService(Profiles.service, {
    bonjour(call, answer) {
        answer(null, { texte: "Bonjour depuis le serveur gRPC" });
    }
});

server.bindAsync('127.0.0.1:50052',
    grpc.ServerCredentials.createInsecure(),
    error => {
        if (error) {
            console.log(error.message);
            process.exitCode = 1;
            return;
        }
        console.log("Serveur grpc prêt sur localhost:50052");
    }
);

process.on('SIGINT', () => server.tryShutdown(() => process.exit(0)));