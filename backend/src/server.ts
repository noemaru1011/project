import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/Category";
import SubCategoryRoutes from "./routes/SubCategory";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルートをまとめて登録
app.use("/Category", categoryRoutes);
app.use("/SubCategory", SubCategoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`🗄️  Connecting to database at ${process.env.DATABASE_URL}`);
});
