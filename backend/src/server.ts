import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";
import AuthRoutes from "./routes/Auth";
import categoryRoutes from "./routes/Category";
import SubCategoryRoutes from "./routes/SubCategory";
import MinorCategoryRoutes from "./routes/MinorSubCategory";
import DepartmentRoutes from "./routes/Department";
import statusRoutes from "./routes/Status";
import studentRoutes from "./routes/Student";
//import { authMiddleware } from "./middleware/auth";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // フロントエンドURL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 認証不要
app.use("/Auth", AuthRoutes);

// 認証必須
app.use("/Category", categoryRoutes);
app.use("/SubCategory", SubCategoryRoutes);
app.use("/MinorCategory", MinorCategoryRoutes);
app.use("/Department", DepartmentRoutes);
app.use("/Status", statusRoutes);
app.use("/Student", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running: http://localhost:${PORT}`);
});
