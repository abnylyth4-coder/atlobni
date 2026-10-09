import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Globe,
  ShoppingBag,
  Sparkles,
  ClipboardList,
  ChevronDown,
  Bike
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const {
    language,
    toggleLanguage,
    address,
    cartItemCount,
    cartSubtotal,
    setIsCartOpen,
    setIsOrdersHistoryOpen,
    setIsLuckyWheelOpen,
    setIsAddressModalOpen,
    activeOrder,
    setIsTrackingOpen
  } = useApp();

  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro bar for active order notification if in progress */}
      {activeOrder && activeOrder.status !== 'delivered' && (
        <div className="bg-linear-to-r from-orange-600 to-amber-600 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">
                {isAr ? 'طلبك قيد التوصيل الآن!' : 'Your order is on the way!'}
              </span>
              <span className="hidden sm:inline opacity-90">
                ({activeOrder.storeNameAr || activeOrder.storeNameEn} - #{activeOrder.id})
              </span>
            </div>
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white font-bold px-2.5 py-0.5 rounded-full text-xs transition flex items-center gap-1 cursor-pointer"
            >
              <span>{isAr ? 'تتبع فوري' : 'Live Track'}</span>
              <Bike className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-linear-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              <Bike className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-['Cairo',sans-serif]">
                  {isAr ? 'أطلبني' : 'Atlobni'}
                </span>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                  {isAr ? 'توصيل فوري' : 'FAST'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {isAr ? 'أسرع تطبيق توصيل وخدمات' : 'Instant delivery & requests'}
              </p>
            </div>
          </div>

          {/* Delivery Location Selector */}
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 transition max-w-xs text-left cursor-pointer border border-slate-200"
            title={address}
          >
            <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                <span>{isAr ? 'التوصيل إلى' : 'Deliver to'}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
              <div className="text-xs font-bold text-slate-800 truncate">
                {address}
              </div>
            </div>
          </button>

          {/* Search Box */}
          <div className="flex-1 max-w-md mx-2 hidden lg:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث عن مطعم، صيدلية، بقالة أو وجبة...' : 'Search restaurants, groceries, meals...'}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 rtl:left-auto rtl:right-auto rtl:left-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Shake & Win Button */}
            <button
              onClick={() => setIsLuckyWheelOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">{isAr ? 'هز واربح' : 'Shake & Win'}</span>
            </button>

            {/* Orders History Button */}
            <button
              onClick={() => setIsOrdersHistoryOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer flex items-center gap-1.5"
              title={isAr ? 'طلباتي' : 'My Orders'}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs font-bold hidden md:inline">
                {isAr ? 'طلباتي' : 'Orders'}
              </span>
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition cursor-pointer"
              title="Change Language / تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm shadow-orange-600/30 transition cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-orange-600">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-right rtl:text-left">
                <span className="block text-[10px] opacity-80">{isAr ? 'السلة' : 'Cart'}</span>
                <span className="font-extrabold">{cartSubtotal} {isAr ? 'ر.س' : 'SAR'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 lg:hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن مطعم، صيدلية، بقالة أو وجبة...' : 'Search restaurants, groceries, meals...'}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
          />
        </div>
      </div>
    </header>
  );
};
