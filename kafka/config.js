const {Kafka, logLevel, Partitioners} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'construction-kafka-01',
    brokers: ["localhost:9092"],
    logLevel: logLevel.WARN
});

const topic = 'construction.kafka.01';

module.exports = {kafka, topic, Partitioners};