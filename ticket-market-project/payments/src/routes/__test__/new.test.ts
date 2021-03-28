import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@leawn-tickets-market/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

jest.mock("../../stripe");

it("returns a 404 when purchasing an order that does not exist", async () => {
    await request(app)
        .post("/api/payments")
        .set("Cookie", global.signin())
        .send({
            token: "smth",
            orderId: mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created
    });
    await order.save();


    await request(app)
        .post("/api/payments")
        .set("Cookie", global.signin())
        .send({
            token: "smth",
            orderId: order.id
        })
        .expect(404);
});

it("returns a 400 when purchasing a cancelled order", async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled
    });
    await order.save();
    
    await request(app)
        .post("/api/payments")
        .set("Cookie", global.signin(userId))
        .send({
            token: "smth",
            orderId: order.id
        })
        .expect(400);
});

it("returns a 404 with valid inputs", async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Created
    });
    await order.save();

    await request(app)
            .post("/api/payments")
            .set("Cookie", global.signin(userId))
            .send({
                token: "tok_visa",
                orderId: order.id
            })
            .expect(201);

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
    expect(chargeOptions.source).toEqual("tok_visa");
    expect(chargeOptions.amount).toEqual(2000);
    expect(chargeOptions.currency).toEqual("usd");
});