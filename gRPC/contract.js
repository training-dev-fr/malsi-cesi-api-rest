const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const path = require('node:path');

const definition = loader.loadSync(path.join(__dirname, 'profiles.proto'));
const Profiles = grpc.loadPackageDefinition(definition).pack.Profiles;

module.exports = { grpc, Profiles };