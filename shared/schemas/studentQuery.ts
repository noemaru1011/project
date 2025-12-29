import { z } from "zod";

const SUBCATEGORY_VALUES = Array.from({ length: 16 }, (_, i) => String(i + 1));
const MINORCATEGORY_VALUES = Array.from({ length: 48 }, (_, i) =>
  String(i + 1)
);
export const validation = z.object({
  grades: z.array(z.enum(["1", "2", "3", "4"]), {
    message: "存在する学年を選択してください。",
  }),

  categoryIds: z.array(z.enum(["1", "2", "3", "4"]), {
    message: "存在する大分類を選択してください。",
  }),

  subCategoryIds: z.array(z.enum(SUBCATEGORY_VALUES as [string, ...string[]]), {
    message: "存在する小分類を選択してください。",
  }),

  minorCategoryIds: z.array(
    z.enum(MINORCATEGORY_VALUES as [string, ...string[]]),
    {
      message: "存在する小分類を選択してください。",
    }
  ),

  departmentIds: z.array(z.enum(["1", "2", "3", "4", "5", "6", "7"]), {
    message: "存在する学科を選択してください。",
  }),
});

export type StudentQueryForm = z.infer<typeof validation>;
