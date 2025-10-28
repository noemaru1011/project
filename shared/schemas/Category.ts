import { z } from "zod";

export const validation = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
});

export type Category = z.infer<typeof validation>;

export const CategoryLabels: Record<
  keyof Pick<Category, "categoryName">,
  string
> = {
  categoryName: "大分類",
};
