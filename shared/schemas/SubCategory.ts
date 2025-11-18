import { z } from "zod";

export const validation = z.object({
  subCategoryName: z.string(),
});

export type SubCategory = z.infer<typeof validation>;
