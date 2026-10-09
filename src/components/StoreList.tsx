import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_STORES } from '../data/mockData';
import { Store, CategoryId } from '../types';
import { Star, Clock, Bike, ShieldCheck, Flame } from 'lucide-react';

interface StoreListProps {
  activeCategory: CategoryId;
  searchQuery: string;
}

export const StoreList: React.FC<StoreListProps> = ({ activeCategory, searchQuery }) => {
  const { language, setSelectedStore } = useApp();
  const isAr = language === 'ar';

  const [activeFilter, setActiveFilter] = useState<'all' | 'top' | 'fast' | 'free'>('all');

  const filteredStores = MOCK_STORES.filter((store) => {
    // Category filter
    if (activeCategory !== 'all' && store.category !== activeCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName =
        store.nameAr.toLowerCase().includes(q) ||
        store.nameEn.toLowerCase().includes(q) ||
        store.descriptionAr.toLowerCase().includes(q) ||
        store.descriptionEn.toLowerCase().includes(q);

      const matchMenu = store.menu.some(
        (item) =>
          item.nameAr.toLowerCase().includes(q) ||
          item.nameEn.toLowerCase().includes(q) ||
          item.descriptionAr.toLowerCase().includes(q) ||
          item.descriptionEn.toLowerCase().includes(q)
      );

      if (!matchName && !matchMenu) return false;
    }

    // Secondary filters
    if (activeFilter === 'top' && store.rating < 4.8) return false;
    if (activeFilter === 'free' && store.deliveryFee > 3) return false;
    if (activeFilter === 'fast') {
      const minTime = parseInt(store.deliveryTime.split('-')[0], 10);
      if (minTime > 20) return false;
    }

    return true;
  });

  return (
    <div className="my-8">
      {/* Header and Filter chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{isAr ? 'المتاجر والمطاعم المتاحة' : 'Available Stores & Restaurants'}</span>
            <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
              {filteredStores.length}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isAr ? 'توصيل مباشر من أرقى المتاجر القريبة منك' : 'Direct delivery from top nearby merchants'}
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setActiveFilter('top')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1 ${
              activeFilter === 'top'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{isAr ? 'الأعلى تقييماً' : 'Top Rated'}</span>
          </button>
          <button
            onClick={() => setActiveFilter('fast')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1 ${
              activeFilter === 'fast'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{isAr ? 'أسرع توصيل (أقل من 20 د)' : 'Fastest (<20m)'}</span>
          </button>
          <button
            onClick={() => setActiveFilter('free')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1 ${
              activeFilter === 'free'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bike className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isAr ? 'رسوم توصيل مخفضة' : 'Low Delivery Fee'}</span>
          </button>
        </div>
      </div>

      {filteredStores.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 my-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <Flame className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-1">
            {isAr ? 'لم نعثر على متاجر مطابقة' : 'No matching stores found'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-4">
            {isAr ? 'جرب البحث بكلمة مختلفة أو اختر تصنيفاً آخر لتصفح المتاجر' : 'Try a different search query or select another category'}
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
            }}
            className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl text-xs hover:bg-orange-700 transition"
          >
            {isAr ? 'عرض جميع المتاجر' : 'Show all stores'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} onSelect={() => setSelectedStore(store)} />
          ))}
        </div>
      )}
    </div>
  );
};

const StoreCard: React.FC<{ store: Store; onSelect: () => void }> = ({ store, onSelect }) => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Cover Photo */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={store.image}
            alt={store.nameAr}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

          {/* Discount Badge */}
          {store.discountBadge && (
            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-rose-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>{store.discountBadge}</span>
            </div>
          )}

          {/* Delivery Time Badge */}
          <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-white/20">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{store.deliveryTime} {isAr ? 'دقيقة' : 'mins'}</span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{store.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({store.ratingCount})</span>
          </div>
        </div>

        {/* Store Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition">
                {isAr ? store.nameAr : store.nameEn}
              </h4>
              <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                {isAr ? store.descriptionAr : store.descriptionEn}
              </p>
            </div>
            <img
              src={store.logo}
              alt=""
              className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
            />
          </div>

          {/* Delivery Details */}
          <div className="flex items-center gap-4 text-xs text-slate-600 font-medium pt-3 mt-3 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <Bike className="w-3.5 h-3.5 text-orange-500" />
              <span>
                {isAr ? 'التوصيل:' : 'Delivery:'} {store.deliveryFee} {isAr ? 'ر.س' : 'SAR'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {isAr ? 'أدنى طلب:' : 'Min:'} {store.minOrder} {isAr ? 'ر.س' : 'SAR'}
              </span>
            </div>
            <div className="text-slate-400 mr-auto rtl:mr-0 rtl:ml-auto">
              {store.distance}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Items Teaser */}
      <div className="px-5 pb-5 pt-0">
        <div className="bg-slate-50 rounded-2xl p-2.5 flex items-center justify-between text-xs border border-slate-100 group-hover:border-orange-100 transition">
          <span className="text-slate-500 font-medium">
            {isAr ? 'الأكثر طلباً:' : 'Popular:'} {isAr ? store.menu[0]?.nameAr : store.menu[0]?.nameEn}
          </span>
          <span className="font-extrabold text-orange-600">
            {store.menu[0]?.price} {isAr ? 'ر.س' : 'SAR'}
          </span>
        </div>
      </div>
    </div>
  );
};
