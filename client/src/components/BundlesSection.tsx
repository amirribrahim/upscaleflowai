import { useState } from "react";
import LogoPackages from "./LogoPackages";
import SocialMediaPackages from "./SocialMediaPackages";
import HardcopyPackages from "./HardcopyPackages" ; 

const BundlesSection = () => {
  const [showLogoPackages, setShowLogoPackages] = useState(false);
  const [showSocialPackages , setShowSocailPackages] = useState(false);
  const [showHardcopyPackages , setShowHardcopyPackages] = useState(false);

  const bundles = [
    {
      id: 1,
      title: "Logo Design & Branding",
      desc: "Build a strong visual identity with professional logo design, color palette, typography, and brand guidelines tailored to your business.",
      features: [
        "Primary & Alternative Logo + Submark",
        "Color Palette & Font System",
        "Custom Brand Patterns or Icons",
        "Branded Mockups",
        "Basic Brand Guidelines",
      ],
      cta: "Explore Bundles",
      onClick: () => setShowLogoPackages(true),
    },
    {
      id: 2,
      title: "Social Media  Services",
      desc: "From social media templates to print-ready designs, we create engaging visuals that grow your brand across platforms.",
      features: [
        "Custom Social Media Templates",
        "Static, Carousel & Story Designs",
        "Covers & Banners for all platforms",
        "Flyers, Posters, Catalogs & Menus",
        "Print-Ready & Web Formats",
      ],
      cta: "Explore Bundles",
      onClick: () => setShowSocailPackages(true),
    },
    {
      id: 3,
      title: "Hardcopy  Services",
      desc: "Tailor your own bundle by mixing and matching services that fit your business needs — flexible, scalable, and cost-effective.",
      features: [
        "Mix branding, social media & print",
        "Choose add-ons as needed",
        "Flexible pricing based on scope",
        "Perfect for startups or scaling brands",
        "Delivered with the same quality promise",
      ],
      cta: "Explore Bundles",
      onClick: () => setShowHardcopyPackages(true),
    },
  ];

  return (

     

    
    <section className=" py-20 px-6 lg:px-12 relative w-full min-h-[100vh] overflow-hidden "  
      style={{  background: 'linear-gradient(to right, #3B82F6, black)'
        }} >

      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold italic text-white">
         FROM SKETCH TO SCREEN
        </h2>
        <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
         By Upscale; Designing brands, packaging, 
and visuals that grow with your business.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {bundles.map((bundle, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-100 hover:shadow-2xl transition-all"
          >
           <div className="flex items-center space-x-4 pb-10">
  {/* Bundle ID Circle */}
  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
    <span className="text-white font-bold text-2xl">{bundle.id}</span>
  </div>

  {/* Bundle Title */}
  <h3 className="text-3xl lg:text-2xl font-semibold italic text-gray-900">
    {bundle.title}
  </h3>
</div>


            {/* Description */}
            

            {/* Features */}
            <ul className="space-y-3 text-left mb-8">
              {bundle.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    ✓
                  </span>
                  <span className="text-black font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={bundle.onClick}
              className="mt-auto w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-black text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              {bundle.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal for LogoPackages */}
      {showLogoPackages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-7xl max-h-[90vh] mx-4 p-6 overflow-y-auto bg-white rounded-2xl shadow-2xl p-6"   style={{
        background: "linear-gradient(to bottom right, #3B82F6, black)"
      }} > {/* Close Button */}
            <button
              onClick={() => setShowLogoPackages(false)}
              className="absolute top-4 right-4 text-white  font-bold text-2xl"
            >
              &times;
            </button>

            {/* Render LogoPackages Inside */}
            <LogoPackages />
          </div>
        </div>
      )}

      {showSocialPackages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm"   >
        
          <div className="relative w-full max-w-7xl max-h-[90vh] mx-4 p-6 overflow-y-auto bg-white rounded-2xl shadow-2xl p-6"   style={{
        background: "linear-gradient(to bottom right, #3B82F6, black)"
      }} >
            {/* Close Button */}
            <button
              onClick={() => setShowSocailPackages(false)}
              className="absolute top-4 right-4 text-white  font-bold text-2xl"
            >
              &times;
            </button>

            {/* Render LogoPackages Inside */}
            <SocialMediaPackages />
          </div>
        </div>
      )}

       {showHardcopyPackages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm"   >
        
          <div className="relative w-full max-w-7xl max-h-[90vh] mx-4 p-6 overflow-y-auto bg-white rounded-2xl shadow-2xl p-6"   style={{
        background: "linear-gradient(to bottom right, #3B82F6, black)"
      }} >
            {/* Close Button */}
            <button
              onClick={() => setShowHardcopyPackages(false)}
              className="absolute top-4 right-4 text-white  font-bold text-2xl"
            >
              &times;
            </button>

            {/* Render LogoPackages Inside */}
            <HardcopyPackages />
          </div>
        </div>
      )}

    </section>
  );
};

export default BundlesSection;
