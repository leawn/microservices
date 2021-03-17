import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/api/orders", async (req: Request, res: Response, next: NextFunction) => {
    res.send({});
});

export { router as indexOrderRouter };