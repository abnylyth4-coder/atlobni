import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, Language, Coupon, Store, MenuItem } from '../types';
import { AVAILABLE_COUPONS, INITIAL_ORDERS, MOCK_STORES } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, change: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartDiscount: number;
  cartTotal: number;
  cartItemCount: number;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  orders: Order[];
  createOrder: (order: Partial<Order>) => Order;
  address: string;
  setAddress: (addr: string) => void;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  wonCoupons: Coupon[];
  addWonCoupon: (coupon: Coupon) => void;
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  selectedItem: { item: MenuItem; store: Store } | null;
  setSelectedItem: (val: { item: MenuItem; store: Store } | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isOrdersHistoryOpen: boolean;
  setIsOrdersHistoryOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isParcelOpen: boolean;
  setIsParcelOpen: (open: boolean) => void;
  isCustomOrderOpen: boolean;
  setIsCustomOrderOpen: (open: boolean) => void;
  isLuckyWheelOpen: boolean;
  setIsLuckyWheelOpen: (open: boolean) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [address, setAddress] = useState<string>('حي الملقا - شارع أنس بن مالك، الرياض');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wonCoupons, setWonCoupons] = useState<Coupon[]>([AVAILABLE_COUPONS[0]]);
  const [toast, setToast] = useState<Toast | null>(null);

  // Modals state
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ item: MenuItem; store: Store } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isParcelOpen, setIsParcelOpen] = useState<boolean>(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState<boolean>(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 3500);
  };

  const addToCart = (newItem: CartItem) => {
    // If cart has items from another store, prompt replacement or allow
    if (cart.length > 0 && cart[0].storeId !== newItem.storeId) {
      if (
        !window.confirm(
          language === 'ar'
            ? 'سلتك تحتوي على عناصر من متجر آخر. هل تريد إفراغ السلة وبدء طلب جديد؟'
            : 'Your cart contains items from another store. Replace cart with items from this store?'
        )
      ) {
        return;
      }
      setCart([newItem]);
      showToast(
        language === 'ar' ? 'تم تحديث السلة بنجاح' : 'Cart updated with new store items',
        'success'
      );
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(
      language === 'ar'
        ? `تمت إضافة "${newItem.menuItem.nameAr}" إلى السلة`
        : `Added "${newItem.menuItem.nameEn}" to cart`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, change: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const optionsTotal = item.selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
    return sum + (item.menuItem.price + optionsTotal) * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Delivery fee logic from current store
  const currentStore = cart.length > 0 ? MOCK_STORES.find(s => s.id === cart[0].storeId) : null;
  const cartDeliveryFee = cart.length > 0 ? (currentStore?.deliveryFee ?? 5) : 0;

  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const cartTotal = Math.max(0, cartSubtotal + cartDeliveryFee - cartDiscount);

  const applyCouponCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    const coupon = [...AVAILABLE_COUPONS, ...wonCoupons].find(c => c.code === clean);

    if (!coupon) {
      return {
        success: false,
        message: language === 'ar' ? 'رمز الكوبون غير صحيح' : 'Invalid promo code',
      };
    }

    if (cartSubtotal < coupon.minSpend) {
      return {
        success: false,
        message:
          language === 'ar'
            ? `الحد الأدنى لتطبيق هذا الكوبون هو ${coupon.minSpend} ر.س`
            : `Minimum order value for this coupon is SAR ${coupon.minSpend}`,
      };
    }

    setAppliedCoupon(coupon);
    return {
      success: true,
      message:
        language === 'ar'
          ? `تم تطبيق الكوبون! وفرت ${coupon.discountPercent}%`
          : `Promo applied! You saved ${coupon.discountPercent}%`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addWonCoupon = (coupon: Coupon) => {
    if (!wonCoupons.some(c => c.code === coupon.code)) {
      setWonCoupons(prev => [coupon, ...prev]);
    }
  };

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: `ATL-${Math.floor(10000 + Math.random() * 90000)}`,
      storeId: orderData.storeId,
      storeNameAr: orderData.storeNameAr || 'طلب خاص',
      storeNameEn: orderData.storeNameEn || 'Special Request',
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      deliveryFee: orderData.deliveryFee || 5,
      discount: orderData.discount || 0,
      total: orderData.total || 0,
      paymentMethod: orderData.paymentMethod || 'cash',
      deliveryAddress: orderData.deliveryAddress || address,
      contactPhone: orderData.contactPhone || '+966 50 000 0000',
      notes: orderData.notes,
      status: 'confirmed',
      createdAt: language === 'ar' ? 'الآن' : 'Just now',
      estimatedDeliveryTime: '25-35 دقيقة',
      type: orderData.type || 'store',
      driver: {
        name: language === 'ar' ? 'كابتن فيصل المنصور' : 'Captain Faisal Al-Mansour',
        phone: '+966 55 432 1098',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        vehicle: 'سكوتر ياماها إكس ماكس (أسود)',
        rating: 4.9,
      },
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCartOpen(false);
    setIsTrackingOpen(true);
    showToast(
      language === 'ar'
        ? `تم إرسال طلبك بنجاح! رقم الطلب #${newOrder.id}`
        : `Order placed successfully! Order #${newOrder.id}`,
      'success'
    );

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDeliveryFee,
        cartDiscount,
        cartTotal,
        cartItemCount,
        activeOrder,
        setActiveOrder,
        orders,
        createOrder,
        address,
        setAddress,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        wonCoupons,
        addWonCoupon,
        toast,
        showToast,
        selectedStore,
        setSelectedStore,
        selectedItem,
        setSelectedItem,
        isCartOpen,
        setIsCartOpen,
        isOrdersHistoryOpen,
        setIsOrdersHistoryOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isParcelOpen,
        setIsParcelOpen,
        isCustomOrderOpen,
        setIsCustomOrderOpen,
        isLuckyWheelOpen,
        setIsLuckyWheelOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
