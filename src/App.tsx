import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Splash } from "./components/Splash";
import { BottomNavigation, TabType } from "./components/BottomNavigation";
import { HomeScreen } from "./components/HomeScreen";
import { WorkoutScreen } from "./components/WorkoutScreen";
import { DietScreen } from "./components/DietScreen";
import { ProgressScreen } from "./components/ProgressScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { Award, Flame, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function MainAppLayout() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // Render correct active screen based on tab state
  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigateToTab={(tab) => setActiveTab(tab)} />;
      case "workout":
        return <WorkoutScreen />;
      case "diet":
        return <DietScreen />;
      case "progress":
        return <ProgressScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigateToTab={(tab) => setActiveTab(tab)} />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "home":
        return "LuckyFit Dashboard";
      case "workout":
        return "Training Center";
      case "diet":
        return "Nutrition & Anabolics";
      case "progress":
        return "Metric Timelines";
      case "profile":
        return "App Settings & Stats";
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans select-none antialiased">
      {/* Premium Top Navbar - Geometric Balance */}
      <header className="sticky top-0 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#1A1A1A] z-40 px-4 py-4.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0D0D0D] font-black text-lg shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              L
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-[#D4AF37]">LuckyFit 90</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#888] leading-tight mt-0.5 font-bold">
                {getHeaderTitle()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-[#888] text-[9px] uppercase tracking-wider leading-none">Streak</p>
              <p className="text-xs font-bold text-white flex items-center justify-end gap-0.5 mt-0.5">
                {state.streak} Days <span className="text-[#FFD54F]">🔥</span>
              </p>
            </div>
            <div
              onClick={() => setActiveTab("profile")}
              className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#D4AF37] font-bold text-sm cursor-pointer hover:bg-[#222] transition-colors"
              title="View Profile Settings"
            >
              {state.profile.name[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Screen Body Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <BottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <Splash key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <MainAppLayout key="main" />
        )}
      </AnimatePresence>
    </AppProvider>
  );
}
