import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Gift, MapPin, DollarSign, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';

export const CustomRequestModal: React.FC = () => {
  const { isCustomOrderOpen, setIsCustomOrderOpen, language, createOrder, address, showToast } = useApp();
  const isAr = language === 'ar';

  const [requestText, setRequestText] = useState('');
  const [storeSuggestion, setStoreSuggestion] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('50');
  const [deliveryNote, setDeliveryNote] = useState('');

  if (!isCustomOrderOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    const deliveryFee = 15;
    const budget = parseFloat(estimatedBudget) || 50;

    createOrder({
      storeNameAr: 'خدمة "أطلب أي شيء" - مندوب شخصي',
      storeNameEn: 'Personal Shopper Concierge',
      items: [],
      subtotal: budget,
      deliveryFee: deliveryFee,
      discount: 0,
      total: budget + deliveryFee,
      paymentMethod: 'cash',
      deliveryAddress: address,
      notes: `المطلوب: ${requestText} | المتجر المقترح: ${storeSuggestion || 'أي مكان متاح'} | الميزانية المقدرة: ${budget} ر.س | ملاحظات: ${deliveryNote}`,
      type: 'custom',
    });

    setIsCustomOrderOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg">
                {isAr ? 'خدمة "أطلب أي شيء"' : '"Any Request" Concierge'}
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                {isAr ? 'مندوب خاص يشتري لك أي غرض من أي متجر' : 'Your personal shopper buys & brings anything'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomOrderOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1">
              {isAr ? 'ما الذي ترغب أن يشتريه لك المندوب؟' : 'What would you like the driver to purchase?'}
            </label>
            <textarea
              required
              rows={4}
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder={isAr ? 'اكتب بالتفصيل: مثلاً كيكة عيد ميلاد من مخابز فلان، شاحن جوال آيفون من أقرب محل اتصالات...' : 'Describe what you need in detail...'}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'اسم المتجر أو السوق المقترح (اختياري)' : 'Suggested Store / Location (Optional)'}
            </label>
            <input
              type="text"
              value={storeSuggestion}
              onChange={(e) => setStoreSuggestion(e.target.value)}
              placeholder={isAr ? 'مثال: أسواق العثيم فرع الياسمين، أو أقرب صيدلية' : 'e.g. Nearest supermarket or bakery'}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'الميزانية المتوقعة (ر.س)' : 'Estimated Budget (SAR)'}
              </label>
              <input
                type="number"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'رسوم خدمة المندوب' : 'Shopper Fee'}
              </label>
              <div className="w-full text-xs p-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700">
                15 {isAr ? 'ر.س' : 'SAR'}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'ملاحظات وتفضيلات للمندوب' : 'Special Notes for Captain'}
            </label>
            <input
              type="text"
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              placeholder={isAr ? 'يرجى الاتصال بي عند الوصول إلى المحل لتأكيد السعر' : 'Call me from the store to confirm items'}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            💡 {isAr
              ? 'سيتواصل معك الكابتن عبر الدردشة أو الاتصال بالفاتورة الدقيقة للدفع عند الاستلام.'
              : 'The driver will verify the item receipt and confirm the final total with you upon arrival.'}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>{isAr ? 'تأكيد طلب المندوب الشخصي' : 'Confirm Personal Shopper Request'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
