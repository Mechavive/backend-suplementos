import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { userInputSchema, userUpdateSchema } from "../schemas/user.schema.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// GET /api/users — obtener todos los usuarios (solo admin)
router.get("/", authenticateJWT, authorizeRole("ADMIN"), UserController.getAll);

// GET /api/users/:id — obtener usuario por ID (el propio usuario o admin)
router.get("/:id", authenticateJWT, validate(idParamSchema, "params"), UserController.getById);

// POST /api/users — registrar un nuevo usuario (público)
router.post("/", validate(userInputSchema, "body"), UserController.create);

// PUT /api/users/:id — actualizar usuario (solo el propio o admin)
router.put(
  "/:id",
  authenticateJWT,
  validate(idParamSchema, "params"),
  validate(userUpdateSchema, "body"),
  UserController.update
);

// DELETE /api/users/:id — eliminar usuario (solo admin)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole("ADMIN"),
  validate(idParamSchema, "params"),
  UserController.delete
);

export default router;
