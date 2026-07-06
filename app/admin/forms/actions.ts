"use server";

import prisma from "@/lib/prisma";

export async function createFormAction(payload: any) {
  const { title, slug, description, status, fields } = payload;
  
  if (!title || !slug) {
    return { error: "Judul dan Slug wajib diisi." };
  }

  try {
    const existingForm = await prisma.form.findUnique({
      where: { slug }
    });

    if (existingForm) {
      return { error: "Slug sudah digunakan, silakan pilih slug lain." };
    }

    const form = await prisma.form.create({
      data: {
        title,
        slug,
        description,
        status,
        fields: {
          create: fields.map((field: any, index: number) => ({
            label: field.label,
            type: field.type,
            required: field.required,
            options: field.options || null,
            order: index
          }))
        }
      }
    });

    return { success: true, formId: form.id };
  } catch (error) {
    console.error("Create form error:", error);
    return { error: "Gagal menyimpan form. Silakan coba lagi." };
  }
}

export async function updateFormAction(id: number, payload: any) {
  const { title, slug, description, status, fields } = payload;
  
  if (!title || !slug) {
    return { error: "Judul dan Slug wajib diisi." };
  }

  try {
    const existingForm = await prisma.form.findUnique({
      where: { id },
      include: { fields: true }
    });

    if (!existingForm) return { error: "Form tidak ditemukan." };

    const slugCheck = await prisma.form.findUnique({
      where: { slug }
    });

    if (slugCheck && slugCheck.id !== id) {
      return { error: "Slug sudah digunakan, silakan pilih slug lain." };
    }

    const incomingFieldIds = fields.map((f: any) => parseInt(f.id)).filter((fId: number) => !isNaN(fId));
    const fieldsToDelete = existingForm.fields.filter(f => !incomingFieldIds.includes(f.id));

    await prisma.$transaction(async (tx) => {
      // 1. Delete removed fields
      if (fieldsToDelete.length > 0) {
        await tx.formField.deleteMany({
          where: { id: { in: fieldsToDelete.map(f => f.id) } }
        });
      }

      // 2. Upsert existing/new fields
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const fieldId = parseInt(field.id);
        
        if (!isNaN(fieldId)) {
          // Update existing
          await tx.formField.update({
            where: { id: fieldId },
            data: {
              label: field.label,
              type: field.type,
              required: field.required,
              options: field.options || null,
              order: i
            }
          });
        } else {
          // Create new
          await tx.formField.create({
            data: {
              formId: id,
              label: field.label,
              type: field.type,
              required: field.required,
              options: field.options || null,
              order: i
            }
          });
        }
      }

      // 3. Update form metadata
      await tx.form.update({
        where: { id },
        data: { title, slug, description, status }
      });
    });

    return { success: true, formId: id };
  } catch (error) {
    console.error("Update form error:", error);
    return { error: "Gagal memperbarui form. Silakan coba lagi." };
  }
}
