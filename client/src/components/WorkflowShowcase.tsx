import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Monitor, Brain } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Graphic Design & Branding",
    desc: "Bold, unique visuals that define your brand identity.",
    icon: <PenTool className="w-12 h-12" />,
  },
  {
    id: 2,
    title: "Web Development",
    desc: "Immersive websites that are fast, secure, and scalable.",
    icon: <Monitor className="w-12 h-12" />,
  },
  {
    id: 3,
    title: "AI Automation",
    desc: "Intelligent solutions that scale your business with ease.",
    icon: <Brain className="w-12 h-12" />,
  },
];

const CreativeFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-play every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] py-28 overflow-hidden via-black to-gray-900 text-white">
      {/* Floating background blobs */}
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

      {/* Heading */}
      <div className="relative text-center mb-20">
        <h2 className="text-[50px] lg:text-[60px] font-blod italic">
          <span className="bg-gradient-to-r from-blue-600 via-black to-blue-500 bg-clip-text text-transparent animate-gradient-x">
            From Vision → To Innovation
          </span>
        </h2>
        <p className="mt-6 text-lg max-w-2xl mx-auto italic">
          Journey through our creative process.
        </p>
      </div>

      {/* Step Card */}
      <div className="relative flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[currentStep].id}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
            className="p-10 w-500 text-center rounded-3xl  backdrop-blur-lg border border-black/20 shadow-2xl"
             style={{
              background: "linear-gradient(to right, #3B82F6, black)",
            }}
          >
            <div className="mb-6 w-20 h-20 flex items-center justify-center mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              {steps[currentStep].icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-200">{steps[currentStep].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-center gap-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-4 h-4 rounded-full transition ${
              index === currentStep ? "bg-blue-500 scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CreativeFlow;
