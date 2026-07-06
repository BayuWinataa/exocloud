"use server";

import prisma from "@/lib/prisma";
import { getSession, deleteSession, createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function updateEmailAction(newEmail: string) {
  const session = await getSession();
  if (!session || !session.user) {
    return { error: "Tidak ada sesi yang valid." };
  }

  if (!newEmail || !newEmail.includes("@")) {
    return { error: "Format email tidak valid." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail }
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return { error: "Email ini sudah terdaftar pada akun lain." };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { email: newEmail }
    });

    // Update cookie session dengan email yang baru
    await createSession(session.user.id, newEmail);

    return { success: true };
  } catch (error) {
    console.error("Update email error:", error);
    return { error: "Terjadi kesalahan saat memperbarui email." };
  }
}

export async function updatePasswordAction(oldPassword: string, newPassword: string) {
  const session = await getSession();
  if (!session || !session.user) {
    return { error: "Tidak ada sesi yang valid." };
  }

  if (!oldPassword || !newPassword || newPassword.length < 6) {
    return { error: "Kata sandi baru minimal 6 karakter." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return { error: "Pengguna tidak ditemukan." };
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return { error: "Kata sandi lama yang Anda masukkan salah." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    // Logout otomatis dengan menghapus session
    await deleteSession();

    return { success: true };
  } catch (error) {
    console.error("Update password error:", error);
    return { error: "Terjadi kesalahan saat memperbarui kata sandi." };
  }
}
