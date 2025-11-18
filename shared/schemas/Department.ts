import { z } from "zod";

export const validation = z.object({
  departmentName: z.string(),
});

export type Department = z.infer<typeof validation>;
