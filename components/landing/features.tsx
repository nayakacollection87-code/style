"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  RefreshCcw,
  Users,
  Coins,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: TrendingUp,
    title: "Trafik Service",
    description: "Tingkatkan view dan engagement video marketplace Anda dengan layanan trafik terintegrasi untuk Shopee dan TikTok.",
    color: "from-[#00D4FF] to-[#0EA5E9]",
  },
  {
    icon: Sparkles,
    title: "Creator AI",
    description: "Buat konten visual menakjubkan dengan AI. Text to Image, Image to Video, dan banyak lagi.",
    color: "from-[#A855F7] to-[#7C3AED]",
  },
  {
    icon: RefreshCcw,
    title: "Reset Master",
    description: "Pantau tren produk terkini dari Shopee, TikTok, dan marketplace lainnya secara realtime.",
    color: "from-[#EC4899] to-[#DB2777]",
  },
  {
    icon: Users,
    title: "Referral System",
    description: "Dapatkan bonus koin otomatis setiap kali referral Anda melakukan topup. Sistem transparan dan adil.",
    color: "from-[#F59E0B] to-[#D97706]",
  },
  {
    icon: Coins,
    title: "Top Up Koin",
    description: "Isi saldo koin dengan mudah dan gunakan untuk semua layanan di platform Nexvora Studio.",
    color: "from-[#10B981] to-[#059669]",
  },
  {
    icon: BookOpen,
    title: "Materi Gratis",
    description: "Akses berbagai materi pembelajaran gratis untuk mengembangkan bisnis digital Anda.",
    color: "from-[#6366F1] to-[#4F46E5]",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-light text-sm text-[#00D4FF] mb-4">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Semua yang Anda </span>
            <span className="gradient-text">Butuhkan</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platform lengkap dengan fitur-fitur canggih untuk memaksimalkan potensi bisnis digital Anda
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:border-[#00D4FF]/30 transition-all duration-500">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#00D4FF] transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
