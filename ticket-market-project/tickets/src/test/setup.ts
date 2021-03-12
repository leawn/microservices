import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>
        }
    }
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'smth';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    // Build a JWT payload. { id, email }

    // Create the JWT!

    // Build session object. { jwt: MY_JWT }

    // Turn that session into JSON

    // Take JSON and encode it as base64

    // Return a string that is the cookie with the encoded data

    /*const email = "test@test.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email, password
        })
        .expect(201);

    const cookie = response.get("Set-Cookie");

    return cookie;*/
}