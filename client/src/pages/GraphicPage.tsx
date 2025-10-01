import { useRef } from "react";
import Header from "@/components/Header";
import GraphicShowcase  from "@/components/GraphicShowcase";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BrandingPricing from "@/components/BrandingPricing";
import BundlesSection from "@/components/BundlesSection";
import ChatbotUI from "@/components/ChatbotUI";

const WebPage = () => {
    const starterRef = useRef(null);
  
    const scrollToStarter = () => {
      starterRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GraphicShowcase  onDiscoverClick={scrollToStarter} /> 
      <div ref={starterRef}>
      <BundlesSection />
     </div>
      <ChatbotUI />
      <Footer />
    </div>
  );
};

export default WebPage;
