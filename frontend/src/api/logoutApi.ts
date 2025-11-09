import { Api } from "./Api";
import { API_ROUTES } from "@/constants/apiRoutes";

export const AuthApi = {
  logout: () =>
    Api<void>(API_ROUTES.AUTH.LOGOUT, {
      method: "POST",
      credentials: "include",
    }),
};
