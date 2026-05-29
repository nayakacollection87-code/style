"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Users, Zap, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "10K+", label: "Pengguna Aktif" },
  { icon: TrendingUp, value: "50M+", label: "Total View" },
  { icon: Zap, value: "99%", label: "Uptime" },
  { icon: Coins, value: "1M+", label: "Koin Terdistribusi" },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full filter blur-[128px] opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7] rounded-full filter blur-[128px] opacity-20 animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#EC4899] rounded-full filter blur-[128px] opacity-10 animate-float" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground">Platform Digital All-in-One</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-foreground">Welcome to </span>
            <span className="gradient-text">Nexvora Studio</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Nexvora Studio adalah platform digital all-in-one untuk meningkatkan trafik marketplace, 
            mengelola tren produk, memanfaatkan AI Creator, dan mengembangkan bisnis digital secara 
            lebih cepat, cerdas, dan efisien.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/register">
              <Button variant="glow" size="xl" className="group">
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Login
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-[#00D4FF]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass-card rounded-3xl p-2 neon-glow max-w-5xl mx-auto">
              <div className="rounded-2xl overflow-hidden bg-card">
                <div className="p-4 border-b border-border/50 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground ml-4">dashboard.nexvora.studio</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-card to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center mx-auto mb-4 neon-glow">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-muted-foreground">Preview Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
