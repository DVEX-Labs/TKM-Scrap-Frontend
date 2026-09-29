import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lorry from "../assets/Lorry.png";
import GifImage from "../assets/GifImage.gif";
import { Link } from "react-router-dom";

const AnimatedText = () => {
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      h1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      pRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );
    
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
    );
  }, []);
  
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 min-h-[90vh]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-green-200/40 blur-3xl"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-300/30 blur-3xl"></div>
      </div>
      
      <div className="w-full md:w-[60%] flex flex-col items-center md:items-start justify-center gap-6 z-10 text-center md:text-left pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold text-sm shadow-sm border border-green-200">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Top Rated Scrap Collection in Town!
        </div>
        
        <h1 ref={h1Ref} className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Clear Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Scrap,</span><br/>
          Fill Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Wallet!</span>
        </h1>
        
        <p ref={pRef} className="text-lg md:text-xl text-gray-600 max-w-xl font-medium mt-2">
          No more clutter! Schedule a fast, doorstep pickup and get the best value for your recyclables—seamless, secure, and instant payouts.
        </p>

        <div ref={formRef} className="mt-8 flex flex-col sm:flex-row w-full max-w-md gap-3">
          <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1 hover:shadow-xl text-center flex items-center justify-center gap-2">
            Schedule Pickup 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
          <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 rounded-xl font-bold text-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all text-center">
            View Rates
          </Link>
        </div>
        
        <div className="mt-10 flex items-center gap-6">
           <div className="flex -space-x-4">
              <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User"/>
              <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User"/>
              <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" alt="User"/>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">+5k</div>
           </div>
           <div>
             <div className="flex gap-1 text-yellow-400">
               ★ ★ ★ ★ ★
             </div>
             <p className="text-sm font-bold text-gray-700 mt-1">4.8/5 from Happy Customers</p>
           </div>
        </div>
      </div>
      
      <div className="hidden md:flex w-[40%] items-center justify-center relative z-10 mt-16 md:mt-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <img src={GifImage} className="relative z-10 w-full max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500" alt="Recycling animation" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;
