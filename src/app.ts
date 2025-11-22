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

// TODO: en el backend localhost: http://localhost:3000/images/products/Proteina-Vegetal.webp

// TODO: En el frontend quedaria como:
// https://backend-suplementos.onrender.com/images/products/ProteínaWhey.webp

// Servir archivos estáticos (imagenes públicas) sin protección (antes de la API KEY)
app.use('/images', express.static(path.join(__dirname, '../public/images')));

//  DEBUG: ver qué headers llegan a Render
// app.use((req, res, next) => {
//   console.log('HEADERS RECIBIDOS:', req.headers);
//   next();
// });

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
