import express, { Request, Response, NextFunction } from "express";
import {NotAuthorizedError, NotFoundError, requireAuth} from "@leawn-tickets-market/common";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete(
    "/api/orders/:orderId",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        order.status = OrderStatus.Cancelled;
        await order.save();

        // Publishing an event this was cancelled

        res.status(204).send(order);
        // probably would be better with a patch or put or post?
    }
);

export { router as deleteOrderRouter };