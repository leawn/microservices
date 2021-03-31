import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

interface ScreenshotAttrs {}
interface ScreenshotDoc extends mongoose.Document {
    id: string;
    cloudinaryId: string;
    cloudinaryUrl: string;
    cloudinaryVersion: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
}
interface ScreenshotModel extends mongoose.Model<ScreenshotDoc> {
    build(attrs: ScreenshotAttrs): ScreenshotDoc;
}

const screenshotSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    cloudinaryUrl: {
        type: String,
        required: true
    },
    cloudinaryVersion: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    bytes: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

screenshotSchema.statics.build = (attrs: ScreenshotAttrs) => {
    return new Screenshot(attrs);
}

const Screenshot = mongoose.model<ScreenshotDoc, ScreenshotModel>("Screenshot", screenshotSchema);

export { Screenshot };