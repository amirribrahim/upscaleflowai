import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesTicker from "@/components/ServicesTicker";
import AboutSection from "@/components/AboutSection";
import BottomServices from "@/components/BottomServices";
import ServiceCards from "@/components/ServiceCards";
import Footer  from "@/components/Footer";
import ChatbotUI from "@/components/ChatbotUI";
import WorkflowShowcase from "@/components/WorkflowShowcase";

const Index = () => {

    const starterRef = useRef(null);
  
    const scrollToStarter = () => {
      starterRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onDiscoverClick={scrollToStarter} />
      <ServicesTicker />
    
      <AboutSection />
    
      <BottomServices />  
      <div ref={starterRef}>
  
      </div>
      <ServiceCards/>
      <ChatbotUI />
      <Footer/> 

    </div>
  );
};

export default Index;
