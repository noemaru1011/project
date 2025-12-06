import { z } from 'zod';
import { studentBaseSchema } from '@shared/schemas/student.base';

export const studentInputSchema = studentBaseSchema.extend({
  grade: z
    .preprocess((v) => (v === undefined || v === null ? '' : v), z.string())
    .transform(Number)
    .pipe(studentBaseSchema.shape.grade),
  minorCategoryId: z.string().transform(Number).pipe(studentBaseSchema.shape.minorCategoryId),
  departmentId: z.string().transform(Number).pipe(studentBaseSchema.shape.departmentId),
});

export type StudentInput = z.infer<typeof studentInputSchema>;
