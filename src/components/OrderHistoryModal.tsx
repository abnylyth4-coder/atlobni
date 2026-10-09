import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Bike, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { Order } from '../types';

export const OrderHistoryModal: React.FC = () => {
  const {
    isOrdersHistoryOpen,
    setIsOrdersHistoryOpen,
    orders,
    setActiveOrder,
    setIsTrackingOpen,
    addToCart,
    language,
    showToast
  } = useApp();

  const isAr = language === 'ar';

  if (!isOrdersHistoryOpen) return null;

  const handleTrack = (order: Order) => {
    setActiveOrder(order);
    setIsOrdersHistoryOpen(false);
    setIsTrackingOpen(true);
  };

  const handleReorder = (order: Order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => addToCart(item));
      setIsOrdersHistoryOpen(false);
      showToast(isAr ? 'تمت إضافة عناصر الطلب السابق إلى السلة' : 'Items re-added to cart', 'success');
    } else {
      showToast(isAr ? 'لا توجد عناصر لإعادة طلبها' : 'No store items to re-order', 'info');
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'on_the_way':
        return (
          <span className="bg-orange-100 text-orange-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Bike className="w-3 h-3" />
            <span>{isAr ? 'في الطريق' : 'On the Way'}</span>
          </span>
        );
      case 'preparing':
        return (
          <span className="bg-amber-100 text-amber-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{isAr ? 'قيد التحضير' : 'Preparing'}</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{isAr ? 'تم التوصيل' : 'Delivered'}</span>
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
            {isAr ? 'مؤكد' : 'Confirmed'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-xl min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <h3 className="font-black text-lg text-slate-900">
              {isAr ? 'سجل طلباتي' : 'My Orders History'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? 'تتبع طلباتك الحالية واطلع على طلباتك السابقة' : 'Track ongoing orders and past history'}
            </p>
          </div>
          <button
            onClick={() => setIsOrdersHistoryOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders list */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">{isAr ? 'لا توجد طلبات سابقة حتى الآن' : 'No past orders found'}</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-orange-300 bg-white transition shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {isAr ? order.storeNameAr : order.storeNameEn}
                      </h4>
                      {getStatusBadge(order.status)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      #{order.id} • {order.createdAt}
                    </span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="font-black text-sm text-orange-600 block">
                      {order.total} {isAr ? 'ر.س' : 'SAR'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {order.paymentMethod === 'cash' ? (isAr ? 'دفع عند الاستلام' : 'Cash') : (isAr ? 'إلكتروني' : 'Online')}
                    </span>
                  </div>
                </div>

                {/* Items summary */}
                {order.items.length > 0 && (
                  <div className="bg-slate-50 p-2 rounded-xl text-xs text-slate-600 space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {it.quantity}x {isAr ? it.menuItem.nameAr : it.menuItem.nameEn}
                        </span>
                        <span className="font-bold">
                          {it.menuItem.price * it.quantity} {isAr ? 'ر.س' : 'SAR'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {order.notes && (
                  <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-lg">
                    {order.notes}
                  </p>
                )}

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => handleTrack(order)}
                    className="flex-1 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تتبع الطلب' : 'Track Order'}</span>
                  </button>
                  {order.items.length > 0 && (
                    <button
                      onClick={() => handleReorder(order)}
                      className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إعادة الطلب' : 'Reorder'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
