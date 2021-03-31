import { Listener, Subjects, ScreenshotFinishedEvent } from "@leawn-screenshot-service/common";
import { Message } from "node-nats-streaming";
import { Screenshot } from "../../models/screenshots";

export class ScreenshotFinishedEventListener extends Listener<ScreenshotFinishedEvent> {
    readonly subject = Subjects.ScreenshotFinished;

    async onMessage(data: ScreenshotFinishedEvent["data"], msg: Message) {
        const screenshot = await Screenshot.findById(data.id);
        if (!screenshot) {
            throw new Error("Screenshot not found");
        }

        screenshot.set({
            id: data.id,
            cloudinaryId: data.cloudinaryId,
            cloudinaryUrl: data.cloudinaryUrl,
            cloudinaryVersion: data.cloudinaryVersion,
            width: data.width,
            height: data.height,
            bytes: data.bytes,
            format: data.format
        });

        screenshot.save();
    }
}