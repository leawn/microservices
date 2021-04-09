const consumer = kafka.consumer({ groupId: "my-group" });

await consumer.connect();

await consumer.subscribe({ topic: "topic-A" });
await consumer.subscribe({ topic: "topic-B" });

await consumer.subscribe({ topic: "topic-C", fromBeginning: true });

// or:
await consumer.subscribe({ topic: /topic-(eu|us)-.*/i });


// processing data:
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            key: message.key.toString(),
            value: message.value.toString(),
            headers: message.headers
        });
    }
});


// processing data advanced example:
await.consumer.run({
    eachBatchAutoResolve: true,
    eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale
    }) => {
        for (let message of batch.messages) {
            console.log({
                topic: batch.topic,
                partition: batch.partition,
                highWatermark: batch.highWatermark,
                message: {
                    offset: message.offset,
                    key: message.key.toString(),
                    value: message.value.toString(),
                    headers: message.headers
                }
            });

            resolveOffset(message.offset);
            await heartbeat();
        }
    }
});


// If the consumer is shutting down in the middle of the batch,
// the remaining messages won't be resolved and therefore not committed.
// This way, you can quickly shut down the consumer without losing/skipping any messages.
// If the batch goes stale for some other reason (like calling consumer.seek)
// none of the remaining messages are processed either.
consumer.run({
    eachBatchAutoResolve: false,
    eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
        for (let message of batch.messages) {
            if (!isRunning() || isStale()) break
            await processMessage(message);
            resolveOffset(message.offset);
            await heartbeat();
        }
    }
});

// partition-aware concurrency
consumer.run({
    partitionConsumedConcurrently: 3, // default: 1
    eachMessage: async ({ topic, partition, message }) => {
        // This will be processed up to 3 times concurrently
    }
});