const {Kafka} = require("kafkajs");

run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:29092"]
        });

        const admin = kafka.admin();
        await admin.connect();
        console.log("Connected");
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        });

        console.log("Created successfully");
        await admin.disconnect();

    } catch (error) {
        console.error(`Something bad happened ${error}`);
    }
    finally {
        process.exit();
    }
}