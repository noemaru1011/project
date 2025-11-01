import { Hooks } from "@/hooks/Hooks";
import { SubCategoryApi } from "@/api/subCategoryApi";
import type { SubCategory } from "@shared/schemas/SubCategory";

export function useSubCategory() {
  return Hooks<SubCategory>(SubCategoryApi);
}
