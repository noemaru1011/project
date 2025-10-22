import { ClientApi } from "./ClientApi";
import type { Customer } from "@shared/schemas/Customer";

export const CustomerApi = {
  create: (data: Customer) =>
    ClientApi("/Mst001/Create", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () => ClientApi<Customer[]>("/Mst001/List"),
};
