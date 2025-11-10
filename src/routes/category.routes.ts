import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware'; // middleware general con zod
import { idParamSchema } from '../schemas/common.schema';
import CategoryController from '../controllers/category.controller';
import { CategorySchema } from '../schemas/category.schema';

const router = Router();

// GET /api/category
router.get('/', CategoryController.getAll);
// GET /api/category/:id
router.get('/:id', validate(idParamSchema, 'params'), CategoryController.getById);
// POST /api/category/
router.post('/', validate(CategorySchema, 'body'), CategoryController.create);
// DELETE /api/category/:id
router.delete('/:id', validate(idParamSchema, 'params'), CategoryController.delete);

export default router;
