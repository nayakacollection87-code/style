"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  "Akses penuh ke semua fitur",
  "Saldo koin untuk layanan",
  "Dashboard personal",
  "Dukungan prioritas",
  "Akses materi gratis",
  "Sistem referral aktif",
];

export function PricingSection() {
  return (
    <section id="harga" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 rounded-full filter blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-light text-sm text-[#10B981] mb-4">
            Harga Terjangkau
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Paket </span>
            <span className="gradient-text">Aktivasi</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mulai perjalanan bisnis digital Anda dengan biaya aktivasi yang terjangkau
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card className="relative overflow-hidden border-2 border-[#00D4FF]/30">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/10 via-transparent to-[#A855F7]/10" />
            
            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] text-white text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Populer
              </span>
            </div>

            <CardHeader className="relative text-center pt-8 pb-4">
              <CardTitle className="text-2xl mb-2">Paket Aktivasi</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold gradient-text">Rp25.000</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 max-w-xs mx-auto">
                Harga aktivasi akan masuk sebagai saldo koin untuk digunakan di dalam platform.
              </p>
            </CardHeader>

            <CardContent className="relative pb-8">
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/register" className="block">
                <Button variant="glow" size="xl" className="w-full">
                  Daftar Sekarang
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
