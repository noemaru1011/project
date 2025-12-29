import { z } from "zod";

export const validation = z.object({
  grades: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  subCategoryIds: z.array(z.string()).optional(),
  minorCategoryIds: z.array(z.string()).optional(),
  departmentIds: z.array(z.string()).optional(),
});

export type StudentQueryForm = z.infer<typeof validation>;
