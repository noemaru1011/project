import { z } from "zod";

export const validation = z.object({
  minorCategoryName: z.string(),
});

export type MinorCategory = z.infer<typeof validation>;
