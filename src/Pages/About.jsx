import { Link } from "react-router-dom";

function About() {
  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      {/* Page Header */}
      <div className="w-full bg-white pt-40 pb-20 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-[0.05] blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            OUR STORY
          </h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About Eco Scrap
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Transforming waste into value, one pickup at a time. We're on a mission to make scrap collection seamless, rewarding, and eco-friendly.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-16 md:mt-24 space-y-24">
        
        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Our <span className="text-[#18931D]">Mission</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
              At Eco Scrap (TKM Shop), we're revolutionizing the way households and businesses manage their waste. Our mission is to make scrap collection highly convenient, entirely transparent, and financially rewarding while actively contributing to a sustainable future.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              We started with a vision to bring predictability to the unorganized scrap sector. With us, you get upfront market rates, verified digital weighing, scheduled doorstep pickups, and instant payouts. Every piece of scrap you recycle through us helps reduce landfill waste and promotes a circular economy.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#18931D] rounded-3xl translate-x-4 translate-y-4 opacity-10"></div>
            <img
              className="w-full h-[400px] object-cover rounded-3xl shadow-xl relative z-10"
              src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=2070&auto=format&fit=crop"
              alt="Recycling Process"
            />
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-gray-500 font-medium mb-12">Making a measurable difference in our community</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-5xl font-black text-[#18931D] mb-4">50k+</div>
              <div className="text-lg font-bold text-gray-900">Happy Customers</div>
            </div>
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-100">
              <div className="text-5xl font-black text-[#18931D] mb-4">500+</div>
              <div className="text-lg font-bold text-gray-900">Tons Recycled</div>
            </div>
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-100">
              <div className="text-5xl font-black text-[#18931D] mb-4">4.8 ★</div>
              <div className="text-lg font-bold text-gray-900">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-500 font-medium">What drives us every single day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Sustainability", desc: "Creating a greener future by promoting responsible waste management.", icon: "🌱" },
              { title: "Transparency", desc: "Fair pricing and honest digital weighing are at the heart of our service.", icon: "⚖️" },
              { title: "Convenience", desc: "We bring scrap collection to your doorstep, making it completely hassle-free.", icon: "🚛" },
              { title: "Customer First", desc: "Your satisfaction is our priority with quick responses and instant payouts.", icon: "🤝" }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-[#0F172A] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#18931D] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#18931D] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
          <h2 className="text-3xl font-extrabold text-white mb-4 relative z-10">How Eco Scrap Works</h2>
          <p className="text-slate-400 font-medium mb-16 relative z-10">Simple, fast, and highly rewarding</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#18931D] flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-green-900/50">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Book Pickup</h3>
              <p className="text-slate-400 font-medium">Schedule a pickup through our website at your convenience.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#18931D] flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-green-900/50">2</div>
              <h3 className="text-xl font-bold text-white mb-3">We Collect</h3>
              <p className="text-slate-400 font-medium">Our team arrives, digitally weighs your scrap, and provides exact quotes.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#18931D] flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg shadow-green-900/50">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Get Paid</h3>
              <p className="text-slate-400 font-medium">Receive instant cash or digital payment right at your doorstep.</p>
            </div>
          </div>
          
          <div className="mt-16 relative z-10">
            <Link to="/pickup" className="inline-block bg-[#18931D] hover:bg-[#15801A] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(24,147,29,0.3)] hover:-translate-y-1">
              Book a Pickup Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
