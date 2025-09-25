import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { pool } from "./db";

// ルート
import customerRoutes from "./routes/customer";
const app: Application = express();

// === ミドルウェア設定 ===
app.use(
  cors({
    origin: "http://localhost:5173", // ← ここをフロントのポートに変更
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// === ヘルスチェック（DB接続確認用） ===
app.get("/health", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "ok", serverTime: result.rows[0] });
  } catch (err) {
    console.error("DB Health Check Failed:", err);
    res.status(500).json({ status: "error", message: "Database error" });
  }
});

// === APIルート登録 ===
app.use("/api/customers", customerRoutes);

// === エラーハンドリング ===
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
