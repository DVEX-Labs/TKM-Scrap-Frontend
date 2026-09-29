import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lorry from "../assets/Lorry.png";
import { Link } from "react-router-dom";

const AnimatedText = () => {
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const formRef = useRef(null);
  const [mobile, setMobile] = useState("");

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
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
    );
  }, []);
  
  return (
    <div className="w-full bg-[#F4FAF5] min-h-[90vh] flex items-center pt-24 pb-16">
      <div className="max-w-[1240px] mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content Area */}
        <div className="w-full md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left">
          
          {/* Badge */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="text-[#18931D] font-semibold text-sm">Instant Doorstep Pickup</span>
            </div>
            <div className="flex items-center bg-[#E8F5E9] px-4 py-2 rounded-full border border-[#C8E6C9]">
              <span className="text-[#18931D] font-bold text-sm">Certified Green Recycler</span>
            </div>
          </div>
          
          {/* Headline */}
          <h1 ref={h1Ref} className="text-[42px] sm:text-[54px] md:text-[64px] font-extrabold text-[#141414] leading-[1.1] tracking-tight">
            Turn <span className="text-[#18931D]">Waste</span> Into<br/>
            Instant <span className="text-[#18931D]">Cash!</span>
          </h1>
          
          {/* Subheadline */}
          <p ref={pRef} className="text-[18px] text-[#6D6D6D] max-w-[500px] mt-6 font-medium leading-relaxed">
            Join the green revolution today! We make recycling effortless by picking up scrap directly from your home and paying you the best market rates instantly.
          </p>

          {/* Phone Input Form */}
          <div ref={formRef} className="mt-10 w-full max-w-[500px]">
            <p className="text-sm font-bold text-[#141414] mb-3 text-left pl-1">Your mobile number</p>
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-[0px_6px_16px_rgba(0,0,0,0.08)] p-2 border border-gray-100">
              <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
                <span className="text-gray-800 font-bold text-lg">+91</span>
                <input 
                  type="tel" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number" 
                  className="bg-transparent border-none outline-none ml-3 text-lg w-full font-semibold placeholder:text-gray-400 placeholder:font-normal"
                  maxLength={10}
                />
              </div>
              <Link to="/contact" className="w-full sm:w-auto bg-[#18931D] hover:bg-[#15801A] text-white font-bold text-[17px] py-4 px-8 rounded-xl transition-colors text-center whitespace-nowrap">
                Schedule Pickup
              </Link>
            </div>
          </div>

        </div>
        
        {/* Right Image Area */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end mt-12 md:mt-0 relative">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[#D8FACF] rounded-full blur-[80px] -z-10"></div>
            <img 
              src={Lorry} 
              alt="Eco Lorry" 
              className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnimatedText;
