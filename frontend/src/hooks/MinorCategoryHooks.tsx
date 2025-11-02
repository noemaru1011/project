import { Hooks } from "@/hooks/Hooks";
import { MinorCategoryApi } from "@/api/minorCategoryApi";
import type { MinorCategory } from "@shared/schemas/MinorCategory";

export function useMinorCategory(autoFetch: boolean) {
  return Hooks<MinorCategory>(MinorCategoryApi, autoFetch);
}
