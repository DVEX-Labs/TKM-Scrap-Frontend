import { Link } from "react-router-dom";

function Section1() {

  const bg2 = "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=2070&auto=format&fit=crop";

  return (
    <>

      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Building <span className="text-green-600">Eco-Communities</span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto md:mx-0">
              We collaborate with residential complexes and businesses to implement comprehensive waste management systems that actually work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-green-100 hidden md:block -z-10"></div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">1</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Why Partner With Us?</h4>
              <p className="text-gray-600 leading-relaxed">
                Our streamlined process guarantees that materials are kept in a continuous loop of use, drastically reducing the strain on natural resources and local habitats.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">2</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Positive Impact</h4>
              <p className="text-gray-600 leading-relaxed">
                Embracing a circular economy directly mitigates climate change. Every kilogram of scrap recycled means less energy consumed in manufacturing new products.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">3</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">How We Help</h4>
              <p className="text-gray-600 leading-relaxed">
                We provide end-to-end solutions, from doorstep collection to final recycling, taking all the hard work out of sustainable living for you and your family.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="min-h-[500px] overflow-hidden bg-cover bg-center bg-fixed bg-no-repeat shadow-inner relative flex items-center justify-center"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm"></div>
        <div className="w-full relative z-10 px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-inter text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Let's clean up together.
            </h2>
            <p className="mt-4 leading-relaxed text-xl text-green-100 mb-10">
              Request a pickup in seconds. Enjoy accurate digital weighing, friendly staff, and instant digital payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-green-700 hover:bg-gray-50 rounded-xl font-bold text-lg shadow-xl transition-all hover:-translate-y-1">
                Book a Pickup
              </Link>
              <Link to="/products" className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
                Check Scrap Rates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section1;
