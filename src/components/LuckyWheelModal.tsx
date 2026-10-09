import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Trophy, CheckCircle2, Copy } from 'lucide-react';
import { Coupon } from '../types';

export const LuckyWheelModal: React.FC = () => {
  const { isLuckyWheelOpen, setIsLuckyWheelOpen, language, addWonCoupon, applyCouponCode, showToast } = useApp();
  const isAr = language === 'ar';

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Coupon | null>(null);

  if (!isLuckyWheelOpen) return null;

  const prizes: { code: string; percent: number; labelAr: string; labelEn: string; color: string }[] = [
    { code: 'ATLOBNI25', percent: 25, labelAr: 'خصم 25%', labelEn: '25% OFF', color: '#ea580c' },
    { code: 'LUCKY20', percent: 20, labelAr: 'خصم 20%', labelEn: '20% OFF', color: '#8b5cf6' },
    { code: 'FREEDELIV', percent: 15, labelAr: 'توصيل مخفض', labelEn: 'Fast Saver', color: '#10b981' },
    { code: 'WIN30', percent: 30, labelAr: 'الجائزة الكبرى 30%', labelEn: 'Grand 30%', color: '#f59e0b' },
    { code: 'COFFEE15', percent: 15, labelAr: 'حلى وقهوة 15%', labelEn: 'Dessert 15%', color: '#06b6d4' },
    { code: 'CHEF20', percent: 20, labelAr: 'وجبة مميزة 20%', labelEn: 'Chef 20%', color: '#ec4899' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    // Pick a random prize
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const chosen = prizes[randomIndex];

    // Compute rotation (multi turns + offset)
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 * 5 + (prizes.length - randomIndex) * segmentAngle - segmentAngle / 2;

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const coupon: Coupon = {
        code: chosen.code,
        discountPercent: chosen.percent,
        descriptionAr: `قسيمة هز واربح: ${chosen.labelAr}`,
        descriptionEn: `Lucky Win: ${chosen.labelEn}`,
        minSpend: 25,
      };
      setWonPrize(coupon);
      addWonCoupon(coupon);
      showToast(
        isAr ? `مبروك! ربحت ${chosen.labelAr} بكود: ${chosen.code}` : `Congrats! You won ${chosen.labelEn}: ${chosen.code}`,
        'success'
      );
    }, 4000);
  };

  const handleApplyNow = () => {
    if (!wonPrize) return;
    const res = applyCouponCode(wonPrize.code);
    showToast(res.message, res.success ? 'success' : 'error');
    setIsLuckyWheelOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative border border-slate-700 p-6 flex flex-col items-center text-center">
        {/* Close button */}
        <button
          onClick={() => setIsLuckyWheelOpen(false)}
          className="absolute top-4 left-4 rtl:left-auto rtl:right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'عروض ومكافآت يومية' : 'Daily Rewards'}</span>
        </div>

        <h3 className="text-2xl font-black mb-1">
          {isAr ? 'هز واربح مع أطلبني 🎁' : 'Shake & Win with Atlobni 🎁'}
        </h3>
        <p className="text-xs text-slate-400 mb-6 max-w-xs">
          {isAr ? 'دور عجلة الحظ واحصل فوراً على كوبونات خصم حقيقية صالحة لكافة الطلبات' : 'Spin the wheel to win instant real discount coupons on all orders'}
        </p>

        {/* The Wheel Visual */}
        <div className="relative w-64 h-64 mb-6 flex items-center justify-center">
          {/* Top Indicator Arrow */}
          <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

          {/* Wheel Container */}
          <div
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden relative transition-transform ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '4s' : '0s',
            }}
          >
            {/* SVG Wheel segments */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {prizes.map((p, idx) => {
                const angle = 360 / prizes.length;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                return (
                  <g key={idx}>
                    <path d={pathData} fill={p.color} stroke="#1e293b" strokeWidth="0.5" />
                    {/* Segment text */}
                    <text
                      x="70"
                      y="52"
                      fill="white"
                      fontSize="5"
                      fontWeight="bold"
                      transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                      textAnchor="middle"
                    >
                      {p.percent}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Hub */}
          <div className="absolute z-10 w-14 h-14 rounded-full bg-slate-900 border-4 border-amber-400 flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        {/* Won Prize Details Card */}
        {wonPrize && (
          <div className="w-full p-4 rounded-2xl bg-slate-800/90 border border-amber-400/50 mb-4 animate-bounce duration-1000">
            <div className="text-xs font-bold text-amber-300 mb-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'مبروك! ربحت قسيمة مميزة' : 'Congratulations! You won'}</span>
            </div>
            <div className="text-lg font-black tracking-wider text-white bg-slate-900 py-1.5 px-4 rounded-xl border border-slate-700 font-mono inline-block my-1">
              {wonPrize.code}
            </div>
            <p className="text-[11px] text-slate-300">
              {isAr ? wonPrize.descriptionAr : wonPrize.descriptionEn}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          {wonPrize ? (
            <button
              onClick={handleApplyNow}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition cursor-pointer"
            >
              {isAr ? 'استخدام الكوبون فوراً في السلة' : 'Apply Promo to Cart Now'}
            </button>
          ) : (
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full py-3.5 rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition disabled:opacity-50 cursor-pointer"
            >
              {isSpinning ? (isAr ? 'العجلة تدور...' : 'Spinning...') : (isAr ? 'تدوير العجلة الآن' : 'Spin the Wheel!')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
