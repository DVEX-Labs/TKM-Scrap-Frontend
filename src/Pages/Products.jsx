import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";
import PageHero from "../Components/PageHero";
import { PRODUCT_CATEGORY_FILTER_ORDER } from "../constants/productCategories";
import {
  getProductImageUrl,
  getCategoryFallback,
  handleProductImageError,
} from "../utils/productImages";

const PRODUCTS_CACHE_KEY = "tkm_cached_products";

// Baseline scrap rates shown instantly (0-second wait) on first visit
const DEFAULT_BASELINE_PRODUCTS = [
  { _id: "base-1", title: "Iron Scrap (Heavy)", price: 28, category: "Metal", unit: "Kg", Image: "" },
  { _id: "base-2", title: "Aluminium Scrap", price: 160, category: "Metal", unit: "Kg", Image: "" },
  { _id: "base-3", title: "Copper Scrap", price: 720, category: "Metal", unit: "Kg", Image: "" },
  { _id: "base-4", title: "Brass Scrap", price: 420, category: "Metal", unit: "Kg", Image: "" },
  { _id: "base-5", title: "Plastic Scrap", price: 12, category: "Plastic", unit: "Kg", Image: "" },
  { _id: "base-6", title: "Newspaper Scrap", price: 16, category: "Paper", unit: "Kg", Image: "" },
  { _id: "base-7", title: "Cardboard Box Scrap", price: 10, category: "Paper", unit: "Kg", Image: "" },
  { _id: "base-8", title: "Split AC Scrap", price: 2500, category: "Home Appliances", unit: "Pc", Image: "" },
  { _id: "base-9", title: "Single Door Refrigerator", price: 900, category: "Home Appliances", unit: "Pc", Image: "" },
  { _id: "base-10", title: "Washing Machine Scrap", price: 550, category: "Home Appliances", unit: "Pc", Image: "" },
  { _id: "base-11", title: "Lead Acid Battery", price: 85, category: "E-Waste", unit: "Kg", Image: "" },
  { _id: "base-12", title: "Steel Scraps", price: 40, category: "Metal", unit: "Kg", Image: "" },
];

const CATEGORY_RULES = [
  { category: "Paper", keywords: ["paper", "newspaper", "cardboard", "book", "magazine"] },
  { category: "Metal", keywords: ["metal", "iron", "steel", "copper", "aluminum", "aluminium", "brass", "tin"] },
  { category: "Plastic", keywords: ["plastic", "pet", "pvc", "drum", "bottle", "pipe"] },
  { category: "Home Appliances", keywords: ["ac", "air conditioner", "fridge", "refrigerator", "washing", "cooler", "fan", "geyser", "microwave"] },
  { category: "E-Waste", keywords: ["e-waste", "ewaste", "electronic", "computer", "laptop", "mobile", "phone", "tv", "television", "battery"] },
  { category: "Motors", keywords: ["motor", "engine"] },
  { category: "Vehicles", keywords: ["vehicle", "car", "bike", "scooter", "auto"] },
  { category: "Automotive Parts", keywords: ["automotive", "tyre", "tire", "rim", "spare"] },
  { category: "Kitchen Equipments", keywords: ["kitchen", "utensil", "vessel", "pan", "pot"] },
];

function inferCategory(title = "") {
  const normalized = title.toLowerCase();
  const match = CATEGORY_RULES.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  );
  return match?.category ?? "Others";
}

function formatPriceUnit(title = "") {
  const normalized = title.toLowerCase();
  if (/(ac|drum|bottle|pc|piece|unit|fan|cooler|fridge|refrigerator|tv|phone|laptop)/.test(normalized)) {
    return "Pc";
  }
  return "Kg";
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse shadow-sm"
        >
          <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="p-3.5 space-y-2">
            <div className="h-2.5 w-16 bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-8 w-full bg-gray-100 rounded-full mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BookFreePickupButton() {
  return (
    <div className="mt-10 text-center">
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 bg-[#18931D] hover:bg-[#15801A] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md shadow-green-900/20 hover:-translate-y-1"
      >
        Book Free Pickup
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

function Products() {
  // Stale-While-Revalidate: load immediately from localStorage or default baseline
  const [cards, setCards] = useState(() => {
    try {
      const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore storage error
    }
    return DEFAULT_BASELINE_PRODUCTS;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = PRODUCT_CATEGORY_FILTER_ORDER;

  // Background fetch to sync latest live rates from MongoDB
  const syncProductsFromBackend = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Products`, {
        timeout: 35000,
      });
      const list = response.data?.carddetails;
      if (Array.isArray(list) && list.length > 0) {
        setCards(list);
        try {
          localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(list));
        } catch {
          // ignore storage quota error
        }
      }
    } catch (error) {
      console.warn("Live rates sync check:", error.message);
    }
  };

  useEffect(() => {
    syncProductsFromBackend();
  }, []);

  const cardsWithCategory = useMemo(
    () =>
      cards.map((card) => ({
        ...card,
        category: card.category || inferCategory(card.title),
        unit: formatPriceUnit(card.title),
      })),
    [cards]
  );

  const categoryCounts = useMemo(() => {
    const counts = { All: cardsWithCategory.length };
    cardsWithCategory.forEach((card) => {
      counts[card.category] = (counts[card.category] || 0) + 1;
    });
    return counts;
  }, [cardsWithCategory]);

  const filteredCards = cardsWithCategory.filter((card) => {
    const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "All" || card.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const hasFilteredResults = filteredCards.length > 0;

  return (
    <div className="w-full bg-[#F9FBF9] min-h-screen pb-24">
      {/* Permanent PageHero with search bar — zero layout shift */}
      <PageHero
        compact
        eyebrow="Transparent Pricing"
        title="Today's Scrap Rates"
        description="We offer the best market prices for your recyclable materials. Check our rates below and book a free doorstep pickup today."
      >
        <div className="max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for items like 'Newspaper' or 'Iron'..."
            className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#18931D]/40 focus:border-[#18931D] text-base shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </PageHero>

      <div className="max-w-[1240px] mx-auto px-6 relative z-20 mt-6">
        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <>
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-1">
              {categories.map((category) => {
                const count = categoryCounts[category] ?? 0;
                if (category !== "All" && count === 0) return null;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                      activeTab === category
                        ? "bg-[#0F172A] text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                    {count > 0 ? ` (${count})` : ""}
                  </button>
                );
              })}
            </div>

            {!hasFilteredResults ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-gray-800 font-semibold text-sm mb-1">No items match your filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTab("All");
                  }}
                  className="text-sm font-semibold text-[#18931D] hover:underline cursor-pointer"
                >
                  Reset search & filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredCards.map((card, index) => {
                  const resolvedImage = getProductImageUrl(card.Image) || getCategoryFallback(card.category);
                  return (
                    <div
                      key={`${card._id}-${index}`}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col"
                    >
                      <div className="aspect-square bg-[#F3F4F6] p-4 flex items-center justify-center overflow-hidden">
                        <img
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          src={resolvedImage}
                          alt={card.title || "Scrap Item"}
                          loading="lazy"
                          onError={(e) => handleProductImageError(e, card.category)}
                        />
                      </div>

                      <div className="p-3.5 flex flex-col flex-1 justify-between">
                        <div>
                          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-1">
                            {card.category}
                          </p>
                          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem]">
                            {card.title}
                          </h3>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <p className="text-[#18931D] font-bold text-sm">
                            ₹{card.price}
                            <span className="text-gray-500 font-medium text-xs">/{card.unit}</span>
                          </p>
                          <Link
                            to="/contact"
                            state={{ message: `I would like to sell ${card.title} at the listed rate of ₹${card.price}/${card.unit}. Please contact me to arrange a pickup.` }}
                            className="inline-flex items-center gap-1 bg-[#18931D] hover:bg-[#15801A] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0"
                          >
                            Sell
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <BookFreePickupButton />
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
