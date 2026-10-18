import { API_BASE_URL } from "../config";

// Elegant SVG fallback illustrations tailored to each scrap category
const CATEGORY_SVGS = {
  Metal: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23E8F5E9"/><circle cx="80" cy="80" r="48" fill="%23C8E6C9"/><path d="M60 55h40v50H60z" fill="none" stroke="%2318931D" stroke-width="4" stroke-linejoin="round"/><path d="M50 70l30-20 30 20v35l-30 20-30-20z" fill="%2318931D" opacity="0.85"/><path d="M70 65l20 30M90 65l-20 30" stroke="%23FFFFFF" stroke-width="3" stroke-linecap="round"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%23157A1A" text-anchor="middle">METAL SCRAP</text></svg>`,
  Plastic: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23E0F2FE"/><circle cx="80" cy="80" r="48" fill="%23BAE6FD"/><path d="M72 45h16v12H72zM65 57h30l6 55a8 8 0 0 1-8 8H67a8 8 0 0 1-8-8z" fill="%230284C7"/><path d="M68 75h24M68 90h24" stroke="%23FFFFFF" stroke-width="3" stroke-linecap="round"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%230369A1" text-anchor="middle">PLASTIC SCRAP</text></svg>`,
  Paper: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23FEF3C7"/><circle cx="80" cy="80" r="48" fill="%23FDE68A"/><rect x="58" y="48" width="44" height="60" rx="4" fill="%23D97706"/><path d="M66 62h28M66 74h28M66 86h18" stroke="%23FFFFFF" stroke-width="3" stroke-linecap="round"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%23B45309" text-anchor="middle">PAPER SCRAP</text></svg>`,
  "Home Appliances": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23F3E8FF"/><circle cx="80" cy="80" r="48" fill="%23E9D5FF"/><rect x="56" y="46" width="48" height="64" rx="6" fill="%237E22CE"/><line x1="56" y1="72" x2="104" y2="72" stroke="%23FFFFFF" stroke-width="2"/><circle cx="64" cy="58" r="2.5" fill="%23FFFFFF"/><circle cx="64" cy="88" r="2.5" fill="%23FFFFFF"/><text x="80" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="%236B21A8" text-anchor="middle">APPLIANCE SCRAP</text></svg>`,
  "E-Waste": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23F1F5F9"/><circle cx="80" cy="80" r="48" fill="%23E2E8F0"/><rect x="52" y="52" width="56" height="40" rx="4" fill="%23334155"/><path d="M74 92h12v12H74zM62 104h36" stroke="%23334155" stroke-width="3" stroke-linecap="round"/><rect x="58" y="58" width="44" height="28" rx="2" fill="%2310B981"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%23334155" text-anchor="middle">E-WASTE</text></svg>`,
  Motors: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23FFE4E6"/><circle cx="80" cy="80" r="48" fill="%23FECDD3"/><circle cx="80" cy="78" r="26" fill="%23E11D48"/><path d="M80 44v8M80 104v8M46 78h8M106 78h8" stroke="%23E11D48" stroke-width="4" stroke-linecap="round"/><circle cx="80" cy="78" r="10" fill="%23FFFFFF"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%23BE123C" text-anchor="middle">MOTOR SCRAP</text></svg>`,
  Vehicles: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23E0E7FF"/><circle cx="80" cy="80" r="48" fill="%23C7D2FE"/><path d="M52 82l8-20h40l8 20z" fill="%234338CA"/><rect x="48" y="82" width="64" height="16" rx="4" fill="%233730A3"/><circle cx="62" cy="100" r="7" fill="%231E1B4B"/><circle cx="98" cy="100" r="7" fill="%231E1B4B"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%233730A3" text-anchor="middle">VEHICLE SCRAP</text></svg>`,
  "Automotive Parts": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23F3F4F6"/><circle cx="80" cy="80" r="48" fill="%23E5E7EB"/><circle cx="80" cy="78" r="28" fill="%234B5563"/><circle cx="80" cy="78" r="14" fill="%239CA3AF"/><circle cx="80" cy="78" r="6" fill="%23FFFFFF"/><text x="80" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="%23374151" text-anchor="middle">AUTO PARTS</text></svg>`,
  "Kitchen Equipments": `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23CCFBF1"/><circle cx="80" cy="80" r="48" fill="%2399F6E4"/><path d="M54 68h52v20a26 26 0 0 1-52 0z" fill="%230F766E"/><rect x="70" y="56" width="20" height="6" rx="2" fill="%230F766E"/><text x="80" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="%23115E59" text-anchor="middle">KITCHEN SCRAP</text></svg>`,
  Others: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160"><rect width="160" height="160" rx="20" fill="%23F4FAF5"/><circle cx="80" cy="80" r="48" fill="%23DCE8DE"/><path d="M80 50l26 44H54z" fill="%2318931D"/><circle cx="80" cy="80" r="6" fill="%23FFFFFF"/><text x="80" y="142" font-family="sans-serif" font-size="12" font-weight="700" fill="%23157A1A" text-anchor="middle">SCRAP ITEM</text></svg>`,
};

/**
 * Resolves product image URL safely regardless of whether it is a:
 * - Base64 Data URL (data:image/...)
 * - Full remote URL (https://...)
 * - Local upload path (uploads/...)
 */
export function getProductImageUrl(imagePath) {
  if (!imagePath || typeof imagePath !== "string") return null;

  const trimmed = imagePath.trim();
  if (!trimmed) return null;

  // Already a full or data URL
  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // Relative path like "uploads/..." or "/uploads/..."
  const cleanPath = trimmed.replace(/^\/+/, "");
  const base = (API_BASE_URL || "").replace(/\/+$/, "");
  return `${base}/${cleanPath}`;
}

/**
 * Returns a high quality SVG illustration tailored to the category
 */
export function getCategoryFallback(category) {
  if (category && CATEGORY_SVGS[category]) {
    return CATEGORY_SVGS[category];
  }
  return CATEGORY_SVGS.Others;
}

/**
 * Image error handler that replaces broken 404 images with a category-specific fallback
 */
export function handleProductImageError(event, category) {
  const fallback = getCategoryFallback(category);
  if (event.currentTarget.src !== fallback) {
    event.currentTarget.onerror = null; // Prevent infinite error loops
    event.currentTarget.src = fallback;
  }
}
