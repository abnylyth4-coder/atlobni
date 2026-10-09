import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';
import {
  Sparkles,
  UtensilsCrossed,
  ShoppingBag,
  Coffee,
  HeartPulse,
  Truck,
  Gift
} from 'lucide-react';

interface CategoryNavProps {
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const { language, setIsParcelOpen, setIsCustomOrderOpen } = useApp();
  const isAr = language === 'ar';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'Gift':
        return <Gift className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleCategoryClick = (id: CategoryId) => {
    if (id === 'parcel') {
      setIsParcelOpen(true);
      return;
    }
    if (id === 'custom_order') {
      setIsCustomOrderOpen(true);
      return;
    }
    setActiveCategory(id);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isAr ? 'الأقسام والخدمات' : 'Categories & Services'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isAr ? 'اختر ما تحتاجه وسيتولى كباتن أطلبني الباقي' : 'Select what you need, Atlobni captains deliver the rest'}
          </p>
        </div>
      </div>

      {/* Grid of service cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const isSpecialAction = cat.id === 'parcel' || cat.id === 'custom_order';

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer group ${
                isSelected && !isSpecialAction
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20 scale-[1.02]'
                  : isSpecialAction
                  ? 'bg-linear-to-b from-amber-50/80 to-orange-50/50 hover:bg-orange-100/60 text-slate-800 border-orange-200/80 hover:border-orange-300'
                  : 'bg-white hover:bg-slate-50/90 text-slate-700 border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              {(cat.badgeAr || cat.badgeEn) && (
                <span
                  className={`absolute -top-2.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase ${
                    isSelected && !isSpecialAction
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'bg-orange-500 text-white shadow-xs'
                  }`}
                >
                  {isAr ? cat.badgeAr : cat.badgeEn}
                </span>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                  isSelected && !isSpecialAction
                    ? 'bg-white/20 text-white'
                    : isSpecialAction
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-orange-50 text-orange-600'
                }`}
              >
                {getIcon(cat.icon)}
              </div>

              <span className="text-xs sm:text-sm font-extrabold line-clamp-1">
                {isAr ? cat.nameAr : cat.nameEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
