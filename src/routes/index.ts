import express, { Router } from 'express';
import productsRouter from './products.routes';
import authRouter from './auth.routes'
import ordersRouter from './orders.routes';

const router: Router = express.Router();

router.use('/auth', authRouter)
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export default router;
