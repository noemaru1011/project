/// <reference path="./types/express.d.ts" />
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { API_ROUTES } from '@shared/routes/routes';
import { ROLE } from '@shared/role';
import loginRoutes from '@/routes/loginRoutes';
import logoutRoutes from '@/routes/logoutRoutes';
import categoryRoutes from '@/routes/categoryRoutes';
import SubCategoryRoutes from '@/routes/subCategoryRoutes';
import MinorCategoryRoutes from '@/routes/minorCategoryRoutes';
import DepartmentRoutes from '@/routes/departmentRoutes';
import statusRoutes from '@/routes/statusRoutes';
import studentSearchRoutes from '@/routes/studentSearchRoutes';
import studentRoutes from '@/routes/studentRoutes';
import historyRoutes from '@/routes/historyRoutes';
import historySearchRoutes from '@/routes/historySearchRoutes';
import passwordRoutes from '@/routes/passwordRoutes';
import { requestLogger } from '@/middleware/requestLogger';
import { errorLogger } from '@/middleware/errorLogger';
//import { securityMiddleware } from '@/middleware/securityMiddleware';
import { authMiddleware, requireRole } from '@/middleware/authMiddleware';

const app = express();

// オリジンの指定と認証を扱う
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
);
//今は開発中なので無効
//app.use(securityMiddleware());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ログインは認証不要
app.use(API_ROUTES.LOGIN, requestLogger, loginRoutes);

app.use(API_ROUTES.LOGOUT, authMiddleware, requestLogger, logoutRoutes);

//パスワードの変更は学生のみ
app.use(
  API_ROUTES.PASSWORD,
  authMiddleware,
  requireRole([ROLE.STUDENT]),
  requestLogger,
  passwordRoutes,
);
//学生・管理者両方使える
app.use(API_ROUTES.HISTORY, authMiddleware, requestLogger, historyRoutes);
app.use(API_ROUTES.HISTORY_SEARCH, authMiddleware, requestLogger, historySearchRoutes);
app.use(API_ROUTES.STUDENT_SEARCH, authMiddleware, requestLogger, studentSearchRoutes);
app.use(API_ROUTES.CATEGORY, authMiddleware, requestLogger, categoryRoutes);
app.use(API_ROUTES.SUBCATEGORY, authMiddleware, requestLogger, SubCategoryRoutes);
app.use(API_ROUTES.MINOR_CATEGORY, authMiddleware, requestLogger, MinorCategoryRoutes);
app.use(API_ROUTES.DEPARTMENT, authMiddleware, requestLogger, DepartmentRoutes);
app.use(API_ROUTES.STATUS, authMiddleware, requestLogger, statusRoutes);
//(学生マスタの操作)管理者のみ
app.use(
  API_ROUTES.STUDENT,
  authMiddleware,
  requireRole([ROLE.ADMIN]),
  requestLogger,
  studentRoutes,
);

// エラーログ、最終的なレスポンス
app.use(errorLogger);

const PORT = Number(process.env.BACK_PORT);
app.listen(PORT, () => {
  console.log(`🚀 Backend running: ${process.env.BACK_URL}`);
});
