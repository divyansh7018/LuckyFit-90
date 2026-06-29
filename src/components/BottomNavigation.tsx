import React from "react";
import { Home, Dumbbell, Utensils, TrendingUp, User } from "lucide-react";

export type TabType = "home" | "workout" | "diet" | "progress" | "profile";

interface BottomNavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: "home" as TabType, label: "Home", icon: Home },
    { id: "workout" as TabType, label: "Workout", icon: Dumbbell },
    { id: "diet" as TabType, label: "Diet", icon: Utensils },
    { id: "progress" as TabType, label: "Progress", icon: TrendingUp },
    { id: "profile" as TabType, label: "Profile", icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#333] z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-20 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-bold cursor-pointer transition-all duration-300 group"
              id={`nav-btn-${tab.id}`}
            >
              {/* Highlight active subtle glow indicator */}
              {isActive && (
                <div className="absolute top-0 w-8 h-[3px] bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] rounded-full" />
              )}

              {/* Icon */}
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-[#D4AF37] scale-110"
                    : "text-[#888] group-hover:text-white"
                }`}
              >
                <Icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 transition-all duration-200 ${
                  isActive ? "text-[#D4AF37]" : "text-[#888] group-hover:text-white"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
