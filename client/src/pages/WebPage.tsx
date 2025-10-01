
import { useRef } from "react";
import Header from "@/components/Header";
import WebDevelopmentShowcase from "@/components/WebDevelopmentShowcase";
import StarterPackage from "@/components/StarterPackage";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ChatbotUI from "@/components/ChatbotUI";

const WebPage = () => {
   const starterRef = useRef(null);

  const scrollToStarter = () => {
    starterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
       <WebDevelopmentShowcase onDiscoverClick={scrollToStarter} />
      <div ref={starterRef}>
        <StarterPackage />
      </div>
      
      <ChatbotUI />
      <Footer />
    </div>
  );
};

export default WebPage;
