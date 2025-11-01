import { Api } from "./Api";
import type { Auth } from "@shared/schemas/Auth";
import { ROUTES } from "@/domain/routes";

export const AuthApi = {
  login: () => Api<Auth[]>(ROUTES.Auth.LOGIN, { method: "POST" }),

  logout: () => Api<Auth[]>(ROUTES.Auth.LOGOUT, { method: "POST" }),
};
