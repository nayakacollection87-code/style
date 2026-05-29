"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Monitor,
  Bot,
  TrendingUp,
  GitBranch,
  BarChart3,
} from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Proses Cepat",
    description: "Layanan diproses secara otomatis dan cepat dengan teknologi terdepan.",
  },
  {
    icon: Monitor,
    title: "Dashboard Modern",
    description: "Interface yang intuitif dan mudah digunakan dengan desain modern.",
  },
  {
    icon: Bot,
    title: "AI Creator Terintegrasi",
    description: "Fitur AI canggih untuk membuat konten visual berkualitas tinggi.",
  },
  {
    icon: TrendingUp,
    title: "Trafik Marketplace",
    description: "Tingkatkan visibilitas produk dengan layanan trafik terverifikasi.",
  },
  {
    icon: GitBranch,
    title: "Sistem Referral Otomatis",
    description: "Dapatkan komisi otomatis dari setiap referral yang aktif.",
  },
  {
    icon: BarChart3,
    title: "Data Trend Realtime",
    description: "Akses data tren produk marketplace secara realtime dan akurat.",
  },
];

export function AdvantagesSection() {
  return (
    <section id="keunggulan" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A855F7] rounded-full filter blur-[200px] opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D4FF] rounded-full filter blur-[200px] opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-light text-sm text-[#A855F7] mb-4">
            Keunggulan
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Mengapa Memilih </span>
            <span className="gradient-text">Nexvora?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Keunggulan yang membuat Nexvora Studio menjadi pilihan terbaik untuk bisnis digital Anda
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 to-[#A855F7]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative glass-card rounded-2xl p-6 h-full hover:border-[#00D4FF]/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-[#00D4FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#00D4FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
