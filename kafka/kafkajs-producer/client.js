const { Kafka } = require("kafkajs");

const { Kafka } = require('kafkajs')


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092']
})

const producer = kafka.producer();

await producer.connect();

//regular example
await producer.send({
    topic: "topic-name",
    messages: [
        { key: "key1", value: "value1", partition: 0},
        { key: "key2", value: "value2", partition: 1}
    ]
});

//example w/ message headers, record headers
await producer.send({
    topic: "topic-name",
    messages: [{
        key: "key1",
        value: "value1",
        headers: {
            "correlation-id": "2bfb68bb-893a-423b-a7fa-7b568cad5b67",
            "system-id": "my-system"
        }
    }]
});

//example w/ producing to multiple topics
const topicMessages = [
    {
        topic: "topic-a",
        messages: [{ key: "key", value: "hello topic-a"}]
    },
    {
        topic: "topic-b",
        messages: [{ key: "key", value: "hello topic-b"}]
    },
    {
        topic: "topic-c",
        messages: [{ key: "key", value: "hello topic-c", headers: { "correlation-id": "2bfb68bb-893a-423b-a7fa-7b568cad5b67"}}]
    }
];

await producer.sendBatch({ topicMessages });