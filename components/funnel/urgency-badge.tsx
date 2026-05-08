'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';

export const UrgencyBadge = () => {
  const [places, setPlaces] = useState(12);

  // Simulation d'une décrémentation lente pour augmenter l'urgence sociale
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaces(prev => (prev > 3 ? prev - (Math.random() > 0.8 ? 1 : 0) : prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-500 font-semibold text-sm"
    >
      <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
      <span>Plus que {places} places disponibles sur 15</span>
    </motion.div>
  );
};
