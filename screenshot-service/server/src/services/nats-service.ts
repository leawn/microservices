import nats, { Stan } from "node-nats-streaming";

class NatsService {
    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error("Cannot access Cloudinary client before connection");
        }
        return this._client
    }

    async connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise((res, rej) => {
            this._client!.on("connect", () => {
                console.log("Connected to NATS");
                res(true);
            });
            this._client!.on("error", (err) => {
                rej(err);
            })
        });
    }
}

export const natsService = new NatsService();