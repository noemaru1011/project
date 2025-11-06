import { Api } from "./Api";
import type { MinorCategory } from "@shared/schemas/MinorCategory";
import { API_ROUTES } from "@/constants/apiRoutes";

export const MinorCategoryApi = {
  index: () =>
    Api<MinorCategory[]>(API_ROUTES.MINORCATEGORY.INDEX, { method: "GET" }),
};
