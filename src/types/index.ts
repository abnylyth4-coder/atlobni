export type Language = 'ar' | 'en';

export type CategoryId = 'all' | 'restaurants' | 'groceries' | 'pharmacy' | 'sweets' | 'parcel' | 'custom_order';

export interface Category {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  icon: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface MenuItemOption {
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  options?: {
    titleAr: string;
    titleEn: string;
    required: boolean;
    items: MenuItemOption[];
  }[];
}

export interface Store {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: CategoryId;
  image: string;
  logo: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string; // e.g. "20-30" min
  deliveryFee: number;
  minOrder: number;
  distance: string;
  featured?: boolean;
  discountBadge?: string;
  menu: MenuItem[];
}

export interface CartItem {
  id: string; // item id + chosen options combo
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: { groupTitle: string; optionName: string; price: number }[];
  specialInstructions?: string;
  storeId: string;
  storeNameAr: string;
  storeNameEn: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';

export interface Order {
  id: string;
  storeId?: string;
  storeNameAr: string;
  storeNameEn: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'wallet' | 'card';
  deliveryAddress: string;
  contactPhone: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  type: 'store' | 'parcel' | 'custom';
  driver?: {
    name: string;
    phone: string;
    avatar: string;
    vehicle: string;
    rating: number;
  };
}

export interface Coupon {
  code: string;
  discountPercent: number;
  descriptionAr: string;
  descriptionEn: string;
  minSpend: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'driver' | 'system';
  text: string;
  timestamp: string;
}
