import type { IAuth } from "../interface/IAuth";
import services from "./config/services";

const login = (data: IAuth) => {
  const url = "/Athenticate/login";
  return services.post(url, data, {
    withCredentials: true,
  });
};

const logout = () => {
  const url = "/Athenticate/logout";
  return services.post(
    url,
    {},
    {
      withCredentials: true,
    }
  );
};

const session = () => {
  const url = "/Athenticate/session";
  return services.get(url, {
    withCredentials: true,
  });
};

const authService = {
  login,
  logout,
  session,
};

export default authService;
