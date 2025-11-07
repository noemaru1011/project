import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { API_ROUTES } from "./constants/routes";
import AuthRoutes from "./controllers/Auth";
import categoryRoutes from "@/routes/categoryRoutes";
import SubCategoryRoutes from "@/routes/subCategoryRoutes";
import MinorCategoryRoutes from "@/routes/minorCategoryRoutes";
import DepartmentRoutes from "@/routes/departmentRoutes";
import statusRoutes from "@/routes/statusRoutes";
import studentRoutes from "@/routes/studentRoutes";
import { authMiddleware } from "./middleware/auth";
import { csrfMiddleware } from "./middleware/csrf";

const app = express();
app.use(
  cors({
    //オリジンは今回は1つのみ
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!, // セッションIDを署名する秘密鍵
    resave: false, // リクエストごとにセッションを保存し直すか
    saveUninitialized: false, // 初期化されていないセッションを保存するか
    cookie: {
      // セッションIDを保持するクッキーの設定
      httpOnly: true, // JSからは読めない（XSS対策）
      secure: false,
      maxAge: 1000 * 60 * 60, // 1時間で有効期限切れ
    },
  })
);
//ネストされたJSONなどを解析できるようにパース
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 認証不要
app.use(API_ROUTES.AUTH, AuthRoutes);

// 認証必須
app.use(API_ROUTES.CATEGORY, authMiddleware, categoryRoutes);
app.use(API_ROUTES.SUBCATEGORY, authMiddleware, SubCategoryRoutes);
app.use(API_ROUTES.MINOR_CATEGORY, authMiddleware, MinorCategoryRoutes);
app.use(API_ROUTES.DEPARTMENT, authMiddleware, DepartmentRoutes);
app.use(API_ROUTES.STATUS, authMiddleware, statusRoutes);
app.use(API_ROUTES.STUDENT, authMiddleware, studentRoutes);

const PORT = process.env.BACK_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Frontend connecting: ${process.env.FRONT_URL}`);
  console.log(`🚀 Backend running: ${process.env.BACK_URL}`);
  console.log(`🚀 DataBase connecting: ${process.env.DATABASE_URL}`);
});
