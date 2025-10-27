// src/routes/order.routes.ts

import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema, userIdParamSchema, paginationQuerySchema } from '../schemas/common.schema';
import { orderInputSchema, orderStatusSchema } from '../schemas/order.schema';

const router = Router();

// GET /api/orders
router.get('/', OrderController.getAll);

// GET /api/orders/:id
router.get('/:id', validate(idParamSchema, 'params'), OrderController.getById);

// GET /api/orders/user/:userId
router.get('/user/:userId', validate(userIdParamSchema, 'params'), OrderController.getByUserId);

// POST /api/orders
router.post('/', validate(orderInputSchema, 'body'), OrderController.create);

// DELETE /api/orders/:id
router.delete('/:id', validate(idParamSchema, 'params'), OrderController.delete);

// PATCH /api/orders/:id/status
router.patch(
  '/:id/status',
  validate(idParamSchema, 'params'),
  validate(orderStatusSchema, 'body'),
  OrderController.updateStatus,
);

export default router;
