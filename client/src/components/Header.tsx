import { useState } from "react";
import { Search } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Menu, X } from "lucide-react"; // hamburger + close icons
import upscaleLogo from "../assets/upscale-logo(1)(1).png";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [

    { name: "HOME", to: "/" },
      { name: "AI AUTOMATION", to: "/AiPage" },
    { name: "WEBSITE", to: "/webPage" },
    { name: "GRAPHIC", to: "/graphicPage" },
  
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6 lg:px-10 h-16">
        {/* Logo */}
        <div className="flex items-center relative">
          <img
            src={upscaleLogo}
            alt="Upscale Logo"
            className="h-10 w-25 object-contain scale-125 -ml-2"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="relative text-sm font-semibold tracking-wide text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
            >
              {item.name}
              <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/yourNumber"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/upscaleflowai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
          >
            <FaInstagram className="h-5 w-5" />
          </a>

          {/* Hamburger Menu Button (only on small screens) */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setMenuOpen(false)} // close menu after click
                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
