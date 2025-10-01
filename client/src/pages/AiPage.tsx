import { useRef } from "react";
import Header from "@/components/Header";
import AiShowcase from "@/components/AiShowcase";
import Automations from "@/components/Automations";
import Footer from "@/components/Footer";
import ChatbotUI from "@/components/ChatbotUI";

const AiPage = () => {
   const starterRef = useRef(null);

  const scrollToStarter = () => {
    starterRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <AiShowcase  onDiscoverClick={scrollToStarter}/>

     <div ref={starterRef} className="min-h-[100vh]">
  <Automations />
</div>


      <ChatbotUI />
      <Footer />
    </div>
  );
};

export default AiPage;
