import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Truck, MapPin, Package, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const ParcelCourierModal: React.FC = () => {
  const { isParcelOpen, setIsParcelOpen, language, createOrder, address, showToast } = useApp();
  const isAr = language === 'ar';

  const [pickupAddress, setPickupAddress] = useState(address);
  const [dropoffAddress, setDropoffAddress] = useState('حي النرجس - تقاطع شارع عثمان بن عفان');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('+966 54 876 5432');
  const [parcelType, setParcelType] = useState<'document' | 'box' | 'food' | 'fragile'>('box');
  const [parcelNotes, setParcelNotes] = useState('');

  if (!isParcelOpen) return null;

  const getEstimatedFee = () => {
    switch (parcelType) {
      case 'document':
        return 12;
      case 'box':
        return 18;
      case 'fragile':
        return 22;
      case 'food':
        return 15;
      default:
        return 15;
    }
  };

  const handleCreateParcelOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const fee = getEstimatedFee();

    createOrder({
      storeNameAr: 'خدمة وصلني - توصيل طرد خاص',
      storeNameEn: 'Wasselli Express Parcel Delivery',
      items: [],
      subtotal: fee,
      deliveryFee: 0,
      discount: 0,
      total: fee,
      paymentMethod: 'cash',
      deliveryAddress: dropoffAddress,
      contactPhone: recipientPhone,
      notes: `من: ${pickupAddress} | إلى: ${dropoffAddress} (${recipientName || 'المستلم'}) | نوع الطرد: ${parcelType}. ملاحظات: ${parcelNotes}`,
      type: 'parcel',
    });

    setIsParcelOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-linear-to-r from-indigo-900 to-blue-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg">
                {isAr ? 'خدمة "وصلني" للطرود السريعة' : '"Wasselli" Courier Service'}
              </h3>
              <p className="text-xs text-blue-200 font-medium">
                {isAr ? 'توصيل فوري من الباب إلى الباب في دقائق' : 'Fast door-to-door item pickup & dropoff'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsParcelOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreateParcelOrder} className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Pickup Address */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{isAr ? 'عنوان الاستلام (من أين نستلم؟)' : 'Pickup Address (From)'}</span>
            </label>
            <input
              type="text"
              required
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Dropoff Address */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{isAr ? 'عنوان التسليم (إلى أين نوصل؟)' : 'Drop-off Address (To)'}</span>
            </label>
            <input
              type="text"
              required
              value={dropoffAddress}
              onChange={(e) => setDropoffAddress(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Recipient Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'اسم المستلم' : 'Recipient Name'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'محمد العلي' : 'Recipient Name'}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'رقم هاتف المستلم' : 'Recipient Phone'}
              </label>
              <input
                type="text"
                required
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 font-mono"
              />
            </div>
          </div>

          {/* Parcel Category Chips */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-2">
              {isAr ? 'نوع الطرد المحمول' : 'Package Type'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'document', labelAr: 'مستندات', labelEn: 'Docs', price: 12 },
                { id: 'box', labelAr: 'كرتون/طرد', labelEn: 'Parcel', price: 18 },
                { id: 'fragile', labelAr: 'قابل للكسر', labelEn: 'Fragile', price: 22 },
                { id: 'food', labelAr: 'أطعمة', labelEn: 'Food', price: 15 },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setParcelType(item.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                    parcelType === item.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Package className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                  <span className="block text-[11px] leading-tight">
                    {isAr ? item.labelAr : item.labelEn}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {item.price} {isAr ? 'ر.س' : 'SAR'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isAr ? 'محتويات الطرد وملاحظات السلامة' : 'Package details & instructions'}
            </label>
            <textarea
              value={parcelNotes}
              onChange={(e) => setParcelNotes(e.target.value)}
              placeholder={isAr ? 'مثال: ظرف أوراق رسمية مهمة، الرجاء عدم ثنيه' : 'e.g. envelope with documents, handle with care'}
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-20 resize-none"
            />
          </div>

          {/* Price preview */}
          <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-900 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{isAr ? 'توصيل فوري مؤمن بالكامل' : 'Insured express delivery'}</span>
            </div>
            <div className="text-right rtl:text-left">
              <span className="text-sm font-black text-blue-900">
                {getEstimatedFee()} {isAr ? 'ر.س' : 'SAR'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>{isAr ? 'طلب مندوب استلام فوري' : 'Request Courier Now'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};
