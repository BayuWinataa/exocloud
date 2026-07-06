import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileSettings from "@/components/admin/ProfileSettings";
import { Settings } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="pb-20">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white shadow-sm">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Pengaturan</h1>
        </div>
      </div>

      <div className="mb-10">
        <ProfileSettings currentEmail={session.user.email} />
      </div>
    </div>
  );
}
