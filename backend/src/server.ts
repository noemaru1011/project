import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/Category";
import SubCategoryRoutes from "./routes/SubCategory";
import MinorCategoryRoutes from "./routes/MinorSubCategory";
import DepartmentRoutes from "./routes/Department";
import statusRoutes from "./routes/Status";
import studentRoutes from "./routes/Student";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルートをまとめて登録
app.use("/Category", categoryRoutes);
app.use("/SubCategory", SubCategoryRoutes);
app.use("/MinorCategory", MinorCategoryRoutes);
app.use("/Department", DepartmentRoutes);
app.use("/Status", statusRoutes);
app.use("/Student", studentRoutes);

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`🗄️  Connecting to database at ${process.env.DATABASE_URL}`);
});
