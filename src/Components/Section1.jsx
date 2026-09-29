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

      <div className="w-full bg-white pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto relative rounded-[40px] overflow-hidden shadow-2xl">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#126B15] to-[#18931D]"></div>
          
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-green-300 opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 px-6 py-20 md:py-24 text-center">
            <h2 className="text-[40px] md:text-[56px] font-extrabold text-white leading-tight tracking-tight mb-6">
              Ready to clear the clutter?
            </h2>
            <p className="text-[18px] md:text-[20px] text-[#D8FACF] max-w-2xl mx-auto mb-10 font-medium">
              Join thousands of smart households. Request a pickup in seconds and enjoy accurate weighing with instant digital payments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-white text-[#18931D] hover:bg-[#F4FAF5] rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Book a Pickup Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-[#147918] hover:bg-[#116614] border border-[#1CA322] text-white rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
                View Scrap Rates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section1;
