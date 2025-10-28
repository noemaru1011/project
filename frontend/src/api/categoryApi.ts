import { Api } from "./Api";
import type { Category } from "@shared/schemas/Category";
import { ROUTES } from "@/domain/routes";

export const CategoryApi = {
  index: () => Api<Category[]>(ROUTES.Category.INDEX, { method: "GET" }),
};
