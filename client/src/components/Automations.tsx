import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; 
import invoice from "@/assets/Invoice.png";
import chatbot from "@/assets/Chatbot.png";
import Qoutation from "@/assets/Qoutation.png";
import LinkedIn from "@/assets/LinkedIn.png";
import Whatsapp from "@/assets/Whatsapp.png";



const Automations = () => {
  const [selected, setSelected] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    notes: ''
  });

    const mockups = {

      1: {
    desktop: LinkedIn,
   
  }, 
2: {
    desktop: invoice,
   
  }, 

  3: {
    desktop: chatbot,
   
  }, 

   4: {
    desktop: Qoutation,
   
  }, 

  
   5: {
    desktop: Whatsapp,
   
  }, 
};

  const packages = [
    {
  id: 1,
  name: "LinkedIn Automation",
  Description: "Ideal for busy professionals, consultants, and thought leaders who want consistent LinkedIn presence without manual effort.",
  features: [
    "Creates engaging posts from a simple topic using GPT-5, under 200 words, optimized for engagement with CTAs.",
    "Human-in-the-loop via email for text and images; easy regeneration on rejection.",
    "AI-generated visuals aligned with each post and personal branding.",
    "Fully automated posting with Airtable integration, tracking, and scheduling at peak times.",
    "AI detects approval/rejection in responses and auto-regenerates if needed.",
   
  ],
},
{
  id: 2,
  name: "Personal Invoice System",
  Description: "Ideal for freelancers, small business owners, and individuals who want effortless expense tracking without complex accounting tools.",
  features: [
    "Processes invoices from PDFs, images, text, or even voice notes (e.g., “I paid $50 for pizza at Pizza Hut”).",
    "Detects whether input is invoice data or casual conversation, switching modes seamlessly.",
    "Sends extracted data back via Telegram with Yes/No approval buttons before saving.",
    "Stores confirmed invoices in Google Sheets with structured fields and smart date parsing.",
    "No extra apps needed manage everything directly in Telegram with friendly confirmations.",
    "Export to PDF & Excel",
    "Dashboard with income & payment analytics",
  ],
},
{
 id: 3,
  name: "Secretary Chatbot",
  Description: "Ideal for SaaS companies, tech startups, and service providers needing scalable, 24/7 customer support without expanding staff.",
  features: [
    "Automatically filters real customer inquiries from spam, newsletters, or irrelevant chatter saving hours of manual triage.",
    "Auto-updates from Google Drive docs (PDFs, FAQs, guides), converts content into searchable embeddings for instant access.",
    "Retrieves answers directly from documentation to ensure accuracy, transparency, and grounded replies.",
    "Easily connects with WhatsApp, Telegram, Slack, websites, or any chatbot via webhook triggers.",
    "Responds as “Amir from AI Automations” with a professional, friendly tone, citing sources when available and never fabricating info.",
  
  ],
},
{
  id: 4,
  name: "Quotation Generator",
  Description: "Ideal for B2B sales, suppliers, and service providers who need fast, accurate, and professional quotations without manual effort.",
  features: [
    "Customers request quotes in plain text (English/Arabic), and AI extracts structured details like items, quantities, and requirements.",
    "Matches requests to your product catalog with fuzzy search, handling typos, aliases, and size variations.",
    "Instantly calculates totals, taxes, and currency conversions with zero manual spreadsheet work.",
    "Creates professional, branded PDFs with itemized tables, terms, and unique quote numbers.",
    "Sends polished quotations to customers’ inboxes within 60 seconds of request submission.",
  ],
},

{
  id: 5,
  name: " WhatsApp Booking Agent",
  Description: "Ideal for consultants, clinics, salons, and service professionals who want effortless, 24/7 booking via WhatsApp.",
  features: [
    "Handles full appointment scheduling directly in WhatsApp no apps, forms, or websites required.",
    "Greets repeat clients by name and skips redundant questions for a seamless VIP experience.",
    "Syncs with Google Calendar to show only valid time slots (working days/hours, advance notice, no double bookings).",
    "Automatically updates Airtable (customer records), Google Calendar (appointments), and Gmail (confirmation emails) within seconds.",
    "Includes retry logic, duplicate prevention, and smooth recovery from errors without losing conversation history.",
 
  ],
}, 

  ];

const addons = [
  { id: 'extra-page', title: "Extra Page", desc: "Add an additional page to your website." },
  { id: 'blog-setup', title: "Blog Setup", desc: "Engage your audience with a blog section." },
  { id: 'advanced-seo', title: "Advanced SEO", desc: "Boost your visibility with in-depth optimization." },
  { id: 'ecommerce', title: "E-Commerce Store", desc: "Enable product listings and checkout system." },
  { id: 'maintenance', title: "Monthly Maintenance", desc: "Ongoing updates and support." },
  { id: 'animation', title: "Custom Animation", desc: "Bring your website to life with modern animations." },
  { id: 'chatbot', title: "Chatbot Integration", desc: "24/7 automated customer support with AI or live-chat chatbot." },
  { id: 'booking', title: "Booking & Scheduling System", desc: "Allow clients to book appointments, classes, or services directly on your site." },
  { id: 'multilanguage', title: "Multi-language Support", desc: "Expand globally by offering your website in multiple languages." },
  { id: 'dashboard', title: "Custom Dashboard / CMS", desc: "Edit text, images, and content yourself with a user-friendly panel." },
  { id: 'analytics', title: "Analytics & Heatmap Setup", desc: "Track visitor behavior and optimize based on real data." },
  { id: 'email-marketing', title: "Email Marketing Integration", desc: "Collect leads and connect with tools like Mailchimp or HubSpot." },
  { id: 'membership', title: "Membership System", desc: "Create member-only areas with login, profiles, and subscriptions." },
  { id: 'performance', title: "Performance Optimization", desc: "Boost your site’s speed with caching and image optimization." },
  { id: 'illustrations', title: "Custom Illustrations / Icons", desc: "Unique design elements tailored to your brand." },
  { id: 'content-writing', title: "Content Writing Service", desc: "SEO-friendly copywriting for your website and blog." },
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
    const selectedAddonsList = addons.filter(addon => selectedAddons[addon.id]);

    const orderData = {
      package: selectedPackage,
      addons: selectedAddonsList,
      customer: formData,
      timestamp: new Date().toISOString()
    };

    // Send to your backend API
 const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const response = await fetch(`${API_URL}/api/submit-automation`, { method: 'POST',
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


const handlePreviewClick = (pkgId) => {
  setPreviewImages(mockups[pkgId]); 
  setPreviewModalOpen(true);
};


  const selectedPackage = packages.find(pkg => pkg.id === selected);
const [previewModalOpen, setPreviewModalOpen] = useState(false);
const [previewImages, setPreviewImages] = useState(null);

  return (
    <section className=" py-20 px-6 lg:px-12 relative w-full min-h-[100vh] overflow-hidden "  
    style={{  background: 'linear-gradient(to right, #3B82F6, black)'
        }} >
          <div className="max-w-7xl mx-auto text-center mb-16">
  <h2 className="text-4xl lg:text-5xl font-bold italic text-white">
    FROM TASKS TO INTELLIGENCE
  </h2>
  <p className="mt-4 text-lg text-white max-w-1xl mx-auto">
   By Upscale: Designing smart, automated workflows that boost efficiency, cut costs, and unlock business potential.
  </p>
</div>


      {/* Success/Error Messages */}
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

      {/* === Packages Section === */}
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="max-w-6xl mx-auto px-4 lg:px-8 my-12 transition-all"
        >
          <div
            className={`bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-10 lg:p-14 grid lg:grid-cols-2 gap-12 items-start border-2 ${
              selected === pkg.id
                ? "border-blue-500 ring-4 ring-blue-500/20"
                : "border-gray-200"
            }`}
          >
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-2xl">{pkg.id}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold italic text-gray-900">
                  {pkg.name}
                </h2>
                {selected === pkg.id && (
                  <CheckCircle2 className="text-blue-500 w-8 h-8 ml-2" />
                )}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                 {pkg.Description}{" "}
              </p>

          

              <button
                onClick={() =>
                  setSelected(selected === pkg.id ? null : pkg.id)
                }
                className={`px-8 py-2 font-semibold rounded-full shadow-lg mr-10 transition-all text-lg ${
                  selected === pkg.id
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gradient-to-r from-blue-500 to-black text-white hover:scale-105"
                }`}
              >
                {selected === pkg.id ? "Selected" : "Select Package"}
              </button>

                         <button
  onClick={() => handlePreviewClick(pkg.id)}
  className="px-8 py-2 font-semibold rounded-full shadow-lg transition-all text-lg bg-gradient-to-r from-blue-500 to-black text-white hover:scale-105"
>
  Preview
</button>

              
            </div>

            {/* Features */}
            <div className="space-y-7">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
                    ✓
                  </span>
                  <span className="text-black font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

            {selected && (
  <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
    <button
      onClick={() => {
        document.getElementById("cta-section")?.scrollIntoView({ 
          behavior: "smooth",
          block: "end" // scrolls to the bottom of the element
        });
      }}
      className="animate-bounce text-white bg-blue-500 hover:bg-blue-600 p-4 rounded-full shadow-lg transition-all h-12 w-12 border-2"
      title="Go to Get Started"
    >
      ↓
    </button>
  </div>
)}

      {/* === Add-ons Section === */}
  <div  id="cta-section" className="max-w-3xl mx-auto px-6 lg:px-12 my-16 ">
  {/* CTA Box */}
  <div className="relative  to-black text-white rounded-3xl shadow-2xl p-10 text-center overflow-hidden border-2 ">
    
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

      {/* === Enhanced Modal === */}
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

        {Object.keys(selectedAddons).some(key => selectedAddons[key]) && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm font-medium mb-2 text-gray-600">Add-ons:</p>
            {addons.filter(addon => selectedAddons[addon.id]).map(addon => (
              <div key={addon.id} className="flex justify-between items-center text-sm mb-2 text-gray-700 bg-white p-2 rounded-lg shadow-sm">
                <span>{addon.title}</span>
              </div>
            ))}
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

{previewModalOpen && previewImages && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-md px-4 h-[100vh]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={() => setPreviewModalOpen(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors duration-200"
        >
          <X size={28} />
        </button>

      

        {/* Images Section */}
        <div className="p-6  items-center">
          {/* Desktop mockup */}
          {previewImages.desktop && (
            <div className=" p-4 rounded-2xl ">
              <p className="bg-gradient-to-r from-blue-600 via-black to-blue- bg-clip-text text-transparent animate-gradient-x mb-5"></p>
              <img
                src={previewImages.desktop}
                alt="Desktop Preview"
                className="w-full h-[60vh]  object-contain"
              />
            </div>
          )}

          {/* Mobile mockup */}
         
        </div>

        {/* Footer */}
       
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}
    </section>
  );
};

export default Automations;