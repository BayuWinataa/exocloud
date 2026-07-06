import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function FormResponsesPage({ params }: { params: Promise<{ id: string }> }) {
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
      },
      responses: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!form) {
    notFound();
  }

  return (
    <div className="pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/admin/forms"
            className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke Daftar Form
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Respons: {form.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500">
            <span className="flex items-center"><FileText className="w-4 h-4 mr-1" /> {form.responses.length} Respons</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Dibuat {new Date(form.createdAt).toLocaleDateString('id-ID')}</span>
          </div>
        </div>
        {form.responses.length > 0 ? (
          <a
            href={`/api/forms/${form.id}/export`}
            download
            className="inline-flex items-center justify-center px-4 py-2.5 bg-white border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </a>
        ) : (
          <button
            className="inline-flex items-center justify-center px-4 py-2.5 bg-white border border-neutral-200 text-neutral-700 font-medium rounded-xl opacity-50 cursor-not-allowed shadow-sm"
            disabled
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {form.responses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                <tr>
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">Waktu Submit</th>
                  {form.fields.map((field) => (
                    <th key={field.id} className="px-6 py-4">{field.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {form.responses.map((response, index) => {
                  const payload = response.payload as Record<string, string>;
                  return (
                    <tr key={response.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-6 py-4 text-neutral-500">{form.responses.length - index}</td>
                      <td className="px-6 py-4 text-neutral-500">
                        {new Date(response.createdAt).toLocaleString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      {form.fields.map((field) => (
                        <td key={field.id} className="px-6 py-4 text-neutral-900 truncate max-w-[200px]" title={payload[field.id.toString()] || "-"}>
                          {payload[field.id.toString()] || "-"}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 px-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <FileText className="w-8 h-8 text-neutral-300" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900">Belum ada respons</h3>
            <p className="text-neutral-500 mt-1 max-w-sm mx-auto">
              Form ini belum menerima jawaban. Bagikan tautan form kepada audiens Anda untuk mulai mengumpulkan data.
            </p>
            <Link
              href={`/form/${form.slug}`}
              target="_blank"
              className="mt-6 inline-flex items-center px-5 py-2.5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Lihat Halaman Publik
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
