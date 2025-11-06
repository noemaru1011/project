import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const Status = await prisma.status.findMany({
      select: {
        statusId: true,
        statusName: true,
      },
    });
    res.json(Status);
  } catch (error) {
    res.status(500).json({ message: "予期せぬエラーが発生しました" });
  }
});

export default router;
