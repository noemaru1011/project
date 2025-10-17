import { z } from "zod";

export const createCustomerSchema = z.object({
  customername: z.string().min(1, "得意先名は必須です"),
  customertel: z.string().optional(),
  customerrepemail: z.string().email("代表メールの形式が不正です").optional(),
  customeraccuntemail: z
    .string()
    .email("経理メールの形式が不正です")
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
