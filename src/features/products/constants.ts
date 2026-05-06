import type { DeliveryInfo, ProductFeature, ProductOffer } from "./types/types";
import type { ProductQueryParams } from "./types";

export const TRENDING_PRODUCTS_PARAMS: ProductQueryParams = {
  sortBy: "popularity",
  pageSize: 6,
  currentPage: 1,
};

export const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=400&q=80";

// Mock data for product detail page (until APIs are available)
export const MOCK_DELIVERY_INFO: DeliveryInfo = {
  estimatedDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  timeSlot: "7 pm - 10 pm",
  location: {
    pinCode: "400001",
    city: "Mumbai",
    state: "Maharashtra",
  },
  charges: 0,
  isFree: true,
};

export const MOCK_PRODUCT_FEATURES: ProductFeature[] = [
  { id: "1", icon: "DeliveryReturn", label: "15-Day Return" },
  { id: "2", icon: "Cash", label: "Cash on Delivery" },
  { id: "3", icon: "ShieldBlockchain", label: "Top Brand" },
];

export const MOCK_PRODUCT_OFFERS: ProductOffer[] = [
  {
    id: "1",
    type: "bank",
    title: "10% Instant Discount on HDFC Bank Credit Card",
    description:
      "Get 10% instant discount on purchases above ₹2,000. Valid on select credit cards only. Maximum discount of ₹500.",
    bankName: "HDFC Bank",
    minPurchase: 2000,
    validUntil: new Date(Date.now() + 30 * 86400000).toISOString(), // 30 days from now
  },
  {
    id: "2",
    type: "coupon",
    title: "Flat ₹100 Off on First Purchase",
    description: "Use code FIRST100 to get ₹100 off on your first order. Minimum purchase of ₹500 required.",
    code: "FIRST100",
    minPurchase: 500,
  },
];
