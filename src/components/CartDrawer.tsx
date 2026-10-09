import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  CreditCard,
  Wallet,
  Banknote,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    address,
    setIsAddressModalOpen,
    createOrder,
    language,
    showToast
  } = useApp();

  const isAr = language === 'ar';
  const [couponInput, setCouponInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'wallet' | 'card'>('cash');
  const [phoneNumber, setPhoneNumber] = useState('+966 50 123 4567');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) setCouponInput('');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        storeId: cart[0].storeId,
        storeNameAr: cart[0].storeNameAr,
        storeNameEn: cart[0].storeNameEn,
        items: cart,
        subtotal: cartSubtotal,
        deliveryFee: cartDeliveryFee,
        discount: cartDiscount,
        total: cartTotal,
        paymentMethod,
        deliveryAddress: address,
        contactPhone: phoneNumber,
        notes: orderNotes,
        type: 'store',
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden relative">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {isAr ? 'سلة الطلبات' : 'Your Basket'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {cart.length > 0 ? (isAr ? cart[0].storeNameAr : cart[0].storeNameEn) : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1">
              {isAr ? 'سلتك فارغة حالياً' : 'Your cart is empty'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              {isAr ? 'استكشف المتاجر والمطاعم وأضف ما يحلو لك لتوصيله فوراً' : 'Browse our stores and menus to add delicious items'}
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition"
            >
              {isAr ? 'تصفح المطاعم' : 'Explore Stores'}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Items List */}
            <div className="space-y-3">
              {cart.map((item) => {
                const optionsTotal = item.selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
                const lineTotal = (item.menuItem.price + optionsTotal) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.menuItem.image}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="font-extrabold text-xs text-slate-900 truncate">
                        {isAr ? item.menuItem.nameAr : item.menuItem.nameEn}
                      </h5>

                      {item.selectedOptions.length > 0 && (
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">
                          {item.selectedOptions.map((o) => o.optionName).join(', ')}
                        </p>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[10px] text-amber-700 italic truncate">
                          "{item.specialInstructions}"
                        </p>
                      )}

                      <span className="font-extrabold text-xs text-orange-600 mt-1 block">
                        {lineTotal} {isAr ? 'ر.س' : 'SAR'}
                      </span>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-lg text-rose-500 hover:bg-rose-50 flex items-center justify-center transition ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Location Section */}
            <div className="p-3.5 bg-orange-50/60 rounded-2xl border border-orange-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>{isAr ? 'عنوان التوصيل' : 'Delivery Address'}</span>
                </span>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-[11px] font-extrabold text-orange-700 hover:underline"
                >
                  {isAr ? 'تغيير' : 'Change'}
                </button>
              </div>
              <p className="text-xs text-slate-700 font-medium truncate">{address}</p>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'رقم هاتف التواصل' : 'Contact Phone'}
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono"
              />
            </div>

            {/* Coupon Code Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-orange-500" />
                  <span>{isAr ? 'كود الخصم (كوبون)' : 'Promo Code'}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {isAr ? 'جرب ATLOBNI20' : 'Try ATLOBNI20'}
                </span>
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">{appliedCoupon.code}</span>
                    <span className="text-[11px]">({appliedCoupon.discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline text-[11px]"
                  >
                    {isAr ? 'إزالة' : 'Remove'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder={isAr ? 'أدخل كود الخصم...' : 'Enter promo code...'}
                    className="flex-1 text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
                  >
                    {isAr ? 'تطبيق' : 'Apply'}
                  </button>
                </form>
              )}
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isAr ? 'طريقة الدفع' : 'Payment Method'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition ${
                    paymentMethod === 'cash'
                      ? 'border-orange-600 bg-orange-50/50 text-orange-950 font-extrabold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] leading-tight">
                    {isAr ? 'عند الاستلام' : 'Cash'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition ${
                    paymentMethod === 'wallet'
                      ? 'border-orange-600 bg-orange-50/50 text-orange-950 font-extrabold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Wallet className="w-4 h-4 text-blue-600" />
                  <span className="text-[11px] leading-tight">
                    {isAr ? 'المحفظة' : 'Wallet / STC'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition ${
                    paymentMethod === 'card'
                      ? 'border-orange-600 bg-orange-50/50 text-orange-950 font-extrabold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span className="text-[11px] leading-tight">
                    {isAr ? 'مدى / بطاقة' : 'Card / Apple'}
                  </span>
                </button>
              </div>
            </div>

            {/* Note to Captain */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isAr ? 'ملاحظة للمندوب' : 'Note to Driver'}
              </label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder={isAr ? 'مثال: الشقة في الدور الثاني، اترك الطلب عند الباب' : 'e.g. 2nd floor, ring the doorbell'}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        )}

        {/* Footer Breakdown & Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span>{cartSubtotal} {isAr ? 'ر.س' : 'SAR'}</span>
              </div>
              <div className="flex justify-between">
                <span>{isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
                <span>{cartDeliveryFee} {isAr ? 'ر.س' : 'SAR'}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>{isAr ? 'خصم الكوبون' : 'Promo Discount'}</span>
                  <span>-{cartDiscount} {isAr ? 'ر.س' : 'SAR'}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>{isAr ? 'الإجمالي النهائي' : 'Total Amount'}</span>
                <span className="text-orange-600 font-black">
                  {cartTotal} {isAr ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isAr ? 'تأكيد وإرسال الطلب' : 'Place Order Now'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
