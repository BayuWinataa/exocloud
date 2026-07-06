import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const formId = parseInt(resolvedParams.id);

  if (isNaN(formId)) {
    return new NextResponse("Invalid Form ID", { status: 400 });
  }

  const form = await prisma.form.findUnique({
    where: { id: formId },
    include: {
      fields: { orderBy: { order: "asc" } },
      responses: { orderBy: { createdAt: "asc" } }
    }
  });

  if (!form) {
    return new NextResponse("Form Not Found", { status: 404 });
  }

  // Generate CSV Header
  const headers = ["No", "Waktu Submit", ...form.fields.map(f => f.label)];

  // Generate CSV Rows
  const rows = form.responses.map((response, index) => {
    const payload = response.payload as Record<string, any>;
    const row = [
      (index + 1).toString(),
      new Date(response.createdAt).toLocaleString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }),
      ...form.fields.map(field => {
        let val = payload[field.id.toString()] || "";
        if (typeof val === 'string') {
          val = val.replace(/"/g, '""');
          if (val.includes(';') || val.includes('\n') || val.includes('"')) {
            val = `"${val}"`;
          }
        }
        return val;
      })
    ];
    return row.join(";");
  });

  const csvContent = [
    // Add BOM for Excel UTF-8 support
    '\uFEFF' + headers.join(";"),
    ...rows
  ].join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${form.slug}-responses.csv"`,
    },
  });
}
