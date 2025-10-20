import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

// CORS許可（フロントからアクセスできるように）
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 得意先一覧取得
app.get("/customers", async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// ✅ 得意先登録API
app.post("/customers", async (req, res) => {
  try {
    const { name, email, tel } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name と email は必須です" });
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        tel,
      },
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
