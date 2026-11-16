const { Profiles } = require('./contract');

console.log("Méthodes du contrat : ", Object.keys(Profiles.service));
console.log("Chemin du RPC : " + Profiles.service.Bonjour.path);