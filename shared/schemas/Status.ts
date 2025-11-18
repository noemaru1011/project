import { z } from "zod";

export const validation = z.object({
  statusName: z.string(),
});

export type Status = z.infer<typeof validation>;
