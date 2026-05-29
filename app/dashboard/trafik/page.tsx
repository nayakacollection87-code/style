"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Video, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: ShoppingBag,
    title: "Shopee Service",
    description: "Tingkatkan view video Shopee dengan layanan trafik terintegrasi",
    href: "/dashboard/trafik/shopee",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Video,
    title: "TikTok Service",
    description: "Boost video TikTok Shop Anda dengan trafik berkualitas",
    href: "/dashboard/trafik/tiktok",
    color: "from-pink-500 to-pink-600",
  },
];

export default function TrafikPage() {
  return (
    <div className="p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00D4FF]" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Trafik Service</h1>
          </div>
          <p className="text-muted-foreground">
            Pilih platform marketplace untuk meningkatkan visibilitas produk Anda
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:border-[#00D4FF]/30 transition-all duration-300">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#00D4FF] transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full group/btn">
                      Mulai Sekarang
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="border-[#00D4FF]/20 bg-[#00D4FF]/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Informasi Layanan Trafik</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-2 shrink-0" />
                  Minimum order 1000 views (kelipatan 1000)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-2 shrink-0" />
                  Konversi: 1000 view = 1 koin
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-2 shrink-0" />
                  Order akan diproses dalam 24-48 jam
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-2 shrink-0" />
                  Anda tidak bisa membuat order baru jika masih ada order pending
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
