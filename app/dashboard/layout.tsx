"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (isAdmin) {
      router.push("/admin");
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <DashboardSidebar />
      <main className="lg:ml-64 pt-20 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
