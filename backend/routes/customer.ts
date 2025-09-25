import { Router, Request, Response } from "express";
import * as customerRepo from "../repositories/customerRepository";

const router = Router();

// 一覧取得
router.get("/", async (req: Request, res: Response) => {
  try {
    const customers = await customerRepo.getCustomers();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 1件取得
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Customer ID is required" });

  try {
    const customer = await customerRepo.getCustomerById(id);
    if (!customer) return res.status(404).json({ error: "Not found" });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 登録
router.post("/", async (req: Request, res: Response) => {
  try {
    const newCustomer = await customerRepo.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (err: any) {
    console.error(err);
    if (err.code === "23505") {
      // unique制約違反
      res.status(400).json({ error: "Customer name must be unique" });
    } else {
      res.status(500).json({ error: "Database error" });
    }
  }
});

// 更新
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Customer ID is required" });

  try {
    const updated = await customerRepo.updateCustomer(id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 削除
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Customer ID is required" });

  try {
    const deleted = await customerRepo.deleteCustomer(id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
