import Arrow from '@/assets/arrow.png';
import upscaleLogo from "../assets/upscale-logo.png";
const AboutSection = () => {
  return (
    <section className="relative w-full bg-white py-24 px-4 overflow-hidden">
       <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-500 via-gray-500 to-black opacity-20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-black to-blue-600 opacity-20 rounded-full blur-[120px] animate-pulse"></div>

      {/* Background arrow */}
      <img
        src={Arrow}
        alt="Blue curved arrow"
        className="absolute left-0 bottom-10 w-[900px] opacity-40 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 pl-20 items-center">


         <div className="relative hidden lg:block">
          <div className="w-full h-full   rounded-3xl shadow-xl flex items-center justify-center">
            {/* Placeholder for image or illustration */}
            <img src={upscaleLogo} alt="Decorative illustration" className="w-[400px] opacity-100" />
          </div>
        </div>
        {/* Content */}
        <div className="text-[50px] lg:text-[60px] font-blod italic">
           <h1 className="bg-gradient-to-r from-blue-600 via-black to-blue-500 bg-clip-text text-transparent animate-gradient-x">
              About Upscale
          </h1>
          <p className="text-lg lg:text-xl font-medium text-black-700 leading-relaxed max-w-md mx-auto lg:mx-0">
            Upscale is a forward thinking digital solutions agency dedicated to empowering
            businesses with modern technology and creative strategies. Our services include
            <span className="font-semibold italic "> website development, AI automation  </span> 
            and <span className="font-semibold italic">graphic design</span>, all crafted to enhance visibility, streamline processes, and elevate brand identity. We combine innovation with design to deliver tailored solutions that help our clients connect with their audience, drive engagement, and achieve sustainable growth.
          </p>
          
        </div>

        {/* Optional: Decorative side image or illustration */}
       
      </div>
    </section>
  );
};

export default AboutSection;
