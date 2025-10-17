import api from "./axios";
import { LoginInput } from "../validation/loginSchema";

export const authAPI = {
  login: async (credentials: LoginInput) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },
};
