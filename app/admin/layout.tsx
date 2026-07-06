"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, LogOut, Settings, Menu, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { logoutAction } from "./actions";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Forms", href: "/admin/forms", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-neutral-900/50 z-20 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-[#10316B] text-white shadow-2xl lg:shadow-none w-[260px] transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center justify-center w-full ">
            <div className="relative block h-[120px] w-[280px]">
              <Image src="/logo-exocloud.webp" alt="Exocloud Admin" fill className="object-contain" priority sizes="130px" />
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-xl transition-all relative group ${isActive ? "text-[#10316B] font-bold" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10 font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button className="flex items-center w-full px-3 py-2.5 rounded-xl text-white  bg-red-600 transition-colors text-sm font-medium hover:bg-red-700 ">
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-neutral-200 z-10 lg:hidden">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
