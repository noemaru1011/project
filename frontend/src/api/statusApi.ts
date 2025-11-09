import { Api } from "./Api";
import type { Status } from "@shared/schemas/status";
import { API_ROUTES } from "@/constants/apiRoutes";

export const StatusAPi = {
  index: () => Api<Status[]>(API_ROUTES.STATUS.INDEX, { method: "GET" }),
};
