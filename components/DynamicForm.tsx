"use client";

import { useState } from "react";
import { submitFormAction } from "@/app/(main)/form/[slug]/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

type FieldType = "text" | "email" | "number" | "textarea" | "select" | "radio";

interface FormField {
  id: number;
  label: string;
  type: string;
  required: boolean;
  options: string | null;
}

interface DynamicFormProps {
  formId: number;
  slug: string;
  fields: FormField[];
}

export default function DynamicForm({ formId, slug, fields }: DynamicFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (fieldId: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId.toString()]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi basic untuk required fields (meskipun HTML5 required sudah jalan, kita periksa ulang)
    for (const field of fields) {
      if (field.required && !formData[field.id.toString()]) {
        setError(`Pertanyaan "${field.label}" wajib diisi.`);
        return;
      }
    }

    setIsSubmitting(true);

    const res = await submitFormAction(formId, slug, formData);

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      router.push(`/form/${slug}/success`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-start gap-3 border border-red-200"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <div className="space-y-6">
        {fields.map((field, index) => {
          const fieldIdStr = field.id.toString();
          const optionsArray = field.options ? field.options.split(",").map(o => o.trim()) : [];

          return (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm"
            >
              <label className="block text-neutral-900 font-semibold mb-3">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "text" || field.type === "email" || field.type === "number" ? (
                <input
                  type={field.type}
                  required={field.required}
                  value={formData[fieldIdStr] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder="Jawaban Anda..."
                  className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none transition-all"
                />
              ) : field.type === "textarea" ? (
                <textarea
                  required={field.required}
                  value={formData[fieldIdStr] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder="Jawaban Anda..."
                  rows={4}
                  className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none transition-all resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  required={field.required}
                  value={formData[fieldIdStr] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none transition-all"
                >
                  <option value="" disabled>Pilih opsi...</option>
                  {optionsArray.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === "radio" ? (
                <div className="space-y-3">
                  {optionsArray.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name={`field_${field.id}`}
                        value={opt}
                        required={field.required}
                        checked={formData[fieldIdStr] === opt}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-4 h-4 text-blue-600 border-neutral-300 focus:ring-blue-500"
                      />
                      <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#FFD700] text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-[#FFD709] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg  transition-all mt-8"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Mengirimkan...
          </>
        ) : (
          <>
            Kirim Respons
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </form>
  );
}
