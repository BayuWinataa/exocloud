"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[#FFFAF3] flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl border border-[#e8dfce] rounded-3xl p-8 shadow-xl shadow-[#10316B]/5"
        >
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#10316B]">Admin Portal</h1>
          </div>

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#10316B] ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@exocloud.id"
                  className="w-full bg-[#FFFAF3] border border-[#e8dfce] focus:border-[#10316B] focus:ring-1 focus:ring-[#10316B] rounded-xl py-3 pl-10 pr-4 text-neutral-900 placeholder-neutral-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#10316B] ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#FFFAF3] border border-[#e8dfce] focus:border-[#10316B] focus:ring-1 focus:ring-[#10316B] rounded-xl py-3 pl-10 pr-4 text-neutral-900 placeholder-neutral-400 outline-none transition-all"
                />
              </div>
            </div>

            {state?.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3 text-center font-medium"
              >
                {state.error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#10316B] text-[#FFFAF3] font-bold rounded-xl py-3.5 flex items-center justify-center space-x-2 hover:bg-[#10316B]/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group mt-6 shadow-md shadow-[#10316B]/20"
            >
              <span>{isPending ? "Memverifikasi..." : "Sign In"}</span>
              {!isPending && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
