import { z } from "zod";

export const validation = z.object({
  minorCategoryId: z.string(),
  minorCategoryName: z.string(),
});

export type MinorCategory = z.infer<typeof validation>;
