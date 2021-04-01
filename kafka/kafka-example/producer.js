const {Kafka} = require("kafkajs");

const msg = process.argv[2];

run();

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:29092"]
        });

        const producer = kafka.producer();

        await producer.connect();
        console.log("Connected");

        const partition = msg[0] < "N" ? 0 : 1;

        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        });

        console.log(`Created successfully ${JSON.stringify(result)}`);
        await producer.disconnect();

    } catch (error) {
        console.error(`Something bad happened ${error}`);
    }
    finally {
        process.exit();
    }
}