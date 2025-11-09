import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { validateBody } from "@/middleware/validateMiddleware";
import validation from "@shared/schemas/Student";
import { StudentController } from "@/controllers/studentController";

const router = Router();

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getStudent);

router.post("/", validateBody(validation), StudentController.createStudent);

router.put("/:id", validateBody(validation), StudentController.updateStudent);

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.student.update({
//       where: { studentId: id },
//       data: {
//         deleteFlag: true,
//         updatedAt: new Date(),
//       },
//     });

//     res.status(201).json({ message: "削除完了" });
//   } catch (err: any) {
//     res.status(500).json({ message: "予期せぬエラーが発生しました" });
//   }
// });

export default router;
