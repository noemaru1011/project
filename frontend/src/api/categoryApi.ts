import { Api } from "./Api";
import type { Category } from "@shared/schemas/category";
import { API_ROUTES } from "@/constants/apiRoutes";

export const CategoryApi = {
  index: () => Api<Category[]>(API_ROUTES.CATEGORY.INDEX, { method: "GET" }),
};
