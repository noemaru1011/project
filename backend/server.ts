import express from "express";
import type { Application, Request, Response } from "express";
import { pool } from "./db";

const app: Application = express();
const PORT = 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ serverTime: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
