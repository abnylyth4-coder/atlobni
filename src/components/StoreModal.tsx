import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';
import {
  X,
  Star,
  Clock,
  Bike,
  Plus,
  Flame,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const StoreModal: React.FC = () => {
  const {
    selectedStore,
    setSelectedStore,
    setSelectedItem,
    language,
    showToast
  } = useApp();

  const isAr = language === 'ar';
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('all');

  if (!selectedStore) return null;

  // Extract unique categories from store's menu
  const menuCategories = Array.from(new Set(selectedStore.menu.map(m => m.category)));

  const filteredMenuItems = activeMenuCategory === 'all'
    ? selectedStore.menu
    : selectedStore.menu.filter(m => m.category === activeMenuCategory);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(isAr ? 'تم نسخ رابط المتجر بنجاح' : 'Store link copied to clipboard', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Cover Header */}
        <div className="relative h-56 sm:h-72 bg-slate-900 shrink-0">
          <img
            src={selectedStore.image}
            alt={selectedStore.nameAr}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/40" />

          {/* Close & Share buttons */}
          <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => setSelectedStore(null)}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 flex items-center justify-center transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 flex items-center justify-center transition cursor-pointer"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Store Quick Info Over Cover */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedStore.logo}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/80 shadow-lg shrink-0 bg-white"
              />
              <div>
                <h3 className="text-xl sm:text-3xl font-black">
                  {isAr ? selectedStore.nameAr : selectedStore.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-md line-clamp-1 mt-0.5">
                  {isAr ? selectedStore.descriptionAr : selectedStore.descriptionEn}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-bold">
                  <span className="flex items-center gap-1 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-slate-900" />
                    <span>{selectedStore.rating}</span>
                    <span className="opacity-75">({selectedStore.ratingCount})</span>
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedStore.deliveryTime} {isAr ? 'د' : 'min'}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <Bike className="w-3.5 h-3.5" />
                    <span>{selectedStore.deliveryFee} {isAr ? 'ر.س' : 'SAR'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu category navigation bar */}
        <div className="border-b border-slate-200 bg-slate-50 px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveMenuCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeMenuCategory === 'all'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {isAr ? 'كامل القائمة' : 'Full Menu'}
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveMenuCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                activeMenuCategory === cat
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMenuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedItem({ item, store: selectedStore })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItemCard: React.FC<{ item: MenuItem; onSelect: () => void }> = ({ item, onSelect }) => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div
      onClick={onSelect}
      className="p-4 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-md transition bg-white flex items-center justify-between gap-4 cursor-pointer group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition">
            {isAr ? item.nameAr : item.nameEn}
          </h4>
          {item.popular && (
            <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
              <Flame className="w-3 h-3" />
              <span>{isAr ? 'شائع' : 'Hot'}</span>
            </span>
          )}
          {item.spicy && (
            <span className="bg-rose-100 text-rose-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">
              🌶️
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {isAr ? item.descriptionAr : item.descriptionEn}
        </p>

        <div className="flex items-center gap-3">
          <span className="font-black text-sm sm:text-base text-orange-600">
            {item.price} {isAr ? 'ر.س' : 'SAR'}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-slate-400 line-through font-medium">
              {item.originalPrice} {isAr ? 'ر.س' : 'SAR'}
            </span>
          )}
        </div>
      </div>

      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
        <img
          src={item.image}
          alt={item.nameAr}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md hover:bg-orange-700 transition"
          aria-label="Add item"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
