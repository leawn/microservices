import {natsService} from "./services/nats-service";
import { ScreenshotFinishedEventListener } from "./events/listeners/screenshot-finished-listener";
import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("Process environment variables must be defined");
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("Process environment variables must be defined");
    }

    if (!process.env.NATS_URL) {
        throw new Error("Process environment variables must be defined");
    }

    if (!process.env.MONGO_URL) {
        throw new Error("Process environment variables must be defined");
    }

    try {
        await natsService.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsService.client.on("close", () => {
            console.log("NATS connection lost");
            process.exit();
        });
        process.on("SIGINT", () => {
            natsService.client.close();
        });
        process.on("SIGTERM", () => {
            natsService.client.close();
        });

        new ScreenshotFinishedEventListener(natsService.client).listen();

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to mongodb");

    } catch(err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    })
}

start();