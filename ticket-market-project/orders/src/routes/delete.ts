import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response, next: NextFunction) => {
    res.send({});
});

export { router as deleteOrderRouter };