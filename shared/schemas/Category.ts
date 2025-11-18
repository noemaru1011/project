import { z } from "zod";

export const validation = z.object({
  categoryName: z.string(),
});

export type Category = z.infer<typeof validation>;
