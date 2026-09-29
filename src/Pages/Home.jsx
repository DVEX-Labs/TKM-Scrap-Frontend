import Section1 from "../Components/Section1";
import AnimatedText from "../Components/AnimatedText";
import Plant from "../assets/plant.webp";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full flex flex-col bg-white">
      <AnimatedText />
      
      <div className="container mx-auto py-24 px-6 md:px-12 flex items-center bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16">
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-block px-4 py-2 bg-green-50 text-green-600 rounded-full font-bold text-sm mb-6 border border-green-100">Our Process</div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
              What we do with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Waste</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              After you sell your dry recyclable waste to us, it is collected in ECO SCRAP's facility to be segregated, baled, and safely transported to authorized recyclers. It takes new forms, re-entering the economy and helping us achieve true circularity.
            </p>
            <Link to="/about" className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
              Learn More About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
          <div className="md:w-1/2 relative group">
            <div className="absolute inset-0 bg-green-200 rounded-2xl transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
            <img
              src={Plant}
              alt="What we do with your waste"
              className="w-full max-w-full h-auto rounded-2xl shadow-xl transition-transform duration-500 group-hover:-translate-y-2 object-cover aspect-video md:aspect-square"
            />
          </div>
        </div>
      </div>

      <Section1 />
    </div>
  );
}

export default Home;
