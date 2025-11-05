import { Api } from "./Api";
import type { Student, StudentQuery } from "@shared/schemas/Student";
import { ROUTES } from "@/domain/routes";

export const StudentApi = {
  index: () => Api<Student[]>(ROUTES.Student.INDEX, { method: "GET" }),

  create: (data: Partial<Student>) =>
    Api<Student>(ROUTES.Student.CREATE, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Student>) =>
    Api<Student>(ROUTES.Student.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    Api<void>(ROUTES.Student.DELETE(id), {
      method: "POST",
    }),

  view: (id: string) =>
    Api<Student>(ROUTES.Student.VIEW(id), { method: "GET" }),
};
