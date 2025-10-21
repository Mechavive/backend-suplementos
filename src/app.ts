// src/app.ts

import express from 'express';
import productRoutes from './routes/product.routes.js';
import reviewsRoutes from './routes/review.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', orderRoutes);

export default app;
