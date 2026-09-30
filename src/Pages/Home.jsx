import Section1 from "../Components/Section1";
import AnimatedText from "../Components/AnimatedText";
import Plant from "../assets/plant.webp";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full flex flex-col bg-white">
      <AnimatedText />
      
      <div className="w-full bg-[#F9FBF9] py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
              WHY TKM SCRAPS
            </h4>
            <h2 className="text-[36px] md:text-[48px] font-extrabold text-[#141414] leading-tight mb-6">
              Why choose <span className="text-[#18931D]">TKM Scraps?</span>
            </h2>
            <p className="text-[18px] text-[#6D6D6D] leading-relaxed">
              Choosing TKM SCRAPS means prioritizing environmental responsibility while enjoying a seamless and profitable experience. Our innovative platform minimizes waste and rewards you for it.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#141414] mb-3">Smart & Easy Booking</h3>
              <p className="text-[#6D6D6D] leading-relaxed text-sm">
                Schedule your scrap pickup in just a few taps from your phone. No phone calls, no waiting, no hassle.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#141414] mb-3">Instant Cash Payments</h3>
              <p className="text-[#6D6D6D] leading-relaxed text-sm">
                Get paid immediately at the time of pickup. We offer the most competitive market rates for all your recyclables.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#141414] mb-3">100% Eco-Friendly</h3>
              <p className="text-[#6D6D6D] leading-relaxed text-sm">
                Rest assured your scrap is sent to certified processing units, actively reducing landfill waste and pollution.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#141414] mb-3">Free Doorstep Pickup</h3>
              <p className="text-[#6D6D6D] leading-relaxed text-sm">
                Choose a time that works for you. Our verified executives will come directly to your location for collection.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#141414] mb-3">Accurate Digital Weighing</h3>
              <p className="text-[#6D6D6D] leading-relaxed text-sm">
                We use calibrated digital scales in front of you. Absolute transparency with zero hidden fees or surprises.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(24,147,29,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#18931D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#141414] mb-3">Dedicated Support</h3>
              <p className="text-[#6D6D6D] leading-relaxed text-sm">
                Have a query? Our friendly customer support team is always available to help you with bookings and rates.
              </p>
            </div>

          </div>
        </div>
      </div>

      <Section1 />
    </div>
  );
}

export default Home;
