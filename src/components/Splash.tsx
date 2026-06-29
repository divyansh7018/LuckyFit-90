import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Dumbbell, Flame } from "lucide-react";

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [pulseColor, setPulseColor] = useState(true);

  useEffect(() => {
    // Auto complete after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0D0D0D] flex flex-col items-center justify-between z-50 p-8 select-none">
      {/* Decorative top accent */}
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full opacity-60 mt-4" />

      {/* Main Branding Block */}
      <div className="flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          {/* Outer glowing halo */}
          <div className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-20 blur-2xl animate-pulse" />
          
          {/* Main shield icon base */}
          <div className="relative w-32 h-32 rounded-full border-2 border-[#D4AF37] bg-[#1A1A1A] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.25)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-2 border border-dashed border-[#FFD54F]/30 rounded-full"
            />
            <Dumbbell className="w-14 h-14 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          
          {/* Mini fire indicator badge */}
          <motion.div
            initial={{ scale: 0, x: 20, y: -20 }}
            animate={{ scale: 1, x: 10, y: -10 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute top-0 right-0 w-10 h-10 rounded-full bg-[#FFD54F] flex items-center justify-center border-2 border-[#0D0D0D] shadow-lg"
          >
            <Flame className="w-5 h-5 text-black fill-black" />
          </motion.div>
        </motion.div>

        {/* Application Titles */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-widest text-white font-sans flex items-center justify-center gap-2">
            LUCKY<span className="text-[#D4AF37]">FIT</span>
            <span className="text-xs bg-[#D4AF37] text-black px-2 py-0.5 rounded-sm font-black align-middle">90</span>
          </h1>
          <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mt-2">
            Transform Yourself in 90 Days
          </p>
        </motion.div>

        {/* Dynamic Loading/Progress Indicators */}
        <div className="w-48 h-[2px] bg-gray-800 rounded-full mt-10 overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          />
        </div>
      </div>

      {/* Footer Branding & Skip Trigger */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xs pb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <Trophy className="w-4 h-4 text-[#FFD54F]" />
          <span>OFFLINE ENGINE SECURED</span>
        </div>
        
        <motion.button
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full border border-gray-800 hover:border-[#D4AF37]/50 text-xs text-gray-400 hover:text-white font-mono transition-colors tracking-widest cursor-pointer bg-black/40"
        >
          SKIP INTRO
        </motion.button>
      </div>
    </div>
  );
};
