import { createContext, useEffect, useState } from "react";
import type { IAuth } from "../interface/IAuth";
import type { IUser } from "../interface/IUser";
import authService from "../services/user.services";
import logService from "../services/config/logServices";
import useSnackbar from "../hooks/useSnackbar";

const AuthContext = createContext<{
  user: IUser | null;
  login: (data: IAuth) => Promise<boolean>;
  logout: () => Promise<boolean>;
}>({
  user: null,
  login: async () => false,
  logout: async () => false,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const { showMessage } = useSnackbar();

  const login = async (data: IAuth) => {
    try {
      const response = await authService.login(data);

      if (response.status !== 200) return false;

      await session();

      return true;
    } catch (err) {
      logService.error("Error in login", err);
      showMessage("Fallo al ingresar, verifique sus credenciales.", "error");
      return false;
    }
  };

  const logout = async () => {
    const res = await authService.logout();
    if (res.status === 200) {
      setUser(null);
      //   localStorage.removeItem("access");
      //   localStorage.removeItem("user");
      return true;
    }

    return false;
  };

  const session = async () => {
    await authService.session().then((res) => {
      if (res.status === 200) {
        const { data: userData } = res;
        setUser(userData);
      }
    });
  };

  useEffect(() => {
    session();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
