import { Hooks } from "@/hooks/Hooks";
import { MinorCategoryApi } from "@/api/minorCategoryApi";
import type { MinorCategory } from "@shared/schemas/minorCategory";

export function useMinorCategory() {
  return Hooks<MinorCategory>(MinorCategoryApi);
}
