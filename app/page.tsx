import { LandingSidebar } from "@/components/landing/sidebar";
import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { AdvantagesSection } from "@/components/landing/advantages";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing";
import { AboutSection } from "@/components/landing/about";
import { WhatsAppFloat } from "@/components/landing/whatsapp-float";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <LandingSidebar />
      
      <main className="lg:ml-64">
        <HeroSection />
        <FeaturesSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <PricingSection />
        <AboutSection />
      </main>

      <WhatsAppFloat />
    </div>
  );
}
