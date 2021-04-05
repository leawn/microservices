const { Kafka } = require("kafkajs");
const fs = require("fs");

new Kafka({
    clientId: "my-app",
    brokers: ["kafka1:9092", "kafka2:9092"],
    ssl: {
        rejectUnauthorized: false,
        ca: [fs.readFileSync("/my/custom/ca.crt", "utf-8")],
        key: fs.readFileSync("/my/custom/client-key.pem", "utf-8"),
        cert: fs.readFileSync("/my/custom/client-cert.pem", "utf-8")
    }
})
