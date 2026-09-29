import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

function Products() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Paper", "Metal", "Plastic", "E-Waste", "Other"];

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

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase());
    // In a real app we'd filter by card.category, but assuming we don't have it, we just show all if matches search
    return matchesSearch;
  });

  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      {/* Page Header */}
      <div className="w-full bg-white pt-40 pb-20 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[#18931D] opacity-[0.05] blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <h4 className="text-[#18931D] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            TRANSPARENT PRICING
          </h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Today's Scrap Rates
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium mb-10">
            We offer the best market prices for your recyclable materials. Check our rates below and book a free doorstep pickup today.
          </p>

          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for items like 'Newspaper' or 'Iron'..."
              className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#18931D]/50 focus:border-[#18931D] sm:text-lg shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-12 relative z-20">
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-10 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === category 
                  ? "bg-[#18931D] text-white shadow-md shadow-green-900/20" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 md:p-10 border border-gray-50">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                {searchTerm ? "Search Results" : `${activeTab} Items`}
              </h2>
              <p className="text-gray-500 font-medium text-sm mt-1">Prices fluctuate based on market conditions.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18931D]"></div>
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500">We couldn't find any items matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card, _id) => (  
                <div key={`${card._id}-${_id}`} className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#18931D]/30 hover:shadow-[0_8px_24px_rgba(24,147,29,0.08)] transition-all duration-300">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={`${API_BASE_URL}/` + card.Image}
                      alt={card.title || "Scrap Item"}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#18931D] transition-colors">{card.title}</h3>
                    <div className="text-[#18931D] font-extrabold text-lg mt-1">
                      ₹{card.price} <span className="text-gray-500 text-xs font-medium">/ kg</span>
                    </div>
                  </div>

                  <Link to="/contact" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#18931D] group-hover:text-white transition-all shrink-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                  </Link>
                </div>
              ))} 
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1">
            Book Free Pickup
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Products;