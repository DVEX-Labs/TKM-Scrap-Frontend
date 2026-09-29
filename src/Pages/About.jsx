import { Link } from "react-router-dom";

function About() {
  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Page Header (compensating for fixed navbar with pt-40) */}
      <div className="w-full bg-[#0F172A] pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-20 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            OUR STORY
          </h4>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            About Eco Scrap
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            We are dedicated to turning waste into valuable resources, all while promoting a cleaner, greener planet for future generations.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-16 md:mt-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Pioneering <span className="text-[#18931D]">Sustainable</span> Waste Management.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Based in Kannur, TKM Shop is on a mission to simplify recycling. Our approach ensures that materials are kept in a continuous loop of use, drastically reducing the strain on natural resources and local habitats.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We provide end-to-end solutions, from doorstep collection to final recycling, taking all the hard work out of sustainable living for you and your family.
            </p>
            
            <div className="flex gap-4">
              <Link to="/contact" className="bg-[#18931D] hover:bg-[#15801A] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(24,147,29,0.3)] hover:-translate-y-1">
                Join Our Mission
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img
                className="w-full h-[300px] object-cover rounded-3xl shadow-lg mt-10 hover:scale-[1.02] transition-transform duration-500"
                src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=2070&auto=format&fit=crop"
                alt="Recycling Process"
              />
              <img
                className="w-full h-[300px] object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
                alt="Green Planet"
              />
            </div>
            
            <div className="mt-8 bg-[#F4FAF5] rounded-3xl p-8 border border-green-100 flex items-center justify-between">
              <div>
                <p className="text-4xl font-extrabold text-[#18931D]">10k+</p>
                <p className="text-gray-600 font-bold mt-1">Pickups Completed</p>
              </div>
              <div className="h-12 w-px bg-green-200"></div>
              <div>
                <p className="text-4xl font-extrabold text-[#18931D]">50T</p>
                <p className="text-gray-600 font-bold mt-1">Waste Recycled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
