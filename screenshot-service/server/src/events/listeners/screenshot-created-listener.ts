import { Message } from "node-nats-streaming";
import { Listener, Subjects, ScreenshotCreatedEvent } from "@leawn-screenshot-service/common";
import { cloudinaryService } from "../../services/cloudinary-service";
import { natsService } from "../../services/nats-service";
import { takeScreenshot } from "../../services/screenshots-service";
import { ScreenshotFinishedPublisher } from "../publishers/screenshot-finished-publisher";

export class ScreenshotCreatedEventListener extends Listener<ScreenshotCreatedEvent> {
    readonly subject = Subjects.ScreenshotCreated;

    async onMessage(data: ScreenshotCreatedEvent["data"], msg: Message) {
        const path = `./assets/images/screenshot_${data.id}.png`;

        try {
            await takeScreenshot(data.url, path);
        } catch(err) {
            throw new Error("Screenshot failed");
        }

        const { public_id, url, version, width, height, bytes, format } = await cloudinaryService.client.uploader.upload(path);

        new ScreenshotFinishedPublisher(natsService.client).publish({
            id: data.id,
            cloudinaryId: public_id,
            cloudinaryUrl: url,
            cloudinaryVersion: version,
            width,
            height,
            bytes,
            format
        });
    }
}