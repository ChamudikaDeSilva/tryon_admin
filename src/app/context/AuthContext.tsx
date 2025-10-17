"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = authService.getUser();
    const storedToken = authService.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const data = await authService.login(credentials);

      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        setError(null);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
