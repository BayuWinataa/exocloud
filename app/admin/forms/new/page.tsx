import FormBuilder from "@/components/admin/FormBuilder";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewFormPage() {
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
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Buat Form Baru</h1>
      </div>

      <FormBuilder />
    </div>
  );
}
