import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { API_ROUTES } from '@/constants/routes';
import loginRoutes from '@/routes/loginRoutes';
import logoutRoutes from '@/routes/logoutRoutes';
import categoryRoutes from '@/routes/categoryRoutes';
import SubCategoryRoutes from '@/routes/subCategoryRoutes';
import MinorCategoryRoutes from '@/routes/minorCategoryRoutes';
import DepartmentRoutes from '@/routes/departmentRoutes';
import statusRoutes from '@/routes/statusRoutes';
import studentRoutes from '@/routes/studentRoutes';
import passwordRoutes from '@/routes/passwordRoutes';
import { requestLogger } from '@/middleware/requestLogger';
import { errorLogger } from '@/middleware/errorLogger';
import { securityMiddleware } from '@/middleware/securityMiddleware';
import { authMiddleware, requireRole } from '@/middleware/authMiddleware';

const app = express();

// 基本ミドルウェア
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
);
//app.use(securityMiddleware());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 認証不要ルート（logger を通さない）
app.use(API_ROUTES.LOGIN, loginRoutes);
app.use(API_ROUTES.LOGOUT, logoutRoutes);

// 認証必須ルートに logger を適用
app.use(API_ROUTES.PASSWORD, authMiddleware, requestLogger, passwordRoutes);

app.use(API_ROUTES.CATEGORY, authMiddleware, requireRole('ADMIN'), requestLogger, categoryRoutes);
app.use(
  API_ROUTES.SUBCATEGORY,
  authMiddleware,
  requireRole('ADMIN'),
  requestLogger,
  SubCategoryRoutes,
);
app.use(
  API_ROUTES.MINOR_CATEGORY,
  authMiddleware,
  requireRole('ADMIN'),
  requestLogger,
  MinorCategoryRoutes,
);
app.use(
  API_ROUTES.DEPARTMENT,
  authMiddleware,
  requireRole('ADMIN'),
  requestLogger,
  DepartmentRoutes,
);
app.use(API_ROUTES.STATUS, authMiddleware, requireRole('ADMIN'), requestLogger, statusRoutes);
app.use(API_ROUTES.STUDENT, authMiddleware, requireRole('ADMIN'), requestLogger, studentRoutes);

// エラーログ
app.use(errorLogger);

const PORT = process.env.BACK_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Frontend connecting: ${process.env.FRONT_URL}`);
  console.log(`🚀 Backend running: ${process.env.BACK_URL}`);
  console.log(`🚀 DataBase connecting: ${process.env.DATABASE_URL}`);
  console.log('🚀 JWT_SECRET:', process.env.JWT_SECRET);
  console.log('🚀 RESEND_API_KEY:', process.env.RESEND_API_KEY);
});
