import { createContext, useState } from "react";
import type { IAuth } from "../interface/IAuth";
import type { IUser } from "../interface/IUser";
import authService from "../services/user.services";

const AuthContext = createContext<{
  user: IUser | null;
  login: (data: IAuth) => Promise<boolean>;
  logout: () => Promise<boolean>;
  session: () => Promise<boolean>;
}>({
  user: null,
  login: async () => false,
  logout: async () => false,
  session: async () => false,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (data: IAuth) => {
    const response = await authService.login(data);
    // console.log("response", response);

    if (response.status === 200) {
      //   const { data: userData } = response;
      //   setUser(userData);
      //   localStorage.setItem("access", userData.token);
      //   localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = async () => {
    await authService.logout().then((res) => {
      if (res.status === 200) return true;
    });

    return false;
  };

  const session = async () => {
    const response = await authService.session();
    if (response.status === 200) {
      const { data } = response;
      setUser(data);
      //   localStorage.setItem("access", data.token);
      //   localStorage.setItem("user", JSON.stringify(data));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
