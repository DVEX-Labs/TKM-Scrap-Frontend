import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

function Products() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_BASE_URL}/Products`);
      setCards(response.data.carddetails);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      {/* Page Header (compensating for fixed navbar with pt-40) */}
      <div className="w-full bg-white pt-40 pb-20 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-[0.05] blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            TRANSPARENT PRICING
          </h4>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Current Scrap Rates
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            We offer the best market prices for your recyclable materials. Check our rates below and book a free doorstep pickup today.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-[-40px] relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 md:p-10 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">All Categories</h2>
              <p className="text-gray-500 font-medium mt-2">Prices are subject to market fluctuations.</p>
            </div>
            <Link to="/contact" className="bg-[#18931D] hover:bg-[#15801A] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(24,147,29,0.3)] hover:-translate-y-1">
              Book a Pickup Now
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18931D]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.map((card, _id) => (  
                <div key={`${card._id}-${_id}`} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-[0_8px_24px_rgba(24,147,29,0.1)] hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={`${API_BASE_URL}/` + card.Image}
                      alt={card.title || "Scrap Item"}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-sm font-extrabold text-[#18931D] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                      ₹ {card.price} <span className="text-gray-500 text-xs font-medium">/ kg</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-[#18931D] transition-colors">{card.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4 mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-[#E8F5E9] text-[#18931D]">
                        Recyclable
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <Link to="/contact" className="text-sm font-bold text-[#141414] hover:text-[#18931D] inline-flex items-center gap-1.5 transition-colors">
                        Sell this item
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))} 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;