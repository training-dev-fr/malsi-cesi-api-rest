const { grpc, Profiles } = require('./contract');

const client = new Profiles('127.0.0.1:50052', grpc.credentials.createInsecure());

function resultat(error, response) {
    if (error) {
        console.log("Erreur gRPC", error.code, error.details);
        process.exitCode = 1;
    } else {
        console.log('Réponse : ', response);
    }
    client.close();
}

{
    client.bonjour({},resultat);
}