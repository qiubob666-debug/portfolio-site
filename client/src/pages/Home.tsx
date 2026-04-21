/* Home.tsx — Considered Authority
   Boss journey: Hero → Services → Capabilities → Process → Trust → About → Contact
   Each section answers one question the boss has as they scroll */

import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <HeroSection />
      <ServicesSection />
      <CapabilitiesSection />
      <ProcessSection />
      <TrustSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
