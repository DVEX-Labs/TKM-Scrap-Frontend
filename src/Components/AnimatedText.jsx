import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lorry from "../assets/Lorry.png";
import { Link } from "react-router-dom";

const AnimatedText = () => {
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      h1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      pRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );
    
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
    );
  }, []);
  
  return (
    <div className="w-full bg-[#F4FAF5] min-h-[100vh] flex items-center pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[100px] -z-10 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="max-w-[1240px] mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* Left Content Area */}
        <div className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0">
          
          {/* Badge */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-8">
            <div className="flex items-center bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              <span className="text-gray-800 font-bold text-sm">Instant Doorstep Pickup</span>
            </div>
            <div className="flex items-center bg-[#E8F5E9] px-5 py-2.5 rounded-full border border-[#C8E6C9]">
              <svg className="w-4 h-4 text-[#18931D] mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-[#18931D] font-bold text-sm">Certified Recycler</span>
            </div>
          </div>
          
          {/* Headline */}
          <h1 ref={h1Ref} className="text-[46px] sm:text-[56px] lg:text-[72px] font-extrabold text-[#141414] leading-[1.05] tracking-tight">
            Turn <span className="text-[#18931D]">Waste</span> Into<br/>
            Instant <span className="relative inline-block">
              <span className="relative z-10 text-[#18931D]">Cash!</span>
              <svg className="absolute w-full h-4 -bottom-1 left-0 -z-10 text-green-200" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p ref={pRef} className="text-[20px] lg:text-[22px] text-[#6D6D6D] max-w-[480px] mt-8 font-medium leading-relaxed">
            Effortless doorstep scrap pickup. Best market rates, paid instantly.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-12 w-full max-w-[540px]">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/pickup"
                className="w-full sm:flex-1 inline-flex items-center justify-center bg-[#18931D] hover:bg-[#15801A] text-white font-bold text-[17px] py-4 px-8 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-green-900/20 text-center"
              >
                Book a Pickup Free
              </Link>
              <Link
                to="/products"
                className="w-full sm:flex-1 inline-flex items-center justify-center bg-white hover:bg-[#F4FAF5] text-[#18931D] font-bold text-[17px] py-4 px-8 rounded-xl transition-all hover:-translate-y-0.5 border-2 border-[#18931D] text-center"
              >
                View Scrap Rates
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-6 text-sm font-semibold text-gray-500 pl-1">
              <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Free Pickup</div>
              <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Best Rates</div>
              <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Same Day Pay</div>
            </div>
          </div>

        </div>
        
        {/* Right Image Area */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end mt-16 md:mt-0 relative">
          <div className="relative w-full max-w-[550px]">
            {/* Dynamic decorative backdrop for the truck */}
            <div className="absolute top-[10%] -right-[5%] w-[90%] h-[90%] bg-gradient-to-br from-[#D8FACF] to-[#bbf7b4] rounded-full blur-2xl -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute -bottom-10 left-[10%] w-[80%] h-[30%] bg-black/10 rounded-[100%] blur-xl -z-10"></div>
            
            <img 
              src={Lorry} 
              alt="Eco Lorry" 
              className="w-full h-auto drop-shadow-2xl hover:scale-105 hover:-translate-y-2 transition-transform duration-700 relative z-10"
            />
            
            {/* Floating stats badge */}
            <div className="absolute top-10 -left-6 md:-left-12 bg-white px-5 py-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">Top Rates</p>
                <p className="text-xs text-gray-500 font-medium">Guaranteed</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnimatedText;
