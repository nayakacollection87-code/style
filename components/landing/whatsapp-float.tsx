"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const whatsappNumber = "6282131974325";
  const whatsappMessage = encodeURIComponent("Halo Admin Mbah Paijo, saya ingin bertanya tentang Nexvora Studio");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:block glass-card px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-sm font-medium text-foreground whitespace-nowrap">Admin Mbah Paijo</span>
        </motion.div>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
