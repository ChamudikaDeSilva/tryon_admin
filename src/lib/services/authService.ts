import { authAPI } from "../api/auth";
import { LoginInput } from "../validation/loginSchema";

export const authService = {
  login: async (credentials: LoginInput) => {
    const data = await authAPI.login(credentials);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};
