import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Truck, Gift, Sparkles, ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';

export const BannerSlider: React.FC = () => {
  const {
    language,
    setIsParcelOpen,
    setIsCustomOrderOpen,
    setIsLuckyWheelOpen,
    applyCouponCode,
    showToast
  } = useApp();

  const isAr = language === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 'custom',
      titleAr: 'أطلب أي شيء نوصله لعندك فوراً!',
      titleEn: 'Request anything, we deliver to your doorstep!',
      descAr: 'ما لقيت اللي تبيه في القائمة؟ مندوبنا الخاص يشتري لك أي طلب من أي مكان ويوصله فوراً.',
      descEn: "Can't find what you need? Our personal shopper buys and brings anything from any store.",
      ctaAr: 'أطلب أي شيء الآن',
      ctaEn: 'Make a Custom Request',
      bg: 'from-orange-600 via-amber-600 to-amber-500',
      icon: Gift,
      action: () => setIsCustomOrderOpen(true),
      tagAr: 'خدمة كونسيرج خاصة',
      tagEn: 'Personal Shopper',
    },
    {
      id: 'parcel',
      titleAr: 'خدمة "وصلني" - إرسال واستلام الطرود',
      titleEn: '"Wasselli" Courier - Pick up & Send Parcels',
      descAr: 'أرسل أوراق، هدايا، مفاتيح، أو شحنات من بابك لباب المستلم في دقائق بأقل تكلفة.',
      descEn: 'Send documents, keys, gifts or packages from your door to recipient in minutes.',
      ctaAr: 'إرسال طرد سريع',
      ctaEn: 'Send a Package',
      bg: 'from-indigo-600 via-blue-600 to-sky-500',
      icon: Truck,
      action: () => setIsParcelOpen(true),
      tagAr: 'توصيل فوري من الباب للباب',
      tagEn: 'Door-to-Door Courier',
    },
    {
      id: 'lucky',
      titleAr: 'ميزة "هز واربح" - قسائم وخصومات يومية!',
      titleEn: '"Shake & Win" - Daily vouchers & free food!',
      descAr: 'قم بتدوير عجلة الحظ أو هز هاتفك للحصول على كوبونات حصرية وتوصيل مجاني.',
      descEn: 'Spin the lucky wheel to unlock instant discounts and free delivery coupons.',
      ctaAr: 'جرب حظك الآن',
      ctaEn: 'Try Your Luck',
      bg: 'from-emerald-600 via-teal-600 to-cyan-500',
      icon: Sparkles,
      action: () => setIsLuckyWheelOpen(true),
      tagAr: 'جوائز مجانية 100%',
      tagEn: '100% Free Rewards',
    },
    {
      id: 'coupon',
      titleAr: 'خصم 20% مع كود "ATLOBNI20"',
      titleEn: '20% OFF with code "ATLOBNI20"',
      descAr: 'استخدم كود الخصم الحصري واستمتع بأشهى الوجبات والمقاضي بأسعار ولا في الخيال.',
      descEn: 'Use our exclusive code for 20% off your next delicious meal or fresh grocery run.',
      ctaAr: 'تفعيل الكوبون',
      ctaEn: 'Apply Promo Code',
      bg: 'from-rose-600 via-pink-600 to-amber-600',
      icon: Sparkles,
      action: () => {
        const res = applyCouponCode('ATLOBNI20');
        showToast(res.message, res.success ? 'success' : 'error');
      },
      tagAr: 'عرض حصري محدود',
      tagEn: 'Limited Exclusive',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const current = banners[currentIndex];
  const IconComponent = current.icon;

  const nextBanner = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl text-white my-6">
      <div className={`p-6 sm:p-10 bg-linear-to-r ${current.bg} transition-all duration-500 relative min-h-[220px] sm:min-h-[260px] flex flex-col justify-between`}>
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/25">
            <IconComponent className="w-3.5 h-3.5" />
            <span>{isAr ? current.tagAr : current.tagEn}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 leading-tight tracking-tight">
            {isAr ? current.titleAr : current.titleEn}
          </h2>

          <p className="text-sm sm:text-base text-white/90 font-medium mb-6 max-w-xl leading-relaxed">
            {isAr ? current.descAr : current.descEn}
          </p>

          <button
            onClick={current.action}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-sm sm:text-base hover:bg-slate-100 hover:shadow-lg active:scale-95 transition cursor-pointer"
          >
            <span>{isAr ? current.ctaAr : current.ctaEn}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Carousel indicators & navigation */}
        <div className="relative z-10 flex items-center justify-between pt-4 mt-2 border-t border-white/15">
          <div className="flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={isAr ? nextBanner : prevBanner}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={isAr ? prevBanner : nextBanner}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
