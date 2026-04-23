/* Home.tsx — Considered Authority
   Boss journey: Hero → ROI → Services → BrandMatrix → Cases → Capabilities → Process → Trust → About → Contact
   Each section answers one question the boss has as they scroll:
   Hero: "What's in it for me?" (results-first)
   ROI: "Show me the math" (cost comparison)
   Services: "What exactly do I get?" (pricing tiers)
   BrandMatrix: "What's the full system?" (matrix strategy)
   Cases: "Show me real work" (proof of execution)
   Capabilities: "Can you really do all that?" (tech proof)
   Process: "How does it work?" (workflow)
   Trust: "Why should I trust you?" (social proof + FAQ)
   About: "Who are you?" (human connection)
   Contact: "How do I start?" (CTA) */

import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import ROISection from "@/components/ROISection";
import ServicesSection from "@/components/ServicesSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BrandMatrixSection from "@/components/BrandMatrixSection";
import CasesSection from "@/components/CasesSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <HeroSection />
      <ROISection />
      <ServicesSection />
      <BrandMatrixSection />
      <CasesSection />
      <CapabilitiesSection />
      <ProcessSection />
      <TrustSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
