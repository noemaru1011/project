/// <reference path="./types/express.d.ts" />
import 'tsconfig-paths/register';
import express from 'express';
import { API_ROUTES } from '@shared/routes/routes';
import { ROLE } from '@shared/models/common';
import loginRoutes from '@/features/auth/routes/loginRoutes';
import logoutRoutes from '@/features/auth/routes/logoutRoutes';
import logRoutes from '@/features/log/routes/logRoutes';
import categoryRoutes from '@/features/category/routes/categoryRoutes';
import SubCategoryRoutes from '@/features/subCategory/routes/subCategoryRoutes';
import MinorCategoryRoutes from '@/features/minorCategory/routes/minorCategoryRoutes';
import DepartmentRoutes from '@/features/department/routes/departmentRoutes';
import statusRoutes from '@/features/status/routes/statusRoutes';
import studentSearchRoutes from '@/features/student/routes/studentSearchRoutes';
import studentRoutes from '@/features/student/routes/studentRoutes';
import historyRoutes from '@/features/history/routes/historyRoutes';
import historySearchRoutes from '@/features/history/routes/historySearchRoutes';
import passwordRoutes from '@/features/auth/routes/passwordRoutes';
import {
  authMiddleware,
  requireRole,
  errorLogger,
  requestLogger,
  commonMiddlewares,
} from '@/middleware';

const app = express();
app.use(...commonMiddlewares);

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
app.use(API_ROUTES.HISTORY_SEARCH, authMiddleware, requestLogger, historySearchRoutes);
app.use(API_ROUTES.HISTORY, authMiddleware, requestLogger, historyRoutes);
app.use(API_ROUTES.STUDENT_SEARCH, authMiddleware, requestLogger, studentSearchRoutes);
app.use(API_ROUTES.CATEGORY, authMiddleware, requestLogger, categoryRoutes);
app.use(API_ROUTES.SUBCATEGORY, authMiddleware, requestLogger, SubCategoryRoutes);
app.use(API_ROUTES.MINOR_CATEGORY, authMiddleware, requestLogger, MinorCategoryRoutes);
app.use(API_ROUTES.DEPARTMENT, authMiddleware, requestLogger, DepartmentRoutes);
app.use(API_ROUTES.STATUS, authMiddleware, requestLogger, statusRoutes);
//管理者のみ
app.use(
  API_ROUTES.STUDENT,
  authMiddleware,
  requireRole([ROLE.ADMIN]),
  requestLogger,
  studentRoutes,
);
app.use(API_ROUTES.LOG, authMiddleware, requireRole([ROLE.ADMIN]), requestLogger, logRoutes);

// エラーログ、最終的なレスポンス
app.use(errorLogger);

export default app;
