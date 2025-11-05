import { Hooks } from "@/hooks/Hooks";
import { CategoryApi } from "@/api/categoryApi";
import type { Category } from "@shared/schemas/Category";

export function useCategory() {
  return Hooks<Category>(CategoryApi);
}
