import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { CircularProgressWidget } from "./CircularProgressWidget";
import { TrackerWidgets } from "./TrackerWidgets";
import { MOTIVATIONAL_QUOTES } from "../data";
import { Flame, Target, Award, Calendar, ChevronRight, Droplet, Egg, Sparkles, Plus, Check } from "lucide-react";
import { motion } from "motion/react";

interface HomeScreenProps {
  onNavigateToTab: (tab: "home" | "workout" | "diet" | "progress" | "profile") => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToTab }) => {
  const { state, calculations, addWater } = useApp();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select a quote based on the day of the year or random index
    const dayIndex = new Date().getDate() % MOTIVATIONAL_QUOTES.length;
    setQuote(MOTIVATIONAL_QUOTES[dayIndex]);
  }, []);

  // Find today's workout focus
  const getTodayWorkout = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = days[new Date().getDay()];
    const todayPlan = state.workoutPlan.find((w) => w.day === todayName);
    return todayPlan || state.workoutPlan[0];
  };

  const todayWorkout = getTodayWorkout();
  const completedExercisesCount = todayWorkout.exercises.filter((e) => e.completed).length;
  const totalExercisesCount = todayWorkout.exercises.length;

  const completedMealsCount = state.meals.filter((m) => m.completed).length;
  const totalMealsCount = state.meals.length;

  // Determine Greeting based on hour
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return "Good Morning";
    if (hrs < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* 1. Primary Progress Ring & Large Metrics (Geometric Balance Design) */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl flex items-center justify-between border border-[#222] shadow-lg relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#D4AF37]/2 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col gap-4 z-10">
          <div>
            <span className="text-[#D4AF37] text-3xl font-black tracking-tight">Day {Math.min(90, Math.max(1, state.streak))}</span>
            <span className="text-[#888] text-lg ml-1 tracking-wide uppercase font-bold">/ 90</span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 mt-1 text-left">
            <div>
              <p className="text-[#888] text-[9px] uppercase mb-0.5 tracking-widest font-black">Weight</p>
              <p className="text-lg font-black text-white font-mono">{state.profile.currentWeight} <span className="text-xs text-[#888] font-bold">kg</span></p>
            </div>
            <div>
              <p className="text-[#888] text-[9px] uppercase mb-0.5 tracking-widest font-black">Goal Weight</p>
              <p className="text-lg font-black text-[#FFD54F] font-mono">{state.profile.goalWeight} <span className="text-xs text-[#888] font-bold">kg</span></p>
            </div>
            <div>
              <p className="text-[#888] text-[9px] uppercase mb-0.5 tracking-widest font-black">BMI Score</p>
              <p className="text-lg font-black text-white font-mono">{calculations.bmi} <span className="text-[8px] text-emerald-500 font-black tracking-wide block">{calculations.bmiStatus}</span></p>
            </div>
            <div>
              <p className="text-[#888] text-[9px] uppercase mb-0.5 tracking-widest font-black">Active Streak</p>
              <p className="text-lg font-black text-white font-mono">{state.streak} <span className="text-[8px] text-[#FFD54F] font-black block">Days 🔥</span></p>
            </div>
          </div>
        </div>

        {/* Dynamic circular SVG progress tracker */}
        <div className="relative flex items-center justify-center w-36 h-36 shrink-0 z-10">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="72" cy="72" r="54" stroke="#222" strokeWidth="8" fill="transparent" />
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#D4AF37"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={2 * Math.PI * 54 - (Math.min(100, Math.max(1, (state.streak / 90) * 100)) / 100) * 2 * Math.PI * 54}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-black text-white font-mono">
              {Math.round((Math.min(90, Math.max(1, state.streak)) / 90) * 100)}%
            </span>
            <p className="text-[8px] uppercase tracking-widest text-[#888] font-black">Complete</p>
          </div>
        </div>
      </div>

      {/* Motivational Directives Banner */}
      <div className="p-4 rounded-3xl bg-[#1A1A1A] border border-[#222] flex items-start gap-2.5 shadow-sm">
        <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-[8px] font-mono tracking-widest font-black text-gray-500 uppercase block">Daily Focus Mandate</span>
          <p className="text-xs text-gray-300 italic leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>

      {/* 2. Daily Nutrients Grid (Geometric Balance Design) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Calories Card */}
        <div className="bg-[#1A1A1A] p-4 rounded-3xl border border-[#222] flex flex-col justify-between shadow-sm">
          <p className="text-[#888] text-[9px] uppercase tracking-widest font-black">Calories</p>
          <div className="flex justify-between items-end mt-4">
            <h3 className="text-base font-extrabold text-white font-mono">{Math.round(state.trackers.caloriesConsumed)}</h3>
            <p className="text-[#D4AF37] text-[10px] font-mono font-bold">/ {state.trackers.caloriesGoal}</p>
          </div>
          <div className="w-full h-1 bg-[#333] mt-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-500"
              style={{ width: `${Math.min(100, (state.trackers.caloriesConsumed / state.trackers.caloriesGoal) * 100)}%` }}
            />
          </div>
        </div>

        {/* Protein Card */}
        <div className="bg-[#1A1A1A] p-4 rounded-3xl border border-[#222] flex flex-col justify-between shadow-sm">
          <p className="text-[#888] text-[9px] uppercase tracking-widest font-black">Protein</p>
          <div className="flex justify-between items-end mt-4">
            <h3 className="text-base font-extrabold text-white font-mono">{Math.round(state.trackers.proteinConsumed)}g</h3>
            <p className="text-[#D4AF37] text-[10px] font-mono font-bold">/ {state.trackers.proteinGoal}g</p>
          </div>
          <div className="w-full h-1 bg-[#333] mt-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD54F] transition-all duration-500"
              style={{ width: `${Math.min(100, (state.trackers.proteinConsumed / state.trackers.proteinGoal) * 100)}%` }}
            />
          </div>
        </div>

        {/* Water Card */}
        <div className="bg-[#1A1A1A] p-4 rounded-3xl border border-[#222] flex flex-col justify-between shadow-sm">
          <p className="text-[#888] text-[9px] uppercase tracking-widest font-black">Water</p>
          <div className="flex justify-between items-end mt-4">
            <h3 className="text-base font-extrabold text-white font-mono">{state.trackers.waterConsumed}ml</h3>
            <p className="text-[#D4AF37] text-[10px] font-mono font-bold font-mono">/ {state.trackers.waterGoal}ml</p>
          </div>
          <div className="w-full h-1 bg-[#333] mt-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500"
              style={{ width: `${Math.min(100, (state.trackers.waterConsumed / state.trackers.waterGoal) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Water Logging panel */}
      <div className="bg-[#1A1A1A] px-4 py-3 rounded-3xl border border-[#222] flex items-center justify-between shadow-sm">
        <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">Quick Hydration shorts</span>
        <div className="flex gap-2">
          <button
            onClick={() => addWater(250)}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[9px] font-mono font-bold text-gray-300 flex items-center gap-1 cursor-pointer transition-all border border-neutral-800"
          >
            <Plus className="w-3 h-3 text-[#D4AF37]" /> +250ml
          </button>
          <button
            onClick={() => addWater(500)}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[9px] font-mono font-bold text-gray-300 flex items-center gap-1 cursor-pointer transition-all border border-neutral-800"
          >
            <Plus className="w-3 h-3 text-[#D4AF37]" /> +500ml
          </button>
        </div>
      </div>

      {/* 3. Today's Workout (Geometric Balance Design) */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-5 rounded-3xl border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.08)]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest">Today's Session</p>
            <h2 className="text-xl font-black text-white mt-1">{todayWorkout.focus}</h2>
          </div>
          <span className="bg-[#D4AF37] text-[#0D0D0D] text-[9px] font-mono font-black px-2.5 py-1 rounded">
            {todayWorkout.day.toUpperCase()}
          </span>
        </div>

        {todayWorkout.isRest ? (
          <p className="text-xs text-[#888] leading-relaxed mb-4">
            Sunday Rest Day. Focus on nutrient partition, muscle tissue healing, and homeostatic recovery.
          </p>
        ) : (
          <>
            <p className="text-xs text-[#888] leading-relaxed mb-4">
              Focus on strict execution, range of motion, and target muscle overload.
            </p>
            <div className="space-y-2 mb-5">
              {todayWorkout.exercises.slice(0, 3).map((ex) => (
                <div key={ex.id} className="flex items-center text-xs text-gray-300">
                  <div className={`w-1.5 h-1.5 rounded-full mr-2.5 ${ex.completed ? "bg-emerald-500" : "bg-[#D4AF37]"}`} />
                  <span className={ex.completed ? "line-through text-gray-500 font-medium" : "font-medium"}>
                    {ex.name}: {ex.sets} Sets x {ex.reps} Reps
                  </span>
                </div>
              ))}
              {todayWorkout.exercises.length > 3 && (
                <p className="text-[10px] text-[#888] italic pl-4">
                  + {todayWorkout.exercises.length - 3} more movements
                </p>
              )}
            </div>
          </>
        )}

        <button
          onClick={() => onNavigateToTab("workout")}
          className="w-full bg-[#D4AF37] hover:bg-[#FFD54F] text-[#0D0D0D] py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
        >
          {todayWorkout.isRest ? "View Full Program" : "Resume Workout"}
        </button>
      </div>

      {/* 4. Today's Diet Target (Geometric Balance Design) */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#888] text-[9px] uppercase tracking-widest font-black">Anabolic Diet Target</p>
            <h4 className="text-sm font-extrabold text-white mt-1">Today's Meal Checklist</h4>
          </div>
          <button
            onClick={() => onNavigateToTab("diet")}
            className="text-[10px] font-mono font-bold text-[#D4AF37] hover:text-white flex items-center gap-0.5 cursor-pointer"
          >
            Manage Diet <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-[#0D0D0D] rounded-2xl flex items-center justify-center text-xl border border-[#222] shrink-0">
            🍱
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Scheduled Proteins</h4>
            <p className="text-[10px] text-[#888] truncate">
              {completedMealsCount} of {totalMealsCount} logged. Budget optimized.
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {state.meals.map((meal) => (
              <div
                key={meal.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center border text-[9px] font-black ${
                  meal.completed
                    ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFD54F]"
                    : "bg-[#0D0D0D] border-[#222] text-[#888]"
                }`}
                title={meal.name}
              >
                {meal.name[0]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Compact Weight Tracker */}
      <TrackerWidgets />
    </div>
  );
};
