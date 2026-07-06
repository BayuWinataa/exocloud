"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, AlertCircle, LayoutTemplate } from "lucide-react";
import { createFormAction, updateFormAction } from "@/app/admin/forms/actions";
import { useRouter } from "next/navigation";

type FieldType = "text" | "email" | "number" | "textarea" | "select" | "radio";

interface Field {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string;
}

interface FormBuilderProps {
  initialData?: {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    status: string;
    fields: {
      id: number;
      label: string;
      type: string;
      required: boolean;
      options: string | null;
    }[];
  };
}

export default function FormBuilder({ initialData }: FormBuilderProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formConfig, setFormConfig] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    status: initialData?.status || "published"
  });

  const [fields, setFields] = useState<Field[]>(
    initialData?.fields?.map(f => ({
      id: f.id.toString(),
      label: f.label,
      type: f.type as FieldType,
      required: f.required,
      options: f.options || ""
    })) || []
  );

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormConfig({
      ...formConfig,
      title,
      slug: generateSlug(title)
    });
  };

  const addField = () => {
    const newField: Field = {
      id: Math.random().toString(36).substring(2, 9),
      label: "Pertanyaan Baru",
      type: "text",
      required: false,
      options: ""
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleSave = async () => {
    setError("");
    if (!formConfig.title) return setError("Judul form tidak boleh kosong.");
    if (!formConfig.slug) return setError("Slug form tidak boleh kosong.");
    if (fields.length === 0) return setError("Tambahkan setidaknya satu field form.");

    // Validasi opsi untuk select/radio
    const invalidField = fields.find(f => (f.type === "select" || f.type === "radio") && !f.options.trim());
    if (invalidField) {
      return setError(`Field "${invalidField.label}" membutuhkan opsi pilihan (pisahkan dengan koma).`);
    }

    setIsSubmitting(true);
    let res;
    if (initialData?.id) {
      res = await updateFormAction(initialData.id, {
        ...formConfig,
        fields
      });
    } else {
      res = await createFormAction({
        ...formConfig,
        fields
      });
    }

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      router.push("/admin/forms");
    }
  };

  return (
    <div className="flex flex-col space-y-8 container mx-auto">
      {/* Pengaturan Utama Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Detail Form</h2>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Judul Form</label>
                <input
                  type="text"
                  value={formConfig.title}
                  onChange={handleTitleChange}
                  placeholder="Pendaftaran Beasiswa"
                  className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Slug URL</label>
                <div className="flex items-center">
                  <span className="bg-neutral-100 border border-r-0 border-neutral-200 text-neutral-500 rounded-l-xl px-3 py-2.5 text-sm">
                    exocloud.id/form/
                  </span>
                  <input
                    type="text"
                    value={formConfig.slug}
                    onChange={(e) => setFormConfig({ ...formConfig, slug: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-r-xl px-4 py-2.5 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Deskripsi </label>
              <textarea
                value={formConfig.description}
                onChange={(e) => setFormConfig({ ...formConfig, description: e.target.value })}
                rows={9}
                placeholder="Tuliskan deskripsi atau instruksi form..."
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
              <select
                value={formConfig.status}
                onChange={(e) => setFormConfig({ ...formConfig, status: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2.5 outline-none transition-all"
              >
                <option value="published">Aktif (Published)</option>
                <option value="draft">Draft (Sembunyikan)</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }}>
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 flex gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 bg-blue-600 text-white font-medium rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 shadow-sm shadow-blue-600/20"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? "Menyimpan..." : "Simpan Form"}
        </button>
      </div>

      {/* Editor Field */}
      <div className="space-y-4">
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-1/2 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Label Pertanyaan</label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 rounded-xl px-4 py-2 outline-none font-medium"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-neutral-700">Wajib Diisi</span>
                    </label>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Jenis Field</label>
                    <select
                      value={field.type}
                      onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                      className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 rounded-xl px-4 py-2 outline-none"
                    >
                      <option value="text">Jawaban Pendek (Text)</option>
                      <option value="textarea">Jawaban Panjang (Textarea)</option>
                      <option value="email">Email</option>
                      <option value="number">Angka (Number)</option>
                      <option value="select">Dropdown (Select)</option>
                      <option value="radio">Pilihan Ganda (Radio)</option>
                    </select>
                  </div>

                  <AnimatePresence>
                    {(field.type === "select" || field.type === "radio") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Opsi (Pisahkan dengan koma)</label>
                        <input
                          type="text"
                          value={field.options}
                          onChange={(e) => updateField(field.id, { options: e.target.value })}
                          placeholder="Contoh: Merah, Hijau, Biru"
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 rounded-xl px-4 py-2 outline-none text-sm"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => removeField(field.id)}
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors sm:mt-6"
                  title="Hapus Pertanyaan"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {fields.length === 0 && (
          <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-3xl p-12 text-center text-neutral-500">
            Mulai membangun form Anda dengan menambahkan field baru.
          </div>
        )}

        <button
          onClick={addField}
          className="w-full bg-white border border-neutral-200 text-neutral-700 font-medium rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-neutral-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Field Baru
        </button>
      </div>
    </div>
  );
}
