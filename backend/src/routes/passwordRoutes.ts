import { Router } from "express";
import { validateBody } from "@/middleware/validateMiddleware";
import { validation } from "@shared/schemas/password";
import { PasswordController } from "@/controllers/passwordController";

const router = Router();

router.post("/", validateBody(validation), PasswordController.updatePassword);

export default router;
