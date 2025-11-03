import { Api } from "./Api";
import type { Auth } from "@shared/schemas/Auth";
import { ROUTES } from "@/domain/routes";

export const AuthApi = {
  login: (data: Partial<Auth>) =>
    Api<Auth>(ROUTES.Auth.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
