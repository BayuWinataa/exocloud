import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function SuccessPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const form = await prisma.form.findUnique({
    where: { slug: resolvedParams.slug },
    select: { title: true }
  });

  return (
    <div className="py-20 px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-200 max-w-lg w-full text-center mx-auto">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">Terima Kasih!</h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          Pendaftaran untuk  <span className="font-semibold text-neutral-700">&quot;{form?.title || 'ini'}&quot;</span> telah berhasil dikirimkan dan direkam oleh sistem kami.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white font-medium rounded-xl py-3.5 px-6 hover:bg-neutral-800 transition-colors w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
