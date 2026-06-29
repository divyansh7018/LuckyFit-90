import React from "react";
import { motion } from "motion/react";

interface CircularProgressProps {
  value: number; // current progress, e.g. 1200
  max: number; // goal, e.g. 2500
  size?: number; // width/height in px
  strokeWidth?: number;
  label?: string; // sub-label text
  unit?: string; // unit text, e.g. "kcal"
  color?: string; // override stroke color
}

export const CircularProgressWidget: React.FC<CircularProgressProps> = ({
  value,
  max,
  size = 140,
  strokeWidth = 10,
  label,
  unit,
  color = "#D4AF37"
}) => {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#1F1F1F"
          strokeWidth={strokeWidth}
        />
        {/* Progress Ring with standard/motion transition */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      {/* Centered Stats Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold font-mono tracking-tight text-white leading-none">
          {Math.round(value).toLocaleString()}
        </span>
        {unit && (
          <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider mt-0.5">
            {unit}
          </span>
        )}
        {label && (
          <span className="text-[10px] font-medium text-gray-400 mt-1 uppercase max-w-[80px] truncate">
            {label}
          </span>
        )}
        <span className="text-[11px] font-bold text-[#FFD54F] mt-0.5">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};
