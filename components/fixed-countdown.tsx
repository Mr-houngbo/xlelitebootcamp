'use client';

import { Clock } from 'lucide-react';
import { useState } from 'react';

export default function FixedCountdown() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        className="relative group cursor-pointer"
        onClick={() => setShowMessage(!showMessage)}
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      >
        <div className="w-16 h-16 bg-red-500 rounded-full shadow-xl shadow-red-500/30 flex items-center justify-center animate-pulse transition-transform hover:scale-110">
          <div className="text-center">
            <Clock className="w-6 h-6 text-white mx-auto mb-0.5" />
            <div className="text-[9px] font-bold text-white leading-none">
              <span>8J</span>
              <span className="mx-0.5">14H</span>
              <span>32M</span>
            </div>
          </div>
        </div>
        
        {/* Tooltip au hover */}
        <div className={`absolute bottom-full right-0 mb-3 w-48 bg-slate-900 text-white text-xs font-medium p-3 rounded-lg shadow-xl transition-opacity duration-200 ${showMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          Les inscriptions se terminent bientôt !
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-slate-900"></div>
        </div>
      </div>
    </div>
  );
}
