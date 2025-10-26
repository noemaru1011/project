import { Api } from "./Api";
import type { Customer } from "@shared/schemas/Customer";

export const CustomerApi = {
  create: (data: Customer) =>
    Api("/Mst001/Create", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () => Api<Customer[]>("/Mst001/List"),
};
