import { Api } from "./Api";
import type { SubCategory } from "@shared/schemas/subCategory";
import { API_ROUTES } from "@/constants/apiRoutes";

export const SubCategoryApi = {
  index: () =>
    Api<SubCategory[]>(API_ROUTES.SUBCATEGORY.INDEX, { method: "GET" }),
};
