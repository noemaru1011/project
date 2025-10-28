import { z } from "zod";

export const validation = z.object({
  subCategoryId: z.string(),
  subCategoryName: z.string(),
});

export type SubCategory = z.infer<typeof validation>;

export const SubCategoryLabels: Record<
  keyof Pick<SubCategory, "subCategoryName">,
  string
> = {
  subCategoryName: "中分類",
};
