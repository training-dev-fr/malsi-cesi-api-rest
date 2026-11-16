const { kafka, topic } = require('./config');

async function main() {
    const admin = kafka.admin();
    await admin.connect();
    try {
        const newTopic = await admin.createTopics({
            waitForLeaders: true,
            topics: [{
                topic,
                numPartitions: 1,
                replicationFactor: 1,
                configEntries: [{
                    name: "retention.ms", value: '86400000'
                }]
            }]
        });
        console.dir(await admin.fetchTopicMetadata({
            topics: [topic]
        }), { depth: null }
        )

    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await admin.disconnect();
    }
}

main();