'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 md:p-3 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-emerald-100 shadow-emerald-900/10">
      <div className="flex flex-col items-center justify-center pt-2 pb-1">
         <span className="text-[9px] font-black uppercase text-emerald-700 tracking-widest mb-1 text-center">Expire dans</span>
      </div>
      <TimeUnit value={timeLeft.days} label="JRS" />
      <TimeUnit value={timeLeft.hours} label="HRS" />
      <TimeUnit value={timeLeft.minutes} label="MIN" />
      <TimeUnit value={timeLeft.seconds} label="SEC" isPulse />
    </div>
  );
};

const TimeUnit = ({ value, label, isPulse = false }: { value: number; label: string; isPulse?: boolean }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex flex-col items-center justify-center"
  >
    <div className={`bg-emerald-50/80 rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-inner border border-emerald-100/50 ${isPulse ? 'animate-pulse' : ''}`}>
      <span className="text-sm md:text-base font-black text-emerald-800 leading-none">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[8px] md:text-[9px] uppercase tracking-wider mt-1 mb-1 text-emerald-600 font-bold">{label}</span>
  </motion.div>
);
