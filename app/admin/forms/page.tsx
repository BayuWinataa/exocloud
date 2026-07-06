import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, MoreVertical, Edit2, Trash2, Eye, Link as LinkIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminFormsPage() {
  const forms = await prisma.form.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { responses: true }
      }
    }
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Daftar Form</h1>
        </div>
        <Link
          href="/admin/forms/new"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Form Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4">Nama Form</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Respons</th>
                <th className="px-6 py-4">Dibuat Pada</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {forms.map((form) => (
                <tr key={form.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-900">{form.title}</span>
                      <span className="text-neutral-500 text-xs mt-0.5">/{form.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${form.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-neutral-100 text-neutral-700'
                      }`}>
                      {form.status === 'published' ? 'Aktif' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {form._count.responses} respons
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {new Date(form.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/form/${form.slug}`}
                        target="_blank"
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/forms/${form.id}/responses`}
                        className="p-2 text-neutral-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Lihat Respons"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/forms/${form.id}`}
                        className="p-2 text-neutral-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit Form"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Form"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {forms.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    Belum ada form yang dibuat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
