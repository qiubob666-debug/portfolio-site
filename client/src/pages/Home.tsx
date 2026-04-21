/* Home — Kinetic Precision design system
   Full page composition: CustomCursor + Navbar + Hero + Stack + Process + About + Contact
   No screenshots. The interaction is the portfolio. */

import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackSection from "@/components/StackSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <StackSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
