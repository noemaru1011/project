import { z } from "zod";

export const validation = z.object({
  departmentId: z.string(),
  departmentName: z.string(),
});

export type Department = z.infer<typeof validation>;
