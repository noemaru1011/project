import { Router } from "express";
import { DepartmentController } from "@/controllers/departmentController";

const router = Router();

router.get("/", DepartmentController.getAllDepartments);

export default router;
