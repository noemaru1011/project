import { Api } from "./Api";
import type { SubCategory } from "@shared/schemas/SubCategory";
import { ROUTES } from "@/domain/routes";

export const SubCategoryApi = {
  index: () => Api<SubCategory[]>(ROUTES.SubCategory.INDEX, { method: "GET" }),
};
