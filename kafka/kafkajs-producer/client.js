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

//example w/ custom partitioner
const MyPartitioner = () => {
    return ({ topic, partitionMetadata, message }) => {
        // select a partition based on some logic
        // return the partition number
        return 0;
    }
}

const PARTITION_METADATA = [
    { partitionId: 1, leader: 1 },
    { partitionId: 2, leader: 2 },
    { partitionId: 0, leader: 0 }
];

kafka.producer({ createPartitioner: MyPartitioner });

// example w/ default partitioners (requires JavaCompatiblePartitioner!)
const { Partitioners } = require("kafkajs");
kafka.producer({ createPartitioner: Partitioners.JavaCompatiblePartitioner });

// example w/ compression

//// GZIP compression protocol
const { CompressionTypes } = require("kafkajs");

async () => {
    await producer.send({
        topic: "topic-name",
        compression: CompressionTypes.GZIP,
        messages: [
            { key: "key1", value: "value1" },
            { key: "key2", value: "value2" }
        ]
    });
}

//// Snappy compression protocol *npm install --save kafkajs-snappy*
const { CompressionTypes, CompressionCodecs } = require("kafkajs");
const SnappyCodec = require("kafkajs-snappy");

CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec;

//// LZ4 compression protocol *npm install --save kafkajs-lz4*
const { CompressionTypes, CompressionCodecs } = require("kafkajs");
const LZ4 = require("kafkajs-lz4");

CompressionCodecs[CompressionTypes.LZ4] = new LZ4().codec;

//// ZSTD compression protocol *npm install --save @kafkajs/zstd*
const { CompressionTypes, CompressionCodecs } = require("kafkajs");
const ZstdCodec = require("@kafkajs/zstd");

CompressionCodecs[CompressionTypes.ZSTD] = ZstdCodec();