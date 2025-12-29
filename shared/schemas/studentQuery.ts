import { z } from "zod";

const SUBCATEGORY_VALUES = Array.from({ length: 16 }, (_, i) => String(i + 1));
const MINORCATEGORY_VALUES = Array.from({ length: 48 }, (_, i) =>
  String(i + 1)
);

export const validation = z.object({
  grades: z
    .array(z.enum(["1", "2", "3", "4"]), {
      error: "存在する学年を選択してください。",
    })
    .optional(),
  categoryIds: z
    .array(z.enum(["1", "2", "3", "4"]), {
      error: "存在する大分類を選択してください。",
    })
    .optional(),
  subCategoryIds: z
    .array(z.enum(SUBCATEGORY_VALUES as [string, ...string[]]), {
      error: "存在する小分類を選択してください。",
    })
    .optional(),
  minorCategoryIds: z
    .array(z.enum(MINORCATEGORY_VALUES as [string, ...string[]]), {
      error: "存在する小分類を選択してください。",
    })
    .optional(),
  departmentIds: z
    .array(z.enum(["1", "2", "3", "4", "5", "6", "7"]), {
      error: "存在する学科を選択してください。",
    })
    .optional(),
});

// TypeScript でフォーム型を抽出
export type StudentQueryForm = z.infer<typeof validation>;
