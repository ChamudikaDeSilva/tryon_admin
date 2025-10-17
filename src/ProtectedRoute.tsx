"use client";


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token && !loading) {
      router.push("/");
    }
  }, [token, router, loading]);

  if (!token) return null; // or a spinner

  return <>{children}</>;
};
