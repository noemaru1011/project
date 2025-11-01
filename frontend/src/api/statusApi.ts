import { Api } from "./Api";
import type { Status } from "@shared/schemas/Status";
import { ROUTES } from "@/domain/routes";

export const StatusAPi = {
  index: () => Api<Status[]>(ROUTES.Status.INDEX, { method: "GET" }),
};
