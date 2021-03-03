import express from 'express';

const router = express.Router();

router.get('/api/users/current', (req, res, next) => {
    res.send('Hi there');
});

export { router as currentRouter };