import { useState } from "react";
import { Button } from "@/components/ui/button";
import Phone3 from "@/assets/Phone3.png";
import ContactForm from "./ContactForm";
import { motion, AnimatePresence } from "framer-motion"; 



const WebDevelopmentShowcase = ({ onDiscoverClick }) => {
const [showContactForm, setShowContactForm] = useState(false);
  return (
     <section className="relative w-full min-h-[100vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

          <motion.div
        className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-400   opacity-60 blur-[50px]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400   opacity-60 blur-[50px]"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      {/* Animated gradient background blobs */}
   
      {/* Container */}
    <div className="relative max-w-7xl mx-auto px-6 lg:px-2 py-24 flex flex-col lg:flex-row items-center justify-between">

        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-5 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          {/* Headline */}
            <h1 className="text-[50px] lg:text-[60px] font-blod italic">
            <span className="bg-gradient-to-r from-blue-600 via-black to-blue-500 bg-clip-text text-transparent animate-gradient-x">
              Web Development,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-black to-blue-500 bg-clip-text text-transparent animate-gradient-x ">Innovation in Motion</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg lg:text-xl font-medium text-black-700 leading-relaxed max-w-md mx-auto lg:mx-0">
            
            <span className="font-semibold text-blue-600">Your website</span>,{" "}
            <span className="font-semibold italic">is the bridge between your brand and your audience. We craft fast, responsive, and secure sites tailored to your goals delivering seamless experiences that engage, build trust, and drive results.</span> {" "}
         
          </p>

          {/* CTA Buttons */}
     
              <div className="flex gap-4 justify-center lg:justify-start pt-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onDiscoverClick}
            className="px-8 py-3 font-semibold rounded-full shadow-lg text-white text-lg"
            style={{
              background: "linear-gradient(to right, #3B82F6, black)",
            }}
          >
            Discover
          </Button>
        </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setShowContactForm(true)}
                className="px-8 py-3 font-semibold rounded-full shadow-lg text-white text-lg relative overflow-hidden"
                style={{
                  background: "linear-gradient(to right, #2563eb, #1e1e1e)",
                }}
              >
                Free Consultation
                <span className="absolute inset-0 rounded-full bg-blue-500/40 blur-lg animate-pulse"></span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content - Laptop Mockup */}
 
<motion.div
  className="hidden lg:flex w-2/5 relative mt-12 lg:mt-0 justify-center"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.4 }}
>
  {/* Glow Behind Laptop */}
 

  {/* Floating Laptop */}
  <motion.img
    src={Phone3 }
    alt="Laptop mockup"
    className="relative z-5  w-[850px]  max-w-none drop-shadow-2xl rounded-xl"
    animate={{ y: [0, -25, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  />

  
</motion.div>

      </div>

            {/* Popup Modal */}
            <AnimatePresence>
              {showContactForm && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Modal Content */}
                  <motion.div
                    className="relative  rounded-2xl shadow-xl w-full max-w-7xl mx-4 p-6 overflow-y-auto max-h-[150vh]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="absolute font-bold top-4 right-4 text-white hover:text-white"
                    >
                      ✕
                    </button>
      
                    <ContactForm />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
    </section>
  );
};

export default WebDevelopmentShowcase;
