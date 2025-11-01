import { z } from "zod";

export const validation = z.object({
  subCategoryId: z.string(),
  subCategoryName: z.string(),
});

export type SubCategory = z.infer<typeof validation>;
