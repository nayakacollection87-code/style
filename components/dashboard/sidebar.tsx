"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Sparkles,
  RefreshCcw,
  Coins,
  BookOpen,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/store";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  {
    icon: TrendingUp,
    label: "Trafik Service",
    href: "/dashboard/trafik",
    submenu: [
      { icon: ShoppingBag, label: "Shopee Service", href: "/dashboard/trafik/shopee" },
      { icon: Video, label: "TikTok Service", href: "/dashboard/trafik/tiktok" },
    ],
  },
  { icon: Sparkles, label: "Creator AI", href: "/dashboard/creator-ai" },
  { icon: RefreshCcw, label: "Reset Master", href: "/dashboard/reset-master" },
  { icon: Coins, label: "Top Up Koin", href: "/dashboard/topup" },
  { icon: BookOpen, label: "Materi Gratis", href: "/dashboard/materi" },
  { icon: Users, label: "Referral", href: "/dashboard/referral" },
];

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    // Auto expand submenu if current path matches
    menuItems.forEach((item) => {
      if (item.submenu?.some((sub) => pathname.startsWith(sub.href))) {
        setExpandedMenu(item.label);
      }
    });
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 lg:hidden glass"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">Nexvora</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 glass-card pt-20 flex flex-col">
              {/* User Info */}
              <div className="px-4 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{user?.name || "User"}</p>
                    <p className="text-sm text-muted-foreground">{user?.koin || 0} Koin</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full",
                            "hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground",
                            pathname.startsWith(item.href) && "text-foreground"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              expandedMenu === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedMenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden ml-4"
                            >
                              {item.submenu.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
                                    "hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground",
                                    pathname === sub.href && "bg-[#00D4FF]/10 text-foreground"
                                  )}
                                >
                                  <sub.icon className="w-4 h-4" />
                                  <span className="text-sm">{sub.label}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                          "hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground",
                          pathname === item.href && "bg-[#00D4FF]/10 text-foreground"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed left-0 top-0 bottom-0 w-64 glass hidden lg:flex flex-col z-50"
      >
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center neon-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl gradient-text">Nexvora</h1>
              <p className="text-xs text-muted-foreground">Studio</p>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-4 pb-4">
          <div className="glass-light rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{user?.name || "User"}</p>
                <p className="text-sm text-[#00D4FF]">{user?.koin || 0} Koin</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full",
                      "hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground group",
                      pathname.startsWith(item.href) && "text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 group-hover:text-[#00D4FF] transition-colors" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedMenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedMenu === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4"
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
                              "hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground",
                              pathname === sub.href && "bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 text-foreground border border-[#00D4FF]/30"
                            )}
                          >
                            <sub.icon className="w-4 h-4" />
                            <span className="text-sm">{sub.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                    "hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground group",
                    pathname === item.href && "bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 text-foreground border border-[#00D4FF]/30"
                  )}
                >
                  <item.icon className="w-5 h-5 group-hover:text-[#00D4FF] transition-colors" />
                  <span>{item.label}</span>
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </motion.aside>
    </>
  );
}
