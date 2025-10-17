"use client";

import { AuthContext } from "@/app/context/AuthContext";
import { useContext } from "react";


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
