"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  LogIn,
  Sparkles,
  Award,
  MessageSquare,
  CreditCard,
  Users,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#hero" },
  { icon: UserPlus, label: "Daftar", href: "/register" },
  { icon: LogIn, label: "Login", href: "/login" },
  { icon: Sparkles, label: "Fitur", href: "#fitur" },
  { icon: Award, label: "Keunggulan", href: "#keunggulan" },
  { icon: MessageSquare, label: "Testimoni", href: "#testimoni" },
  { icon: CreditCard, label: "Harga", href: "#harga" },
  { icon: Users, label: "Tentang Kami", href: "#tentang" },
];

export function LandingSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300",
          isScrolled ? "glass" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 glass-card pt-20 px-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.href.startsWith("/") ? (
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
                    ) : (
                      <button
                        onClick={() => handleClick(item.href)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground w-full"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>
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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center neon-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl gradient-text">Nexvora</h1>
              <p className="text-xs text-muted-foreground">Studio</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 5 }}
            >
              {item.href.startsWith("/") ? (
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
              ) : (
                <button
                  onClick={() => handleClick(item.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-[#00D4FF]/10 text-muted-foreground hover:text-foreground group w-full"
                >
                  <item.icon className="w-5 h-5 group-hover:text-[#00D4FF] transition-colors" />
                  <span>{item.label}</span>
                </button>
              )}
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="glass-light rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-2">Mulai sekarang</p>
            <Link href="/register">
              <Button variant="glow" className="w-full" size="sm">
                Daftar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
