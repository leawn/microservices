import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@leawn-tickets-market/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
    "/api/tickets",
    requireAuth,
    [
        body("title")
            .not()
            .isEmpty()
            .withMessage("Title is required"),
        body("price")
            .isFloat({ gt: 0 })
            .withMessage("Price must be greater that 0")
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const { title, price } = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        });
        await ticket.save();

        res.status(201).send(ticket);
    });

export { router as createTicketRouter };