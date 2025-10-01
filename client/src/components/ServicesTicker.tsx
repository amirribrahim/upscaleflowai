const ServicesTicker = () => {
  const services = [
    "UI/UX Design",
    "Untraditional Marketing", 
    "Special Branding",
    "AI Assistant"
  ];

  return (
    <div className="w-full bg-upscale-dark py-6 overflow-hidden">
      <div className="flex animate-scroll">
        {/* Duplicate services for seamless loop */}
        {[...services, ...services, ...services].map((service, index) => (
          <div key={index} className="flex items-center whitespace-nowrap">
            <span className="text-white text-lg font-medium px-8">
              {service}
            </span>
            <span className="text-white text-2xl">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTicker;