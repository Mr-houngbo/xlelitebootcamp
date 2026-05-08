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
    <div className="flex gap-4 items-center justify-center font-mono text-white">
      <TimeUnit value={timeLeft.days} label="Jours" />
      <span className="text-2xl font-bold text-orange-500">:</span>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <span className="text-2xl font-bold text-orange-500">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-2xl font-bold text-orange-500">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex flex-col items-center"
  >
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 min-w-[60px] text-center">
      <span className="text-2xl md:text-3xl font-bold text-emerald-400">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] uppercase tracking-wider mt-1 text-slate-400">{label}</span>
  </motion.div>
);
