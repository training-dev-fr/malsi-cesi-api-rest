const { off } = require('node:cluster');
const { kafka, topic } = require('./config');

async function main() {
    const group = 'construction-kafka-01';
    const consumer = kafka.consumer({
        groupId: group,
        allowAutoTopicCreation: false
    });
    consumer.on(consumer.events.CRASH, ({ payload }) => {
        console.log('Consommateur interrompu : ' + payload.error.message);
    })

    await consumer.connect();

    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Reçu : ", {
                partition,
                offset: message.offset,
                cle: message.key?.toString(),
                valeur: message.value?.toString()
            });
        }
    })
}

main();