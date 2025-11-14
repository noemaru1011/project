import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { API_ROUTES } from "@/constants/routes";
import loginRoutes from "@/routes/loginRoutes";
import logoutRoutes from "@/routes/logoutRoutes";
import categoryRoutes from "@/routes/categoryRoutes";
import SubCategoryRoutes from "@/routes/subCategoryRoutes";
import MinorCategoryRoutes from "@/routes/minorCategoryRoutes";
import DepartmentRoutes from "@/routes/departmentRoutes";
import statusRoutes from "@/routes/statusRoutes";
import studentRoutes from "@/routes/studentRoutes";
import passwordRoutes from "@/routes/passwordRoutes";
import { securityMiddleware } from "@/middleware/securityMiddleware";
import { authMiddleware, requireRole } from "@/middleware/authMiddleware";

const app = express();
app.use(
  cors({
    //オリジンは今回は1つのみ
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);
app.use(securityMiddleware());
app.use(cookieParser());
//ネストされたJSONなどを解析できるようにパース
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 認証不要
app.use(API_ROUTES.LOGIN, loginRoutes);
app.use(API_ROUTES.LOGOUT, logoutRoutes);

//認証必須
app.use(API_ROUTES.PASSWORD, authMiddleware, passwordRoutes);

// 認証必須かつ管理者専用
app.use(
  API_ROUTES.CATEGORY,
  authMiddleware,
  requireRole("ADMIN"),
  categoryRoutes
);
app.use(
  API_ROUTES.SUBCATEGORY,
  authMiddleware,
  requireRole("ADMIN"),
  SubCategoryRoutes
);
app.use(
  API_ROUTES.MINOR_CATEGORY,
  authMiddleware,
  requireRole("ADMIN"),
  MinorCategoryRoutes
);
app.use(
  API_ROUTES.DEPARTMENT,
  authMiddleware,
  requireRole("ADMIN"),
  DepartmentRoutes
);
app.use(API_ROUTES.STATUS, authMiddleware, requireRole("ADMIN"), statusRoutes);
app.use(
  API_ROUTES.STUDENT,
  authMiddleware,
  requireRole("ADMIN"),
  studentRoutes
);

const PORT = process.env.BACK_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Frontend connecting: ${process.env.FRONT_URL}`);
  console.log(`🚀 Backend running: ${process.env.BACK_URL}`);
  console.log(`🚀 DataBase connecting: ${process.env.DATABASE_URL}`);
  console.log("🚀 JWT_SECRET:", process.env.JWT_SECRET);
  console.log("🚀 RESEND_API_KEY:", process.env.RESEND_API_KEY);
});
