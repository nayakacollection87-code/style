"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Coins,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCog,
  History,
  Video,
  Menu,
  X,
  TrendingUp,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

const superAdminMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Kelola User",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Kelola Koin",
    icon: Coins,
    href: "/admin/coins",
  },
  {
    title: "Order Trafik",
    icon: TrendingUp,
    href: "/admin/orders",
  },
  {
    title: "Top Up",
    icon: Package,
    href: "/admin/topup",
  },
  {
    title: "Materi",
    icon: Video,
    href: "/admin/materi",
  },
  {
    title: "Referral",
    icon: Users,
    href: "/admin/referral",
  },
  {
    title: "Log Aktivitas",
    icon: History,
    href: "/admin/logs",
  },
  {
    title: "Kelola Admin",
    icon: UserCog,
    href: "/admin/manage-admin",
  },
  {
    title: "Pengaturan",
    icon: Settings,
    href: "/admin/settings",
  },
];

const assistantAdminMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Lihat User",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Order Trafik",
    icon: TrendingUp,
    href: "/admin/orders",
  },
  {
    title: "Materi",
    icon: Video,
    href: "/admin/materi",
  },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, adminLogout } = useStore();

  const menuItems = adminUser?.role === "super_admin" ? superAdminMenu : assistantAdminMenu;

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex hover:bg-white/10"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* User Info */}
      <div className={cn(
        "p-4 border-b border-white/10",
        collapsed && "flex justify-center"
      )}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="w-10 h-10 border-2 border-red-500">
            <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500">
              {adminUser?.username?.charAt(0).toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{adminUser?.username || "Admin"}</p>
              <p className="text-xs text-gray-400 truncate capitalize">
                {adminUser?.role === "super_admin" ? "Super Admin" : "Assistant Admin"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <motion.div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-red-400" : "group-hover:text-red-400"
                    )}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.title}</span>
                  )}
                  {isActive && !collapsed && (
                    <motion.div
                      layoutId="admin-active-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-red-400"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className={cn(
            "w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10",
            collapsed ? "justify-center" : "justify-start"
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-dark-card/80 backdrop-blur-sm border border-white/10"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-dark-card/95 backdrop-blur-xl border-r border-white/10 z-50 lg:hidden flex flex-col"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-dark-card/80 backdrop-blur-xl border-r border-white/10 z-30"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
}
