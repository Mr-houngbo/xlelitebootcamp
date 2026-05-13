'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

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
    <div className="sticky top-20 md:top-24 left-0 right-0 z-40 px-4 py-3 md:py-0">
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-emerald-700 backdrop-blur-md border border-emerald-500/20 shadow-2xl rounded-2xl md:rounded-full p-3 md:p-3 flex flex-col md:flex-row items-center justify-between md:justify-center gap-3 md:gap-4 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-center">
          <span className="text-xs md:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Clôture dans
          </span>
          <div className="flex items-center gap-2 md:gap-2.5">
            <TimeUnit value={timeLeft.days} label="J" />
            <TimeUnit value={timeLeft.hours} label="H" />
            <TimeUnit value={timeLeft.minutes} label="M" />
            <TimeUnit value={timeLeft.seconds} label="S" />
          </div>
        </div>
        
        <a href="/inscription" className="bg-white hover:bg-emerald-50 text-emerald-700 text-sm md:text-base font-black px-6 py-3 md:px-8 md:py-3 rounded-xl md:rounded-full transition-all shadow-lg whitespace-nowrap w-full md:w-auto text-center">
          Je réserve ma place
        </a>
      </motion.div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
    <span className="text-base md:text-xl font-black text-white font-mono tabular-nums leading-none">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[9px] md:text-[10px] font-bold text-white/70 uppercase">{label}</span>
  </div>
);
