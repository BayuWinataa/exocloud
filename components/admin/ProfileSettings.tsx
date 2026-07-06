"use client";

import { useState } from "react";
import { updateEmailAction, updatePasswordAction } from "@/app/admin/settings/actions";
import { User, Lock, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileSettings({ currentEmail }: { currentEmail: string }) {
  const router = useRouter();

  // Email State
  const [email, setEmail] = useState(currentEmail);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [emailMessage, setEmailMessage] = useState({ type: "", text: "" });

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage({ type: "", text: "" });
    if (email === currentEmail) return;

    setIsEmailSubmitting(true);
    const res = await updateEmailAction(email);
    setIsEmailSubmitting(false);

    if (res.error) {
      setEmailMessage({ type: "error", text: res.error });
    } else {
      setEmailMessage({ type: "success", text: "Email berhasil diperbarui." });
      router.refresh();
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      return setPasswordMessage({ type: "error", text: "Konfirmasi kata sandi tidak cocok." });
    }

    setIsPasswordSubmitting(true);
    const res = await updatePasswordAction(oldPassword, newPassword);

    if (res.error) {
      setPasswordMessage({ type: "error", text: res.error });
      setIsPasswordSubmitting(false);
    } else {
      setPasswordMessage({ type: "success", text: "Kata sandi berhasil diubah. Mengalihkan ke halaman login..." });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Update Email Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-neutral-200 flex items-center gap-3 bg-neutral-50/50">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Ubah Email</h2>
          </div>
        </div>

        <form onSubmit={handleUpdateEmail} className="p-6 flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email Saat Ini</label>
              <input
                type="email"
                disabled
                value={currentEmail}
                className="w-full bg-neutral-100 border border-neutral-200 text-neutral-500 rounded-xl px-4 py-2.5 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email Baru</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email baru"
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
              />
            </div>
          </div>

          <AnimatePresence>
            {emailMessage.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-sm ${emailMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}
              >
                {emailMessage.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                <p>{emailMessage.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isEmailSubmitting || email === currentEmail}
            className="mt-6 w-full bg-neutral-900 text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEmailSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Simpan Email
          </button>
        </form>
      </div>

      {/* Update Password Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-neutral-200 flex items-center gap-3 bg-neutral-50/50">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Ubah Kata Sandi</h2>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="p-6 flex-1 flex flex-col">
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Kata Sandi Lama</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Kata Sandi Baru</label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Konfirmasi Kata Sandi Baru</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
              />
            </div>
          </div>

          <AnimatePresence>
            {passwordMessage.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-sm ${passwordMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}
              >
                {passwordMessage.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                <p>{passwordMessage.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isPasswordSubmitting || !oldPassword || !newPassword || !confirmPassword}
            className="mt-6 w-full bg-neutral-900 text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPasswordSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Perbarui Kata Sandi
          </button>
        </form>
      </div>
    </div>
  );
}
