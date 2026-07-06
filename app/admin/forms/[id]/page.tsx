import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FormBuilder from "@/components/admin/FormBuilder";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const formId = parseInt(resolvedParams.id);

  if (isNaN(formId)) {
    notFound();
  }

  const form = await prisma.form.findUnique({
    where: { id: formId },
    include: {
      fields: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!form) {
    notFound();
  }

  return (
    <div className="pb-20">
      <div className="mb-8">
        <Link
          href="/admin/forms"
          className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali ke Daftar Form
        </Link>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Edit Form: {form.title}</h1>
      </div>

      <FormBuilder initialData={form} />
    </div>
  );
}
