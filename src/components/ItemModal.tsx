import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Check } from 'lucide-react';

export const ItemModal: React.FC = () => {
  const { selectedItem, setSelectedItem, addToCart, language } = useApp();
  const isAr = language === 'ar';

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<
    { groupTitle: string; optionName: string; price: number }[]
  >([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  if (!selectedItem) return null;
  const { item, store } = selectedItem;

  // Handle option select
  const toggleOption = (groupTitle: string, optionName: string, price: number, isRadio: boolean) => {
    setSelectedOptions((prev) => {
      if (isRadio) {
        // Remove existing from this group
        const filtered = prev.filter((o) => o.groupTitle !== groupTitle);
        return [...filtered, { groupTitle, optionName, price }];
      } else {
        const exists = prev.some((o) => o.groupTitle === groupTitle && o.optionName === optionName);
        if (exists) {
          return prev.filter((o) => !(o.groupTitle === groupTitle && o.optionName === optionName));
        } else {
          return [...prev, { groupTitle, optionName, price }];
        }
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const totalItemPrice = (item.price + optionsTotal) * quantity;

  const handleAddToCart = () => {
    // Generate unique ID based on options selected
    const optionsHash = selectedOptions.map((o) => o.optionName).sort().join('-');
    const cartItemId = `${item.id}-${optionsHash || 'base'}`;

    addToCart({
      id: cartItemId,
      menuItem: item,
      quantity,
      selectedOptions,
      specialInstructions,
      storeId: store.id,
      storeNameAr: store.nameAr,
      storeNameEn: store.nameEn,
    });

    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Item Image Header */}
        <div className="relative h-56 bg-slate-100 shrink-0">
          <img src={item.image} alt={item.nameAr} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 left-4 rtl:left-auto rtl:right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 rtl:left-auto rtl:right-4 text-white">
            <h3 className="text-xl font-black">
              {isAr ? item.nameAr : item.nameEn}
            </h3>
            <span className="text-sm font-bold text-amber-300">
              {item.price} {isAr ? 'ر.س' : 'SAR'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            {isAr ? item.descriptionAr : item.descriptionEn}
          </p>

          {/* Options Groups */}
          {item.options &&
            item.options.map((group, gIdx) => (
              <div key={gIdx} className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {isAr ? group.titleAr : group.titleEn}
                  </h4>
                  {group.required && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {isAr ? 'إجباري' : 'Required'}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {group.items.map((opt, oIdx) => {
                    const groupTitle = isAr ? group.titleAr : group.titleEn;
                    const optName = isAr ? opt.nameAr : opt.nameEn;
                    const isChecked = selectedOptions.some(
                      (o) => o.groupTitle === groupTitle && o.optionName === optName
                    );

                    return (
                      <label
                        key={oIdx}
                        onClick={() => toggleOption(groupTitle, optName, opt.price, group.required)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-sm font-semibold cursor-pointer transition ${
                          isChecked
                            ? 'border-orange-500 bg-orange-50/50 text-slate-900'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-${
                              group.required ? 'full' : 'md'
                            } border flex items-center justify-center transition ${
                              isChecked
                                ? 'bg-orange-600 border-orange-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span>{optName}</span>
                        </div>
                        {opt.price > 0 && (
                          <span className="text-xs font-bold text-slate-500">
                            +{opt.price} {isAr ? 'ر.س' : 'SAR'}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

          {/* Special Instructions */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="font-extrabold text-sm text-slate-900 mb-2">
              {isAr ? 'ملاحظات خاصة للطلب' : 'Special Instructions'}
            </h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={isAr ? 'مثال: بدون بصل، صوص إضافي على الجنب...' : 'e.g. no onions, sauce on the side...'}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none h-20"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-black text-sm w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-600/30 flex items-center justify-between transition cursor-pointer"
          >
            <span>{isAr ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
            <span>{totalItemPrice} {isAr ? 'ر.س' : 'SAR'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
