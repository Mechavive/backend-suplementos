// src/routes/product.routes.ts

import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { idParamSchema } from '../schemas/common.schema.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productInputSchema, productUpdateSchema } from '../schemas/product.schema.js';

const router = Router();
// GET /api/products
router.get('/', ProductController.getAll);
// GET /api/products/:id
router.get('/:id', validate(idParamSchema, 'params'), ProductController.getById);
// POST /api/products
router.post('/', validate(productInputSchema, 'body'), ProductController.create);
// PATCH /api/products/:id
router.patch(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(productUpdateSchema, 'body'),
  ProductController.update,
);
// DELETE /api/products/:id
router.delete('/:id', validate(idParamSchema, 'params'), ProductController.delete);

export default router;
