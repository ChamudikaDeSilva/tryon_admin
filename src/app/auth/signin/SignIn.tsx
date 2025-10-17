"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/validation/loginSchema";

const SignIn: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message;
      setValidationError(firstError);
      return;
    }


    setValidationError("");
    await login(parsed.data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl"
      >
        <h2 className="mb-10 text-center text-4xl font-extrabold text-white">
          Welcome to <span className="text-red-600">Glamora</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {(validationError || error) && (
            <p className="text-red-500">{validationError || error}</p>
          )}

          <div>
            <label className="mb-2 block text-base font-medium text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-white/30 bg-black/40 px-5 py-4 text-lg text-white placeholder-white/70 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-base font-medium text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-white/30 bg-black/40 px-5 py-4 text-lg text-white placeholder-white/70 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full rounded-lg bg-red-600 px-5 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-red-700 disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignIn;
