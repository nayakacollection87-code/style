"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="tentang" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-light text-sm text-[#00D4FF] mb-4">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Nexvora Studio</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nexvora Studio adalah platform digital yang dirancang khusus untuk membantu 
              pelaku bisnis online meningkatkan performa dan visibilitas produk mereka di 
              berbagai marketplace. Dengan teknologi AI terdepan dan layanan terintegrasi, 
              kami berkomitmen untuk menjadi partner terbaik dalam perjalanan bisnis digital Anda.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Didirikan dengan visi untuk memberdayakan UMKM Indonesia, Nexvora Studio 
              menyediakan berbagai layanan mulai dari boost trafik, AI creator, hingga 
              analisis tren produk secara realtime.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="text-foreground font-medium">082131974325</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">support@nexvora.studio</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <p className="text-foreground font-medium">Indonesia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#A855F7] rounded-full filter blur-[100px] opacity-30" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full glass-card flex items-center justify-center neon-glow">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-r from-[#00D4FF] to-[#A855F7] flex items-center justify-center">
                  <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-xl glass-card flex items-center justify-center"
              >
                <span className="text-2xl font-bold gradient-text">AI</span>
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl glass-card flex items-center justify-center"
              >
                <span className="text-3xl font-bold gradient-text">N</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Nexvora Studio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
