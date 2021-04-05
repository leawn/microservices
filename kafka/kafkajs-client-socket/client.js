const { Kafka } = require("kafkajs");

const net = require("net");
const tls = require("tls");

const mySocketFactory = ({ host, port, ssl, onConnect }) => {
    const socket = ssl
        ? tls.connect(
            Object.assign({ host, port }, ssl),
            onConnect
        )
        : net.connect(
            { host, port },
            onConnect
        );
    
    socket.setKeepAlive(true, 3000);

    return socket;
}

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka1:9092", "kafka2:9092"],
    socketFactory: mySocketFactory
});