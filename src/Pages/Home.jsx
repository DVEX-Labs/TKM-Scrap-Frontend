import Section1 from "../Components/Section1";
import AnimatedText from "../Components/AnimatedText";
import Plant from "../assets/plant.webp";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full flex flex-col bg-white">
      <AnimatedText />
      
      <div className="w-full bg-white py-24 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-50 to-transparent -z-10"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] mb-6">
              <span className="text-[#18931D] font-bold text-sm tracking-wide uppercase">Our Process</span>
            </div>
            
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-[#141414] leading-[1.15] tracking-tight mb-6">
              Transforming <span className="text-[#18931D]">Waste</span> Into <br className="hidden lg:block" />A Greener Tomorrow
            </h2>
            
            <p className="text-[18px] text-[#6D6D6D] leading-relaxed mb-8 font-medium max-w-[600px]">
              After you sell your dry recyclable waste to us, it doesn't just disappear. It is carefully collected, segregated, and baled at our ECO SCRAP facilities. 
            </p>

            {/* Feature List */}
            <div className="flex flex-col gap-4 mb-10 w-full max-w-[450px]">
              <div className="flex items-center gap-4 text-left">
                <div className="w-8 h-8 rounded-full bg-[#D8FACF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-[17px] font-bold text-[#141414]">Transported to authorized recyclers</span>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-8 h-8 rounded-full bg-[#D8FACF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-[17px] font-bold text-[#141414]">Takes new forms in the economy</span>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-8 h-8 rounded-full bg-[#D8FACF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-[17px] font-bold text-[#141414]">Achieves true circularity & zero waste</span>
              </div>
            </div>

            <Link to="/about" className="px-8 py-4 bg-[#141414] hover:bg-[#2B2B2B] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-3 text-lg w-full sm:w-auto">
              Learn More About Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>

          <div className="w-full lg:w-1/2 relative mt-16 lg:mt-0 px-4 sm:px-8 lg:px-0">
            {/* Background decoration for image */}
            <div className="absolute inset-0 bg-[#18931D] rounded-3xl transform translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 opacity-10"></div>
            
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={Plant}
                alt="Eco friendly process"
                className="w-full h-[400px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-2 sm:-left-8 bg-white p-4 sm:p-6 rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.12)] border border-gray-50 flex items-center gap-4 sm:gap-5 z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F4FAF5] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">Impact Made</p>
                <p className="text-xl sm:text-2xl font-extrabold text-[#141414]">50,000+ kg</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Section1 />
    </div>
  );
}

export default Home;
