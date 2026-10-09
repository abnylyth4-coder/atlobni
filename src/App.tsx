import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { CategoryId } from './types';
import { Header } from './components/Header';
import { BannerSlider } from './components/BannerSlider';
import { CategoryNav } from './components/CategoryNav';
import { StoreList } from './components/StoreList';
import { StoreModal } from './components/StoreModal';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ParcelCourierModal } from './components/ParcelCourierModal';
import { CustomRequestModal } from './components/CustomRequestModal';
import { LuckyWheelModal } from './components/LuckyWheelModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AddressModal } from './components/AddressModal';
import {
  Bike,
  ShieldCheck,
  Headphones,
  Sparkles,
  Heart,
  Truck,
  Gift,
  ArrowUp
} from 'lucide-react';

export const App: React.FC = () => {
  const {
    language,
    toast,
    setIsParcelOpen,
    setIsCustomOrderOpen,
    setIsLuckyWheelOpen,
  } = useApp();

  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Cairo',_'Plus_Jakarta_Sans',_sans-serif]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-70 px-4 py-2.5 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 animate-fade-in transition">
          <span
            className={`w-2 h-2 rounded-full ${
              toast.type === 'success'
                ? 'bg-emerald-400'
                : toast.type === 'error'
                ? 'bg-rose-400'
                : 'bg-amber-400'
            }`}
          />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main App Navigation */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero & Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        {/* Promotional Banner Carousel */}
        <BannerSlider />

        {/* Quick Service Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <button
            onClick={() => setIsCustomOrderOpen(true)}
            className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition cursor-pointer text-left rtl:text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-black text-sm sm:text-base">
                  {isAr ? 'أطلب أي شيء' : 'Any Request'}
                </span>
                <span className="text-[11px] opacity-90 font-medium">
                  {isAr ? 'مندوب يشتري لك من أي مكان' : 'Personal shopper from any shop'}
                </span>
              </div>
            </div>
            <span className="text-xl">←</span>
          </button>

          <button
            onClick={() => setIsParcelOpen(true)}
            className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition cursor-pointer text-left rtl:text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-black text-sm sm:text-base">
                  {isAr ? 'وصلني - طرود فورية' : 'Wasselli Express'}
                </span>
                <span className="text-[11px] opacity-90 font-medium">
                  {isAr ? 'إرسال واستلام أي شحنة' : 'Send & receive any package'}
                </span>
              </div>
            </div>
            <span className="text-xl">←</span>
          </button>

          <button
            onClick={() => setIsLuckyWheelOpen(true)}
            className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition cursor-pointer text-left rtl:text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <span className="block font-black text-sm sm:text-base">
                  {isAr ? 'هز واربح يومياً' : 'Daily Shake & Win'}
                </span>
                <span className="text-[11px] opacity-90 font-medium">
                  {isAr ? 'خصومات وكوبونات مجانية' : 'Instant vouchers & discounts'}
                </span>
              </div>
            </div>
            <span className="text-xl">←</span>
          </button>
        </div>

        {/* Categories Bar */}
        <CategoryNav
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Stores and Menus Listing */}
        <StoreList
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />

        {/* Features / Value Proposition */}
        <section className="my-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {isAr ? 'لماذا تختار منصة "أطلبني"؟' : 'Why Choose Atlobni?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {isAr
                ? 'خدمة توصيل استثنائية مصممة لتلبية كافة متطلباتك اليومية بسرعة واحترافية'
                : 'Exceptional on-demand services built for fast, transparent daily convenience'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
                <Bike className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                {isAr ? 'توصيل فائق السرعة' : 'Ultra-Fast Delivery'}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr ? 'متوسط سرعة التوصيل 20-30 دقيقة مع تتبع حي ومباشر على الخريطة' : 'Average 20-30m delivery with real-time GPS tracking'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                {isAr ? 'جودة وأمان 100%' : 'Quality & Hygiene'}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr ? 'حقائب حرارية مخصصة لحفظ حرارة الطعام وبرودة المرطبات' : 'Insulated thermal boxes keeping food hot and drinks chilled'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                {isAr ? 'طرق دفع متنوعة' : 'Flexible Payments'}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr ? 'كاش عند الاستلام، المحافظ الإلكترونية، ومدى وفيزا' : 'Cash on delivery, digital wallets, and cards'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                {isAr ? 'خدمة عملاء 24/7' : '24/7 Support'}
              </h4>
              <p className="text-xs text-slate-500">
                {isAr ? 'فريق دعم مباشر جاهز لمساعدتك في أي لحظة' : 'Live support agents available round the clock'}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-white font-['Cairo',sans-serif]">
                  {isAr ? 'أطلبني' : 'Atlobni'}
                </span>
                <p className="text-[11px] text-slate-400">
                  {isAr ? 'منصة التوصيل والخدمات الفورية الأولى' : 'Premier On-Demand Delivery Platform'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <button onClick={() => setIsParcelOpen(true)} className="hover:text-white transition cursor-pointer">
                {isAr ? 'خدمة وصلني' : 'Wasselli Express'}
              </button>
              <button onClick={() => setIsCustomOrderOpen(true)} className="hover:text-white transition cursor-pointer">
                {isAr ? 'أطلب أي شيء' : 'Any Request'}
              </button>
              <button onClick={() => setIsLuckyWheelOpen(true)} className="hover:text-white transition cursor-pointer">
                {isAr ? 'هز واربح' : 'Shake & Win'}
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} {isAr ? 'أطلبني (Atlobni). جميع الحقوق محفوظة.' : 'Atlobni Delivery. All rights reserved.'}
            </p>
            <div className="flex items-center gap-4">
              <span>{isAr ? 'تطبيق الويب الفوري' : 'Fast Web Applet'}</span>
              <span>•</span>
              <button onClick={scrollToTop} className="hover:text-slate-300 flex items-center gap-1 cursor-pointer">
                <span>{isAr ? 'العودة للأعلى' : 'Back to top'}</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for active tracking if order is in progress */}
      {/* Modals & Overlays */}
      <StoreModal />
      <ItemModal />
      <CartDrawer />
      <OrderTrackingModal />
      <ParcelCourierModal />
      <CustomRequestModal />
      <LuckyWheelModal />
      <OrderHistoryModal />
      <AddressModal />
    </div>
  );
};
