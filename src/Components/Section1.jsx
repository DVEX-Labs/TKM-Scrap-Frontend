import { Link } from "react-router-dom";

function Section1() {

  const bg2 = "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=2070&auto=format&fit=crop";

  return (
    <>

      <div className="container mx-auto py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
              OUR MISSION
            </h4>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-gray-900 leading-tight">
              Building <span className="text-green-600">Eco-Communities</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[18px] text-gray-600 mx-auto md:mx-0 leading-relaxed font-medium">
              We don't just buy scrap. We partner with residential societies and businesses to drive a real, measurable movement towards a zero-waste planet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent hidden md:block -z-10"></div>
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#18931D] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#18931D] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Protect The Planet</h4>
              <p className="text-gray-600 leading-relaxed">
                By recycling your household scrap, you directly prevent hazardous materials from clogging up local landfills, polluting the soil, and harming wildlife habitats.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#18931D] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#18931D] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Lower Carbon Footprint</h4>
              <p className="text-gray-600 leading-relaxed">
                Recycling old metals, plastics, and paper consumes up to 90% less energy than manufacturing from scratch. Every single pickup helps fight climate change.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#18931D] transition-colors duration-300">
                <svg className="w-8 h-8 text-[#18931D] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Community Focused</h4>
              <p className="text-gray-600 leading-relaxed">
                We organize waste segregation drives across residential complexes, educating citizens and rewarding them financially for making sustainable choices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto relative rounded-[40px] overflow-hidden shadow-2xl bg-[#0F172A]">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-20 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-10 blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 px-6 py-20 md:py-24 text-center">
            <h2 className="text-[40px] md:text-[56px] font-extrabold text-white leading-tight tracking-tight mb-6">
              Ready to clear the clutter?
            </h2>
            <p className="text-[18px] md:text-[20px] text-slate-300 max-w-2xl mx-auto mb-10 font-medium">
              Join thousands of smart households. Request a pickup in seconds and enjoy accurate weighing with instant digital payments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/pickup" className="w-full sm:w-auto px-8 py-4 bg-[#18931D] hover:bg-[#15801A] text-white rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(24,147,29,0.3)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Book a Pickup Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F4FAF5] text-[#18931D] border-2 border-[#18931D] rounded-xl font-bold text-lg transition-all hover:-translate-y-1 flex items-center justify-center">
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
