import Background from "../assets/background1.jpg";
import Background2 from "../assets/Background2.jpg";
import { Link } from "react-router-dom";

function Section1() {
  return (
    <>
      <div
        className="min-h-[600px] overflow-hidden bg-cover bg-center bg-fixed bg-no-repeat shadow-inner relative flex items-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="w-full relative z-10 px-6 md:px-20 py-20 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="font-inter text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Turning Waste into <span className="text-green-400">Wealth</span>.
            </h2>
            <div className="mt-1 text-xl font-medium text-green-200 mb-6">
              A cleaner environment starts with you.
            </div>
            <p className="mt-4 leading-relaxed text-lg text-gray-200">
              When you sell your dry recyclable waste to ECO SCRAP, it doesn't just sit in a landfill. We carefully segregate, bale, and transport it to authorized recyclers, ensuring it re-enters the economy.
            </p>
            <p className="mt-4 leading-relaxed text-lg text-gray-200 mb-8">
              Join thousands of responsible citizens who are making a difference while getting paid for it.
            </p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1">
              Start Recycling Now
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Zero Waste <span className="text-green-600">Societies</span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto md:mx-0">
              With our zero waste management services, we help your society turn zero waste by incorporating sustainable practices for all residents.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-green-100 hidden md:block -z-10"></div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">1</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Why Recycle?</h4>
              <p className="text-gray-600 leading-relaxed">
                To promote the circular flow of materials, significantly reducing the need for destructive landfill space and protecting our soil.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">2</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Environmental Benefits</h4>
              <p className="text-gray-600 leading-relaxed">
                Establishing circular economy benefits reduces climate impact, conserves natural resources, and minimizes overall pollution.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">3</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Direct Solution</h4>
              <p className="text-gray-600 leading-relaxed">
                Our services help you prevent wasteful practices by easily reducing, reusing, and recycling household waste right from your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="min-h-[500px] overflow-hidden bg-cover bg-center bg-fixed bg-no-repeat shadow-inner relative flex items-center justify-center"
        style={{ backgroundImage: `url(${Background2})` }}
      >
        <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm"></div>
        <div className="w-full relative z-10 px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-inter text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Ready to clear your clutter?
            </h2>
            <p className="mt-4 leading-relaxed text-xl text-green-100 mb-10">
              Schedule a pickup today and we'll be at your doorstep. Transparent weighing, instant payment, and a cleaner home.
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
