"use server";

import prisma from "@/lib/prisma";

export async function submitFormAction(formId: number, slug: string, payload: Record<string, string>) {
  try {
    const form = await prisma.form.findUnique({
      where: { id: formId }
    });

    if (!form || form.status !== "published") {
      return { error: "Form tidak aktif atau tidak ditemukan." };
    }

    await prisma.formResponse.create({
      data: {
        formId,
        payload
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Submit form error:", error);
    return { error: "Gagal mengirimkan respons form. Silakan coba lagi nanti." };
  }
}
