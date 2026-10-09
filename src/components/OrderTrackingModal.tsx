import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus, ChatMessage } from '../types';
import {
  X,
  Bike,
  CheckCircle,
  Phone,
  MessageCircle,
  Send,
  Navigation,
  Clock,
  MapPin,
  Store,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    activeOrder,
    setActiveOrder,
    language,
    showToast
  } = useApp();

  const isAr = language === 'ar';
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'system',
      text: isAr ? 'تم تعيين الكابتن لتوصيل طلبك' : 'Captain assigned to your delivery',
      timestamp: '10:14',
    },
    {
      id: 'm2',
      sender: 'driver',
      text: isAr ? 'السلام عليكم يا غالي، استلمت الطلب وهو ساخن وفي طريقي إليك الآن!' : 'Hello! I picked up your fresh order and I am on the way!',
      timestamp: '10:15',
    }
  ]);

  const [bikeProgress, setBikeProgress] = useState(45); // 0% at store, 100% at home
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isChatOpen]);

  // Minor animate bike movement if 'on_the_way'
  useEffect(() => {
    if (activeOrder?.status === 'on_the_way') {
      const interval = setInterval(() => {
        setBikeProgress((prev) => (prev >= 88 ? 35 : prev + 2));
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeOrder?.status]);

  if (!isTrackingOpen || !activeOrder) return null;

  const orderStages: { key: OrderStatus; labelAr: string; labelEn: string; descAr: string; descEn: string }[] = [
    {
      key: 'confirmed',
      labelAr: 'تم تأكيد الطلب',
      labelEn: 'Order Confirmed',
      descAr: 'المتجر استلم طلبك وبدأ معالجته',
      descEn: 'Store received your order',
    },
    {
      key: 'preparing',
      labelAr: 'جاري التحضير والتجهيز',
      labelEn: 'Preparing Order',
      descAr: 'يتم تجهيز الأطباق طازجة في المطبخ',
      descEn: 'Dishes being freshly prepared',
    },
    {
      key: 'on_the_way',
      labelAr: 'الكابتن في الطريق إليك',
      labelEn: 'On the Way',
      descAr: 'الكابتن استلم الطلب ويتجه إلى موقعك',
      descEn: 'Captain picked up and is en route',
    },
    {
      key: 'delivered',
      labelAr: 'تم التوصيل بنجاح',
      labelEn: 'Delivered',
      descAr: 'نتمنى لك وجبة هنيئة ويوماً سعيداً!',
      descEn: 'Delivered! Bon appetit!',
    },
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
      case 'confirmed':
        return 0;
      case 'preparing':
        return 1;
      case 'on_the_way':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const currentStageIndex = getStageIndex(activeOrder.status);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulate driver reply
    setTimeout(() => {
      const repliesAr = [
        'أبشر يا غالي، أنا قريب جداً منك 3 دقائق وأرن الجرس!',
        'حاضر، شفت ملاحظتك وبوصلك الطلب عند الباب تماماً.',
        'شكراً لك، بإذن الله يصلك الأكل حار ولذيذ!',
        'الله يسعدك، وصلت عند مدخل العمارة الآن.'
      ];
      const repliesEn = [
        'Got it! I am very close, around 3 minutes away!',
        'Sure, I will leave it at your front door as requested.',
        'Thank you! Your food is hot and safe in the thermal bag.',
        'Arriving at the main entrance right now!'
      ];

      const driverMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'driver',
        text: isAr
          ? repliesAr[Math.floor(Math.random() * repliesAr.length)]
          : repliesEn[Math.floor(Math.random() * repliesEn.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, driverMsg]);
    }, 1200);
  };

  // Change order status manually for preview/demo
  const advanceStatus = (newStatus: OrderStatus) => {
    const updated = { ...activeOrder, status: newStatus };
    setActiveOrder(updated);
    showToast(
      isAr ? `تم تحديث حالة الطلب إلى: ${newStatus}` : `Order status updated to: ${newStatus}`,
      'info'
    );
  };

  const handleCall = () => {
    showToast(
      isAr
        ? `جاري الاتصال بـ ${activeOrder.driver?.name} (${activeOrder.driver?.phone})...`
        : `Calling ${activeOrder.driver?.name}...`,
      'info'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-2xl min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">
                  {isAr ? 'تتبع الطلب المباشر' : 'Live Order Tracking'}
                </h3>
                <span className="bg-orange-500/30 text-orange-400 border border-orange-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  #{activeOrder.id}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {isAr ? activeOrder.storeNameAr : activeOrder.storeNameEn}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Animated SVG Simulation Map */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 h-52 sm:h-64 shadow-inner">
            {/* Map Canvas SVG */}
            <svg className="w-full h-full" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Map background grid representing city blocks */}
              <rect width="500" height="240" fill="#f1f5f9" />
              {/* Blocks */}
              <rect x="20" y="20" width="80" height="60" rx="8" fill="#e2e8f0" />
              <rect x="120" y="20" width="100" height="60" rx="8" fill="#e2e8f0" />
              <rect x="240" y="20" width="110" height="60" rx="8" fill="#e2e8f0" />
              <rect x="370" y="20" width="110" height="60" rx="8" fill="#e2e8f0" />

              <rect x="20" y="150" width="120" height="70" rx="8" fill="#e2e8f0" />
              <rect x="160" y="150" width="90" height="70" rx="8" fill="#e2e8f0" />
              <rect x="270" y="150" width="120" height="70" rx="8" fill="#e2e8f0" />
              <rect x="410" y="150" width="70" height="70" rx="8" fill="#e2e8f0" />

              {/* Park green zone */}
              <rect x="130" y="100" width="60" height="35" rx="6" fill="#dcfce7" />
              <text x="145" y="122" fill="#15803d" fontSize="9" fontWeight="bold">حديقة</text>

              {/* Road Pathway */}
              <path
                d="M 60 115 L 200 115 L 200 125 L 340 125 L 430 125"
                stroke="#cbd5e1"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 60 115 L 200 115 L 200 125 L 340 125 L 430 125"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Store Marker Pin (Left) */}
              <g transform="translate(60, 115)">
                <circle r="14" fill="#0f172a" />
                <circle r="11" fill="#ea580c" />
                <circle r="4" fill="white" />
              </g>

              {/* Customer Home Marker Pin (Right) */}
              <g transform="translate(430, 125)">
                <circle r="16" fill="#10b981" fillOpacity="0.2">
                  <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="13" fill="#10b981" />
                <circle r="5" fill="white" />
              </g>

              {/* Animated Scooter Pin on Path */}
              {activeOrder.status === 'on_the_way' && (
                <g transform={`translate(${60 + (bikeProgress / 100) * 370}, 120)`}>
                  <circle r="15" fill="#f97316" fillOpacity="0.3">
                    <animate attributeName="r" values="12;20;12" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="12" fill="#ea580c" />
                  <circle r="8" fill="white" />
                  <circle r="4" fill="#ea580c" />
                </g>
              )}
            </svg>

            {/* Over-map floating badges */}
            <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-slate-200 text-xs">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>
                  {activeOrder.status === 'delivered'
                    ? (isAr ? 'تم التوصيل' : 'Delivered')
                    : (isAr ? 'الوصول المتوقع: 12 دقيقة' : 'ETA: 12 mins')}
                </span>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-2">
              <div className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-xs">
                <Navigation className="w-3.5 h-3.5 text-orange-400" />
                <span>{isAr ? 'المسافة: 1.8 كم' : 'Distance: 1.8 km'}</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline Steps */}
          <div className="bg-slate-50/80 rounded-3xl p-4 sm:p-5 border border-slate-200/80">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
              {isAr ? 'مراحل الطلب' : 'Order Timeline'}
            </h4>

            <div className="space-y-4">
              {orderStages.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.key} className="flex items-start gap-3 relative">
                    {/* Connecting line */}
                    {idx < orderStages.length - 1 && (
                      <div
                        className={`absolute right-3.5 rtl:right-3.5 rtl:left-auto left-auto top-7 w-0.5 h-8 -ml-[1px] transition-colors ${
                          isCompleted ? 'bg-orange-600' : 'bg-slate-200'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-orange-600 text-white'
                          : isCurrent
                          ? 'bg-orange-500 text-white ring-4 ring-orange-100 animate-pulse'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-black ${
                            isCurrent
                              ? 'text-orange-600'
                              : isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {isAr ? stage.labelAr : stage.labelEn}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                            {isAr ? 'الحالة الحالية' : 'Current'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {isAr ? stage.descAr : stage.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Captain / Driver Card */}
          {activeOrder.driver && (
            <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-orange-50 via-amber-50 to-orange-50/40 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeOrder.driver.avatar}
                  alt={activeOrder.driver.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-black text-sm text-slate-900">
                      {activeOrder.driver.name}
                    </h5>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">
                      ★ {activeOrder.driver.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {activeOrder.driver.vehicle}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {activeOrder.driver.phone}
                  </p>
                </div>
              </div>

              {/* Driver Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCall}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{isAr ? 'اتصال' : 'Call'}</span>
                </button>
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-orange-600/20 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'محادثة' : 'Chat'}</span>
                  {messages.length > 2 && (
                    <span className="w-2 h-2 rounded-full bg-yellow-300" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Interactive In-App Chat Drawer / Box */}
          {isChatOpen && (
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md flex flex-col">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>
                    {isAr ? `محادثة فورية مع ${activeOrder.driver?.name}` : `Live Chat with Driver`}
                  </span>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              {/* Message scroll list */}
              <div ref={chatScrollRef} className="p-4 space-y-3 h-48 overflow-y-auto bg-slate-50">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.sender === 'user'
                        ? 'justify-end'
                        : m.sender === 'driver'
                        ? 'justify-start'
                        : 'justify-center'
                    }`}
                  >
                    {m.sender === 'system' ? (
                      <span className="text-[10px] bg-slate-200/80 text-slate-600 px-3 py-1 rounded-full font-medium">
                        {m.text}
                      </span>
                    ) : (
                      <div
                        className={`max-w-[78%] p-3 rounded-2xl text-xs font-medium shadow-xs ${
                          m.sender === 'user'
                            ? 'bg-orange-600 text-white rounded-br-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span
                          className={`text-[9px] block text-right mt-1 ${
                            m.sender === 'user' ? 'text-orange-200' : 'text-slate-400'
                          }`}
                        >
                          {m.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Reply Pills */}
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
                <button
                  onClick={() => handleSendMessage(isAr ? 'أنا بانتظارك عند الباب' : 'Waiting at the door')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full shrink-0 font-medium"
                >
                  {isAr ? 'أنا بانتظارك عند الباب' : 'Waiting at the door'}
                </button>
                <button
                  onClick={() => handleSendMessage(isAr ? 'كم متبقي وتوصل؟' : 'How much time left?')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full shrink-0 font-medium"
                >
                  {isAr ? 'كم متبقي وتوصل؟' : 'How much time left?'}
                </button>
                <button
                  onClick={() => handleSendMessage(isAr ? 'الله يعطيك العافية' : 'Thank you so much')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full shrink-0 font-medium"
                >
                  {isAr ? 'الله يعطيك العافية' : 'Thank you so much'}
                </button>
              </div>

              {/* Chat Input */}
              <div className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isAr ? 'اكتب رسالتك للكابتن...' : 'Type message to driver...'}
                  className="flex-1 text-xs p-2.5 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex items-center justify-center transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Demo Controls: Simulate Order Stage Progress */}
          <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-600">
              {isAr ? 'تجربة مراحل التوصيل (عرض توضيحي):' : 'Demo Stages Simulation:'}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => advanceStatus('confirmed')}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] ${
                  activeOrder.status === 'confirmed' ? 'bg-orange-600 text-white' : 'bg-white text-slate-700'
                }`}
              >
                1. {isAr ? 'مؤكد' : 'Confirmed'}
              </button>
              <button
                onClick={() => advanceStatus('preparing')}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] ${
                  activeOrder.status === 'preparing' ? 'bg-orange-600 text-white' : 'bg-white text-slate-700'
                }`}
              >
                2. {isAr ? 'تحضير' : 'Prep'}
              </button>
              <button
                onClick={() => advanceStatus('on_the_way')}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] ${
                  activeOrder.status === 'on_the_way' ? 'bg-orange-600 text-white' : 'bg-white text-slate-700'
                }`}
              >
                3. {isAr ? 'في الطريق' : 'En route'}
              </button>
              <button
                onClick={() => advanceStatus('delivered')}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] ${
                  activeOrder.status === 'delivered' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                }`}
              >
                4. {isAr ? 'تم التوصيل' : 'Delivered'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
