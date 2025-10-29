// src/app.ts

import express from 'express';
import productRoutes from './routes/product.routes.js';
import reviewsRoutes from './routes/review.routes.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderDetailRoutes from './routes/orderDetail.routes.js';

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
