const { randomUUID } = require('node:crypto');
const { kafka, topic, Partitioners } = require('./config');

async function main() {
    const producer = kafka.producer({
        allowAutoTopicCreation: false,
        createPartitioner: Partitioners.DefaultPartitioner
    });

    await producer.connect();

    try {
        const publishEvent = {
            id: randomUUID(),
            text: process.argv.slice(2).join(' ')
        }
        const result = await producer.send({
            topic, acks: -1, messages: [{
                value: JSON.stringify(publishEvent)
            }]
        });
        console.log("Publication envoyée : ",publishEvent, result);
    } catch (error) {
        console.error(error.message);
        process.exicCode = 1;
    } finally {
        await producer.disconnect();
    }
}

main();