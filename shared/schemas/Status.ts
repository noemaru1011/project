import { z } from "zod";

export const validation = z.object({
  statusId: z.string(),
  statusName: z.string(),
});

export type Status = z.infer<typeof validation>;
