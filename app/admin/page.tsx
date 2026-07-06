import prisma from "@/lib/prisma";
import { FileText, Inbox, BarChart3, TrendingUp } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const totalForms = await prisma.form.count();
  const totalResponses = await prisma.formResponse.count();
  const activeForms = await prisma.form.count({ where: { status: "published" } });

  const recentActivity = await prisma.formResponse.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { form: true },
  });

  const stats = [
    {
      name: "Total Forms",
      value: totalForms,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Active Forms",
      value: activeForms,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Total Responses",
      value: totalResponses,
      icon: Inbox,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">{stat.name}</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Aktivitas Terkini</h2>
        </div>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4 flex items-start gap-4 hover:bg-neutral-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                  <Inbox className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-900 leading-snug">
                    Respons baru masuk untuk form <span className="font-semibold">"{activity.form.title}"</span>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1.5">
                    {new Date(activity.createdAt).toLocaleString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-neutral-900 font-medium">Belum ada aktivitas</h3>
            <p className="text-neutral-500 text-sm mt-1">Respons dari user akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
