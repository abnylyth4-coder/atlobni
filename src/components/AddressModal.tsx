import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Home, Briefcase, Plus, Check } from 'lucide-react';

export const AddressModal: React.FC = () => {
  const {
    isAddressModalOpen,
    setIsAddressModalOpen,
    address,
    setAddress,
    language,
    showToast
  } = useApp();

  const isAr = language === 'ar';
  const [customInput, setCustomInput] = useState('');

  if (!isAddressModalOpen) return null;

  const savedAddresses = [
    {
      titleAr: 'المنزل',
      titleEn: 'Home',
      desc: 'حي الملقا - شارع أنس بن مالك، الرياض',
      icon: Home,
    },
    {
      titleAr: 'العمل والشركة',
      titleEn: 'Office & Work',
      desc: 'حي العليا - طريق الملك فهد، برج الفيصلية، الرياض',
      icon: Briefcase,
    },
    {
      titleAr: 'بيت العائلة',
      titleEn: 'Family House',
      desc: 'حي النرجس - شارع عثمان بن عفان، الرياض',
      icon: Home,
    },
    {
      titleAr: 'فرع اليمن / صنعاء',
      titleEn: 'Sana\'a Branch',
      desc: 'شارع حدة - أمام مجمع حدة التجاري، صنعاء',
      icon: MapPin,
    },
    {
      titleAr: 'فرع الأردن / عمّان',
      titleEn: 'Amman Branch',
      desc: 'دوار الداخلية - شارع الملكة رانيا، عمّان',
      icon: MapPin,
    }
  ];

  const handleSelect = (addr: string) => {
    setAddress(addr);
    setIsAddressModalOpen(false);
    showToast(isAr ? `تم تحديث عنوان التوصيل إلى: ${addr}` : `Delivery address updated to: ${addr}`, 'success');
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setAddress(customInput.trim());
    setIsAddressModalOpen(false);
    showToast(isAr ? 'تم حفظ العنوان الجديد وتحديده' : 'New address saved and selected', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-black text-lg text-slate-900">
              {isAr ? 'اختر موقع التوصيل' : 'Select Delivery Location'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? 'حدد عنوانك لنعرض لك أقرب المتاجر وأسرع توصيل' : 'Set location for accurate stores and times'}
            </p>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Preset list */}
          <div className="space-y-2">
            {savedAddresses.map((item, idx) => {
              const isSelected = address === item.desc;
              const IconComp = item.icon;

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.desc)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900">
                        {isAr ? item.titleAr : item.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Custom address input */}
          <form onSubmit={handleAddCustom} className="pt-2 border-t border-slate-200 space-y-2">
            <label className="block text-xs font-black text-slate-700">
              {isAr ? 'أو أدخل عنواناً يدوياً جديداً:' : 'Or enter a custom address:'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={isAr ? 'الحي، الشارع، رقم المبنى...' : 'District, Street, Building...'}
                className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                {isAr ? 'حفظ' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
