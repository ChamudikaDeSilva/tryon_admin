"use client";

import { useState, useEffect } from "react";
import { authService } from "@/lib/services/authService";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = authService.getToken();
    setToken(storedToken);
    setLoading(false);
  }, []);

  const login = async (data: { email: string; password: string }) => {
  try {
    setLoading(true);
    const response = await authService.login(data);

    // Check for token instead of 'success'
    if (response.token) {
        setToken(authService.getToken());
        setError(null);
        
        router.push("/dashboard")
    } else {
        setError("Invalid credentials");
    }

    return response;
  } catch (err: any) {
    setError(err.message);
    return { success: false, error: err };
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    authService.logout();
    setToken(null);
  };

  return { token, login, logout, loading, error };
}
