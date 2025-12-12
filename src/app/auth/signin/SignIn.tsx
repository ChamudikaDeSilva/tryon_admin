"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/validation/loginSchema";
import { Eye, Lock } from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 p-6">
      
      {/* --- ATTRACTIVE BACKGROUND ELEMENTS (Retained) --- */}
      
      {/* 1. Subtle Dotted Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* 2. Animated Blobs */}
      <motion.div
        initial={{ y: 20, opacity: 0.5 }}
        animate={{ y: -20, opacity: 0.7 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-1/4 left-1/4 h-60 w-60 rounded-full bg-red-600/20 blur-[100px]"
      />
      <motion.div
        initial={{ y: -20, opacity: 0.5 }}
        animate={{ y: 20, opacity: 0.7 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-slate-800/50 blur-[120px]"
      />
      
      {/* --- SIGN IN CARD: GLASSMORHISM (Z-INDEX 10) --- */}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // New Glassmorphism Styling: 
        // 1. Highly transparent background (bg-white/5)
        // 2. High blur (backdrop-blur-3xl)
        // 3. Subtle border (border-white/20)
        // 4. Subtle shadow for definition
        className="z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/5 p-8 shadow-xl backdrop-blur-3xl"
      >
        
        {/* Internal Gradient Overlay for Glass Shine Effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" 
            style={{
              background: 'radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
        />

        {/* Content remains the same for clarity and readability */}
        <div className="relative z-20 mb-8 flex flex-col items-center">
          {/* <Eye className="mb-4 h-12 w-12 text-red-600" />  */}
          <h2 className="text-center text-3xl font-bold text-white">
            Welcome to <span className="text-red-600">Gillian ERP</span>
          </h2>
          <p className="text-sm text-white/60 mt-2">Sign in to manage your optical inventory.</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-20 space-y-6">
          {(validationError || error) && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="rounded-lg border border-red-700 bg-red-900/40 p-3 text-sm text-red-400"
            >
              {validationError || error}
            </motion.p>
          )}

          {/* Email Input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/80">
              Email Address
            </label>
            <div className="relative">
              {/* Input field background is now darker to contrast the glass card */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sales@glamora.com"
                className="w-full rounded-lg border border-white/20 bg-black/50 py-3 pl-12 pr-4 text-white placeholder-white/50 outline-none transition-colors duration-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-base"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white/80">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/20 bg-black/50 py-3 pl-12 pr-4 text-white placeholder-white/50 outline-none transition-colors duration-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-base"
              />
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01, backgroundColor: "#c52828" }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full rounded-lg bg-red-600 px-5 py-3.5 text-lg font-semibold text-white shadow-lg shadow-red-600/40 transition-all disabled:opacity-50 mt-8"
          >
            {loading ? "AUTHENTICATING..." : "Sign In to ERP"}
          </motion.button>
        </form>
        
        <p className="relative z-20 mt-8 text-center text-sm text-white/50">
          Trouble logging in? <a href="#" className="font-medium text-red-600 hover:text-red-500 transition-colors">Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;