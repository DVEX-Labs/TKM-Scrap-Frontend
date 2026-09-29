import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
// import { Card } from "antd";

function Products() {
  const [cards, setCards] = useState([]);

  async function fetchProducts() {
    try {
      const response = await axios.post(`${API_BASE_URL}/Products`);
      console.log(response.data);
      setCards(response.data.carddetails);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
 fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Available Items</h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">Browse our latest scrap items ready for pickup and recycling.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cards.map((card, _id)=>(  
          <div key={`${card._id}-${ _id}`} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={`${API_BASE_URL}/` + card.Image}
                alt={card.title || "Product Image"}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#5F8F15] shadow-sm">
                ₹{card.price}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{card.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4 mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  Good
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  Recyclable
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                <a href="#" className="text-sm font-medium text-[#5F8F15] hover:text-[#4A7311] inline-flex items-center gap-1 transition-colors">
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
              </div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
}

export default Products