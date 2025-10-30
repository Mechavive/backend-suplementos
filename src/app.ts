// src/app.ts

import express from 'express';
import productRoutes from './routes/product.routes';
import reviewsRoutes from './routes/review.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import cartRoutes from './routes/cart.routes';
import orderDetailRoutes from './routes/orderDetail.routes';

const app = express();
app.use(express.json());

app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderDetails', orderDetailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
