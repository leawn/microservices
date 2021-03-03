import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get(
    '/api/users/signup',
    [
      body('email')
          .isEmail()
          .withMessage('Email must be valid'),
      body('password')
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage('Password must be between 4 and 20 characters long')
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new Error('Invalid email or password');
        }

        const { email, password } = req.body;

        console.log('Creating a user...');
        throw new Error('Error connecting to db');

        res.send({});
    });

export { router as signupRouter };