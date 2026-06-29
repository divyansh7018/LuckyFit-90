import React from "react";
import { useApp } from "../context/AppContext";
import { Trophy, Flame, Activity, Egg, Droplets, ShieldCheck, Star } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Trophy: Trophy,
  Flame: Flame,
  Activity: Activity,
  Egg: Egg,
  Droplets: Droplets,
  ShieldCheck: ShieldCheck
};

export const AchievementsGrid: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4.5 h-4.5 text-[#D4AF37]" />
          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Unlocked Achievements</h4>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#FFD54F] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20">
          {state.achievements.filter((a) => a.unlocked).length} / {state.achievements.length} UNLOCKED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {state.achievements.map((ach) => {
          const IconComponent = ICON_MAP[ach.icon] || Star;
          const pct = Math.min(100, Math.round((ach.progressCurrent / ach.progressMax) * 100));

          return (
            <div
              key={ach.id}
              className={`relative rounded-2xl p-3 border transition-all duration-300 flex flex-col justify-between ${
                ach.unlocked
                  ? "bg-neutral-900/90 border-[#D4AF37]/30 shadow-[0_4px_15px_rgba(212,175,55,0.06)]"
                  : "bg-neutral-950/40 border-[#222]"
              }`}
              id={`ach-card-${ach.id}`}
            >
              {/* Unlocked banner */}
              {ach.unlocked && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FFD54F] animate-ping" />
              )}

              <div className="flex items-start gap-2.5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    ach.unlocked
                      ? "bg-[#D4AF37]/10 text-[#FFD54F] border-[#D4AF37]/30"
                      : "bg-neutral-900 text-gray-600 border-neutral-800"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h5 className={`text-xs font-bold leading-tight ${ach.unlocked ? "text-white" : "text-gray-500"}`}>
                    {ach.title}
                  </h5>
                  <p className="text-[10px] text-gray-400 leading-snug mt-1">
                    {ach.description}
                  </p>
                </div>
              </div>

              {/* Progress bar info */}
              <div className="mt-3.5 space-y-1">
                <div className="flex items-center justify-between text-[9px] font-mono font-medium">
                  <span className="text-gray-500">Progress</span>
                  <span className={ach.unlocked ? "text-[#FFD54F]" : "text-gray-500"}>
                    {ach.progressCurrent} / {ach.progressMax} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.unlocked ? "bg-[#D4AF37]" : "bg-neutral-800"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {ach.unlocked && ach.unlockedAt && (
                <div className="text-[8px] font-mono text-[#D4AF37] text-right mt-1.5 uppercase font-semibold">
                  Unlocked on {ach.unlockedAt}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
