import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import upscaleLogo from "../assets/upscale-logo(1)(1).png";

const Footer = () => {
  return (
    <section className="relative w-full min-h-[50vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Animated gradient background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500 via-gray-500 to-black opacity-20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-black to-blue-600 opacity-20 rounded-full blur-[120px] animate-pulse"></div>

      <footer className="text-gray-100">
        {/* Top Section */}
        <div
          className="w-full border-t-2"
          style={{
            background: "linear-gradient(to bottom, #ffffff, #f1f5f9)", // softer gray fade
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column - Company Info */}
            <div>
              <div className="flex items-center">
                <img
                  src={upscaleLogo}
                  alt="Upscale Logo"
                  className="h-30 lg:h-26 w-30 mb-10"
                  style={{ maxHeight: "60px" }}
                />
              </div>
              <div className="space-y-4 text-gray-800">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#3B82F6]" />
                  <span className="text-sm font-medium">Choukine , Nabatieh , Lebanon</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#3B82F6]" />
                  <span className="text-sm font-medium">+961 81 220 888</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#3B82F6]" />
                  <a
                    href="mailto:upscaleflowai@gmail.com"
                    className="text-sm font-medium hover:underline"
                  >
                    upscaleflowai@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Column - Services */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Services</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  { name: "Home", id: "/" },
                  { name: "Web Development", id: "webPage" },
                  { name: "Graphic Design", id: "graphicPage" },
                  { name: "AI Automation", id: "aiPage" },
                ].map(({ name, id }) => (
                  <li key={id}>
                    <a
                      href={`${id}`}
                      className="text-sm font-medium hover:text-[#3B82F6] transition-colors cursor-pointer"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - Work Time & Social */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Work Time</h3>
              <p className="text-sm font-medium text-gray-700 mb-8">
                Monday - Saturday <br />
                <span className="text-[#3B82F6]">9:00 AM - 5:00 PM</span>
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { Icon: FaWhatsapp, link: "#", color: "text-green-500" },
                  {
                    Icon: FaInstagram,
                    link: "https://instagram.com/upscaleflowai",
                    color: "text-pink-500",
                  },
                  { Icon: FaFacebook, link: "#", color: "text-blue-600" },
                ].map(({ Icon, link, color }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:scale-110 transform transition"
                  >
                    <Icon className={`w-6 h-6 ${color}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          className="py-5"
          style={{
            background: "linear-gradient(to right, #3B82F6, black)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-white font-medium">
              © 2025 upscaleflowai.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;

