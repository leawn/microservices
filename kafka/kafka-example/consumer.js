const {Kafka} = require("kafkajs");

run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:29092"]
        });

        const consumer = kafka.consumer({"groupId": "test"});

        await consumer.connect();
        console.log("Connected");

        consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        });

        await consumer.run({
            "eachMessage": async result => {
                console.log(`RVD msg ${result.message.value} on partition ${result.partition}`);
            }
        });

    } catch (error) {
        console.error(`Something bad happened ${error}`);
    }
}