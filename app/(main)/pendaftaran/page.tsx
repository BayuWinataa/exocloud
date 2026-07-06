import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, FileText, Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Pendaftaran - Exocloud",
  description: "Pilih dan daftar program, beasiswa, atau kegiatan terbaru dari Exocloud.",
};

export const dynamic = 'force-dynamic';

export default async function PendaftaranPage() {
  const publishedForms = await prisma.form.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">Portal Pendaftaran</h1>
          <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto">
            Temukan berbagai program pengembangan diri, beasiswa, dan volunteer dari Exocloud. Pilih program yang sesuai dengan Anda dan daftarkan diri sekarang.
          </p>
        </div>

        {publishedForms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedForms.map((form) => (
              <div key={form.id} className="bg-white rounded-3xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 p-8 flex flex-col h-full group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6  transition-colors duration-300">
                  <FileText className="w-7 h-7" />
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 mb-3 line-clamp-2 leading-tight  transition-colors">
                  {form.title}
                </h2>

                <p className="text-neutral-500 text-sm mb-6 flex-1 leading-relaxed line-clamp-2">
                  {form.description || "Detail program pendaftaran ini dapat dilihat langsung pada halaman pengisian form."}
                </p>

                <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>Dibuka: {new Date(form.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <Link
                  href={`/form/${form.slug}`}
                  className="inline-flex items-center justify-center w-full bg-[#FACC15] text-white font-bold rounded-2xl py-3.5 px-4 transition-all gap-2"
                >
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 md:p-16 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-neutral-300" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">Belum Ada Program Terbuka</h3>
            <p className="text-neutral-500 text-lg">
              Saat ini belum ada program pendaftaran yang aktif. Silakan kembali lagi nanti atau ikuti media sosial kami untuk pembaruan terbaru.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
