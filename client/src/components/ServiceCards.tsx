import ai from "@/assets/ai.png";
import Graphic from "@/assets/Graphic.png";
import Web from "@/assets/Web.png";
import { Link } from "react-router-dom";

const services = [

    {
    title: "AI Automation",
    desc: "Smarter business operations through AI-powered automation that streamlines workflows and enhances your brand efficiency.",
    img: ai,
    gradient: "from-blue-500 to-black",
    link: "/AiPage",
  },
  {
    title: "Web Development",
    desc: "We create websites using cutting-edge technologies, delivering seamless front- and back-end experiences designed to boost conversions and engagement.",
    img: Web,
    gradient: "from-blue-500 to-black",
    link: "/webPage",
  },
  {
    title: "Graphic Design",
    desc: "Captivating designs that communicate your brand identity, elevate your visual presence, and engage your audience with modern aesthetics.",
    img: Graphic,
    gradient: "from-blue-500 to-black",
    link: "/GraphicPage",
  },

];

const ServiceCards = () => {
  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 py-24">
      {/* Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-15 blur-[120px]" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500 opacity-15 blur-[120px]" />

      {/* Services Container */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {services.map((service, index) => (
          <Link key={index} to={service.link} className="block">
            <div
              className={`relative overflow-hidden w-full rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 bg-gradient-to-r ${service.gradient} p-10 lg:p-16 shadow-lg`}
            >
              {/* Text */}
              <div className="flex-1 text-center lg:text-left relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold italic text-white mb-6 tracking-tight">
                  {service.title}
                </h2>
                <p className="text-lg lg:text-xl text-white font-light leading-relaxed max-w-2xl mx-auto">
                  {service.desc}
                </p>
              </div>

              {/* Image */}
              <div className="relative z-10">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  className="w-44 h-44 lg:w-64 lg:h-64 object-contain drop-shadow-lg"
                />
              </div>

              {/* Accent Glows */}
              <div className="absolute -top-16 -left-16 w-60 h-60 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;

