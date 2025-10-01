import { Button } from "@/components/ui/button";

const BrandingPricing = () => {
  
  const plans = [
    {
      name: "Standard",
      title: "Branding Bundle",
    },
    {
      name: "Advanced",
      title: "Branding Bundle",
    },
    {
      name: "Premium",
      title: "Branding Bundle",
    },
  ];

  const plans2 = [
    {
      name: "Flyers & Brochures",
      
    },
    {
      name: "Posters",
    },
    {
      name: "Books & magazines",
  
    },
  ];

    const plans3 = [
    {
      name: "Box Packaging",
      
    },
    {
      name: "Label Design",
    },
    {
      name: "Pouch & Bag Packaging",
  
    },
  ];

  return (
    <section className=" py-20 px-6 lg:px-12 relative w-full min-h-[100vh] overflow-hidden "  
    style={{  background: 'linear-gradient(to right, #3B82F6, black)'
        }} >
      <div className="max-w-7xl mx-auto" >
        <div className="grid lg:grid-cols-4 lg:h-[200px]">
          {/* Info Card */}
          <div className="bg-gray-200 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h2 className="text-lg font-bold text-black">Branding</h2>
            </div>
            <p className="text-black text-sm leading-relaxed">
              Perfect for small businesses, consultants, & service providers .
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-3 mr-0  bg-gray-200">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-blue-500 text-white flex flex-col justify-between text-center px-6 py-10  border-2 border-white"
              >
                <div>
                  <h3 className="text-xl font-semibold italic mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-base">{plan.title}</p>
                </div>

                <div className="mt-8">
                  <Button
                    className="w-full text-white font-medium"
                    style={{
                      background: "linear-gradient(to right, #3B82F6, black)",
                    }}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       <div className="max-w-7xl mx-auto mt-10" >
        <div className="grid lg:grid-cols-4 lg:h-[200px]">
          {/* Info Card */}
          <div className="bg-gray-200 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h2 className="text-lg font-bold text-black">Hardcopy Prints</h2>
            </div>
            <p className="text-black text-sm leading-relaxed">
              Perfect for small businesses, consultants, and service providers  .
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-3 mr-0  bg-gray-200">
            {plans2.map((plan) => (
              <div
                key={plan.name}
                className="bg-blue-500 text-white flex flex-col justify-between text-center px-6 py-10  border-2 border-white"
              >
                <div>
                  <h3 className="text-xl font-semibold italic mb-2">
                    {plan.name}
                  </h3>
                 
                </div>     
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10" >
        <div className="grid lg:grid-cols-4 lg:h-[200px]">
          {/* Info Card */}
          <div className="bg-gray-200 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <h2 className="text-lg font-bold text-black">Packaging</h2>
            </div>
            <p className="text-black text-sm leading-relaxed">
              Perfect for small businesses, consultants, and service providers  .
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="lg:col-span-3 grid md:grid-cols-3 mr-0  bg-gray-200">
            {plans2.map((plan) => (
              <div
                key={plan.name}
                className="bg-blue-500 text-white flex flex-col justify-between text-center px-6 py-10  border-2 border-white"
              >
                <div>
                  <h3 className="text-xl font-semibold italic mb-2">
                    {plan.name}
                  </h3>
                 
                </div>     
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default BrandingPricing;
