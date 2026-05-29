"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { useStore } from "@/lib/store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminUser, isAdminAuthenticated } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark">
      <AdminSidebar />
      <main className="lg:pl-[280px] min-h-screen">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
