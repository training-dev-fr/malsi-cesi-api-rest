const { kafka, topic } = require('./config');

async function main() {
    const admin = kafka.admin();
    await admin.connect();
    try {
        console.dir(await admin.describeCluster(), { depth: null });
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await admin.disconnect();
    }
}

main();