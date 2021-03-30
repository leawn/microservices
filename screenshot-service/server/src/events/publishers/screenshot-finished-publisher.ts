import { Publisher, Subjects, ScreenshotFinishedEvent } from "@leawn-screenshot-service/common";

export class ScreenshotFinishedPublisher extends Publisher<ScreenshotFinishedEvent> {
    readonly subject = Subjects.ScreenshotFinished;
}