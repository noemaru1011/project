import { Api } from "./Api";
import type { MinorCategory } from "@shared/schemas/MinorCategory";
import { ROUTES } from "@/domain/routes";

export const MinorCategoryApi = {
  index: () =>
    Api<MinorCategory[]>(ROUTES.MinorCategory.INDEX, { method: "GET" }),
};
