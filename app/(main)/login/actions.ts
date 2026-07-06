"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Kredensial tidak valid." };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Kredensial tidak valid." };
    }

    // Buat session
    await createSession(user.id, user.email);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Terjadi kesalahan internal. Silakan coba lagi." };
  }

  // Redirect harus dipanggil di luar blok try-catch agar Next.js tidak menangkap throw error redirect-nya
  redirect("/admin");
}
