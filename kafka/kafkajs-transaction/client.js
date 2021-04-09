const client = new Kafka({
    clientId: "transactional-client",
    brokers: ["kafka1:9092", "kafka2:9092"]
});

const producer = client.producer({ maxInFlightRequests: 1, idempotent: true });

const transaction = await producer.transaction();

try {
    await transaction.send({ topic, messages });
    await transaction.commit();
} catch (err) {
    await transaction.abort();
}