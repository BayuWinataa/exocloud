import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import DynamicForm from "@/components/DynamicForm";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const form = await prisma.form.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!form || form.status !== "published") {
    return { title: "Form Tidak Ditemukan" };
  }

  return {
    title: `${form.title} - Exocloud`,
    description: form.description,
  };
}

export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const form = await prisma.form.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      fields: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!form || form.status !== "published") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">{form.title}</h1>
          {form.description && (
            <p className="text-neutral-500 mt-3 leading-relaxed whitespace-pre-wrap">{form.description}</p>
          )}
        </div>

        <DynamicForm formId={form.id} slug={form.slug} fields={form.fields} />
      </div>
    </div>
  );
}
