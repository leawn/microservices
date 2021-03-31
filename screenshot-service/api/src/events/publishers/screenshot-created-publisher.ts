import { Publisher, Subjects, ScreenshotCreatedEvent } from "@leawn-screenshot-service/common";

export class ScreenshotCreatedEventPublisher extends Publisher<ScreenshotCreatedEvent> {
    readonly subject = Subjects.ScreenshotCreated;
}