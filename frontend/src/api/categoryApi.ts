import { Api } from "./Api";
import type { Category } from "@shared/schemas/Category";
import { API_ROUTES } from "@/constants/apiRoutes";

export const CategoryApi = {
  index: () => Api<Category[]>(API_ROUTES.CATEGORY.INDEX, { method: "GET" }),
};
