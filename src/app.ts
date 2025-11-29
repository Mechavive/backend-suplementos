// src/app.ts

import express from 'express';
// para las imagenes
import path from 'path';
import productRoutes from './routes/product.routes';
import reviewsRoutes from './routes/review.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import cartRoutes from './routes/cart.routes';
import orderDetailRoutes from './routes/orderDetail.routes';
import itemCartRoutes from './routes/itemCart.routes';
import categoryRoutes from './routes/category.routes';
import { apiKeyMiddleware } from './middlewares/apiKey.middleware';

const app = express();
app.use(express.json());

// Servir archivos estáticos (imagenes públicas) sin protección (antes de la API KEY)
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Protección GLOBAL: API KEY
app.use(apiKeyMiddleware);

app.use('/api/itemCarts', itemCartRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderDetails', orderDetailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

export default app;
