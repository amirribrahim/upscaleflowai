import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion"; 

const LogoPackages = () => {
  
  const [selected, setSelected] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    notes: ''
  });


const packages = [
  {
    id: 1,
    name: "STANDARD BUNDLE",
    Description:
      "A solid foundation for new or small brands looking to establish their presence. This package gives you the essentials clean visuals, a versatile logo, and brand consistency so you can start standing out with confidence.",
    features: [
      "1 Primary Logo + Submark",
      "Brand Color Palette",
      "Custom brand patterns or textures",
      "3 Branded Mockups",
      "Basic Brand Guidelines (font usage, logo usage, color codes)",
      "Full File Suite (PNG, JPG, SVG, PDF, EPS)",
      "3 Revisions",
    ],
  },
  {
    id: 2,
    name: "ADVANCED BUNDLE",
    Description:
      "Designed for growing businesses that want to go beyond the basics. This package adds depth to your identity with custom icons, branded mockups, and professional print-ready materials making your brand more memorable and versatile.",
    features: [
      "1 Primary Logo + 1 Alternative Logo + Submark",
      "Brand Color Palette",
      "Font system (headings/body fonts)",
      "Custom brand patterns or textures",
      "Custom icon set (up to 5 icons)",
      "Business card design (print-ready)",
      "Designs Branded Mockups",
      "Basic Brand Guidelines (font usage, logo usage, color codes)",
      "Full File Suite (PNG, JPG, SVG, PDF, EPS)",
      "3 Revision Rounds",
    ],
  },
  {
    id: 3,
    name: "PRO BUNDLE",
    Description:
      "Our most comprehensive package for ambitious brands ready to dominate their industry. With a complete brand ecosystem logos, typography, patterns, mockups, and premium guidelines this bundle ensures your identity is polished, scalable, and unforgettable.",
    features: [
      "1 Primary Logo + 1 Alternative Logo + Submark",
      "Brand Color Palette",
      "Font system (headings/body fonts)",
      "Custom brand patterns or textures",
      "Custom icon set (up to 5 icons)",
      "Business card design (print-ready)",
      "Designs Branded Mockups",
      "Basic Brand Guidelines (font usage, logo usage, color codes)",
      "Full File Suite (PNG, JPG, SVG, PDF, EPS)",
      "3 Revision Rounds",
    ],
  },
];

  const addons = [
    { title: "Extra Page", desc: "Add an additional page to your website.", price: 79 },
    { title: "Blog Setup", desc: "Engage your audience with a blog section.", price: 120 },
    { title: "Advanced SEO", desc: "Boost your visibility with in-depth optimization.", price: 150 },
    { title: "E-Commerce Store", desc: "Enable product listings and checkout system.", price: 300 },
    { title: "Monthly Maintenance", desc: "Ongoing updates and support.", price: 50 },
    { title: "Custom Animation", desc: "Bring your website to life with modern animations.", price: 99 },
  ];

  // Handle addon selection
  const handleAddonChange = (addonId) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSubmitStatus(null);

  // Basic validation
  if (!formData.fullName || !formData.email || !selected) {
    setSubmitStatus('error');
    setIsLoading(false);
    return;
  }

  try {
    // Prepare order data
    const selectedPackage = packages.find(pkg => pkg.id === selected);
  
    const orderData = {
      package: selectedPackage,
     
      customer: formData,
      timestamp: new Date().toISOString()
    };

    // Send to your backend API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const response = await fetch(`${API_URL}/api/submit-logo`, {  method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (response.ok) {
      setSubmitStatus('success');

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        notes: ''
      });
      setSelected(null);
      setSelectedAddons({});

      // **Close the modal**
      setModalOpen1(false);
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    setSubmitStatus('error');
  } finally {
    setIsLoading(false);
  }
};


  const selectedPackage = packages.find(pkg => pkg.id === selected);


  return (
    <section className=" p-8 pt-0 lg:p-12 rounded-lg">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold italic text-white">
         Logo Design & Branding
        </h2>
        </div>
      {/* === Packages Section === */}

      {submitStatus === 'success' && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
           We'll contact you soon .
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Please fill in all required fields and try again.
        </div>
      )}

      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="max-w-6xl mx-auto px-4 lg:px-8 my-12 transition-all"
        >
         <div
            className={` shadow-2xl rounded-2xl p-10 lg:p-14 grid lg:grid-cols-2 gap-12 items-start border-2  bg-white/100 ${
              selected === pkg.id
                ? "border-primary ring-4 ring-primary/20"
                : "border-gray-100"
            }`}
          >
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 flex-wrap">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-2xl">{pkg.id}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold italic text-gray-900 flex-1 break-words">
                  {pkg.name}
                </h2>
                {selected === pkg.id && (
                  <CheckCircle2 className="text-primary w-7 h-7 ml-2 flex-shrink-0" />
                )}
              </div>
                 <p className="text-lg text-gray-600 leading-relaxed">
                 {pkg.Description}{" "}
              </p>


          

              <button
                onClick={() =>
                  setSelected(selected === pkg.id ? null : pkg.id)
                }
                className={`px-8 py-2 font-semibold rounded-full shadow-lg transition-all text-lg ${
                  selected === pkg.id
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gradient-to-r from-blue-500 to-black text-white hover:scale-105"
                }`}
              >
                {selected === pkg.id ? "Selected" : "Select Package"}
              </button>
            </div>

            {/* Features */}
              <div className="space-y-7">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
                    ✓
                  </span>
                  <span className="text-black font-medium">{feature}</span>
                 
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* === Add-ons Section === */}
<div   className="max-w-3xl mx-auto px-6 lg:px-12 my-16 ">
  {/* CTA Box */}
  <div className="relative to-black text-white rounded-3xl shadow-2xl p-10 text-center overflow-hidden border-2">
    
    {/* Decorative Glow Circles */}
    <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>

    {/* CTA Heading */}
    <p className="text-400 text-white max-w-2xl mx-auto mb-8">
      Select a package and let’s start building something extraordinary together.
    </p>

    {/* CTA Button */}
    <Button
      onClick={() => setModalOpen1(true)}
      disabled={!selected}
      className={`px-10 py-4 rounded-full shadow-lg font-semibold text-lg transition-all duration-300 transform ${
        !selected
          ? "bg-gray-500 text-gray-300 cursor-not-allowed scale-95"
          : "hover:scale-110 hover:shadow-blue-500/40 text-white"
      }`}
      style={
        selected
          ? { background: "linear-gradient(to right, #3B82F6, #000000)" }
          : {}
      }
    >
      {selected ? " Get Started Now" : " Select a Package First"}
    </Button>
  </div>
</div>


      {/* === Modal 1 === */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Confirm Your Package
            </h2>
          </div>
        </div>
      )}

      {/* === Modal 2 === */}
    {modalOpen1 && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-3xl w-full max-w-2xl p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
      {/* Close Button */}
      <button
        onClick={() => {
          setModalOpen1(false);
          setSubmitStatus(null);
        }}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors"
      >
        &times;
      </button>

      {/* Header */}
      <h2 className="text-3xl font-semibold italic text-gray-900 mb-8 text-center">
        Summary & Contact Details
      </h2>

      {/* Order Summary */}
      <div className="linear-gradient(to right, #3B82F6, black) rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Your Selection:</h3>
        
        {selectedPackage && (
          <div className="flex justify-between items-center mb-3 text-gray-700 font-medium bg-white p-3 rounded-lg shadow-sm">
            <span>{selectedPackage.name}</span>
          </div>
        )}

      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <input 
          type="text" 
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name *" 
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700"
        />
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address *" 
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700"
        />
        <input 
          type="tel" 
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number" 
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700"
        />
        <input 
          type="text" 
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location / City" 
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700"
        />
        <textarea 
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Additional Notes / Requests" 
          rows={4}
          className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-700"
        />

        {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ background: 'linear-gradient(to right, #3B82F6, #1E1E1E)' }}
            className="w-full mt-4 px-6 py-3 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Submitting...
              </>
            ) : (
              'Confirm Selection'
            )}
          </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default LogoPackages;
