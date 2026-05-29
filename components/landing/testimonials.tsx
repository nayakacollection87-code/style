"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rina Susanti",
    role: "Seller Shopee",
    content: "Sangat membantu meningkatkan performa video marketplace saya.",
    rating: 5,
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Content Creator",
    content: "Dashboard mudah digunakan dan fitur AI sangat lengkap.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dewi Lestari",
    role: "Online Shop Owner",
    content: "Referral system berjalan lancar dan transparan.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ahmad Fauzi",
    role: "TikTok Seller",
    content: "Pelayanan cepat dan profesional.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimoni" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-light text-sm text-[#EC4899] mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Apa Kata </span>
            <span className="gradient-text">Pengguna Kami?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ribuan pengguna telah merasakan manfaat dari Nexvora Studio
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-8 md:p-12"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00D4FF]/20 to-[#A855F7]/20 flex items-center justify-center mb-6">
                    <Quote className="w-8 h-8 text-[#00D4FF]" />
                  </div>

                  <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <Avatar className="w-14 h-14 mb-3">
                    <AvatarFallback className="text-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <h4 className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-[#00D4FF] to-[#A855F7]"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
