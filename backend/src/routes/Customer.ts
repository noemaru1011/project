import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { validation } from "../../../shared/schemas/Customer";

const prisma = new PrismaClient();
const router = Router();

router.get("/Index", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

router.post("/Create", async (req, res) => {
  try {
    const result = validation.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({ errors });
    }

    // undefined を null に変換
    const data = {
      ...result.data,
      tel: result.data.tel ?? null,
    };

    const newCustomer = await prisma.customer.create({ data });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

export default router;
