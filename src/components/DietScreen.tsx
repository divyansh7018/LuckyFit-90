import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Utensils, CheckSquare, Square, DollarSign, Plus, Eye, Scale, Calculator, ArrowRight, Flame, Egg, ChefHat } from "lucide-react";
import { Meal } from "../types";

export const DietScreen: React.FC = () => {
  const { state, toggleMealCompleted, addCalories, addProtein } = useApp();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Custom snack inputs
  const [snackName, setSnackName] = useState("");
  const [snackCalories, setSnackCalories] = useState("");
  const [snackProtein, setSnackProtein] = useState("");

  const handleCustomSnackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cals = parseInt(snackCalories);
    const prot = parseInt(snackProtein);
    if (snackName.trim() && !isNaN(cals) && !isNaN(prot)) {
      addCalories(cals);
      addProtein(prot);
      // Clean up
      setSnackName("");
      setSnackCalories("");
      setSnackProtein("");
    }
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Budget & Header Block */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono font-black text-[#D4AF37] uppercase tracking-widest">ANABOLIC GROCERY MANAGEMENT</span>
            <h2 className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
              <ChefHat className="w-5 h-5 text-[#D4AF37]" /> Diet & Nutrition Plan
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-mono text-gray-500 font-bold uppercase block">MONTHLY BUDGET</span>
            <span className="text-lg font-black text-[#FFD54F] font-mono">₹3,000</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed font-medium">
          High protein diet calculated specifically for muscle recovery and metabolic rate. Sourced cost-effectively within budget limits.
        </p>
      </div>

      {/* Budget utilization tracker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#1A1A1A]/40 border border-[#222] p-4 rounded-3xl">
        <div>
          <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">Weekly Budget Goal</span>
          <div className="text-lg font-extrabold text-white font-mono mt-0.5">₹700 <span className="text-xs text-gray-400 font-normal">/ Week</span></div>
          <p className="text-[10px] text-gray-500 leading-snug mt-1 font-medium">Includes cheap local sources: Oats, Eggs, Bananas, Dal, Paneer, Soy Chunks, Milk.</p>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-[#222] pt-3 sm:pt-0 sm:pl-4">
          <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">Cost Per Egg White</span>
          <div className="text-lg font-extrabold text-[#D4AF37] font-mono mt-0.5">₹6.50 <span className="text-xs text-gray-400 font-normal">/ Egg</span></div>
          <p className="text-[10px] text-gray-500 leading-snug mt-1 font-medium">Excellent high-quality protein (3.6g protein per egg white) at minimal budgetary friction.</p>
        </div>
      </div>

      {/* Scheduled meals section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider pl-1">Scheduled Anabolic Meals</h3>

        {state.meals.map((meal) => (
          <div
            key={meal.id}
            className={`bg-[#1A1A1A] hover:bg-[#222] p-4 rounded-3xl border transition-all flex items-center justify-between gap-3 ${
              meal.completed ? "border-emerald-950/40 bg-neutral-900/60" : "border-[#222]"
            }`}
          >
            {/* Meal info & click to open ingredients */}
            <div
              onClick={() => setSelectedMeal(selectedMeal?.id === meal.id ? null : meal)}
              className="flex-1 min-w-0 cursor-pointer space-y-1"
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-900 text-gray-400 uppercase">
                  {meal.time}
                </span>
                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-orange-950/40 text-orange-400">
                  {meal.calories} kcal
                </span>
                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-400">
                  {meal.protein}g Protein
                </span>
              </div>
              <h4 className={`text-sm font-bold truncate ${meal.completed ? "text-gray-500 line-through" : "text-white"}`}>
                {meal.name}
              </h4>
              <p className="text-[10px] text-gray-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                {selectedMeal?.id === meal.id ? "Click to close detail" : "Click to view ingredients & weights"}
              </p>
            </div>

            {/* Checkbox log trigger */}
            <button
              onClick={() => toggleMealCompleted(meal.id)}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:bg-neutral-800 transition-colors cursor-pointer text-[#D4AF37]"
              id={`chk-meal-${meal.id}`}
            >
              {meal.completed ? (
                <CheckSquare className="w-5.5 h-5.5 text-emerald-400" strokeWidth={2.5} />
              ) : (
                <Square className="w-5.5 h-5.5 text-gray-600 hover:text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Selected meal detail box / Modal style card inside view */}
      {selectedMeal && (
        <div className="bg-[#121212] p-5 rounded-3xl border border-[#D4AF37]/50 space-y-3 shadow-md animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#222] pb-2">
            <h4 className="text-sm font-extrabold text-[#D4AF37]">{selectedMeal.name} Specifications</h4>
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Time: {selectedMeal.time}</span>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center bg-black/40 p-2.5 rounded-2xl border border-[#222]">
            <div>
              <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">Cals</span>
              <div className="text-xs font-bold text-white font-mono">{selectedMeal.calories}</div>
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">Protein</span>
              <div className="text-xs font-bold text-[#FFD54F] font-mono">{selectedMeal.protein}g</div>
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">Carbs</span>
              <div className="text-xs font-bold text-white font-mono">{selectedMeal.carbs}g</div>
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 font-bold uppercase">Fat</span>
              <div className="text-xs font-bold text-white font-mono">{selectedMeal.fat}g</div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Ingredients Checklist</span>
            <ul className="space-y-1">
              {selectedMeal.items.map((it, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Manual log snack overlay panel */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Log Custom Snack / Shake</h4>
        </div>

        <form onSubmit={handleCustomSnackSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={snackName}
              onChange={(e) => setSnackName(e.target.value)}
              placeholder="e.g. Oats Shake"
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-hidden focus:border-[#D4AF37]"
              required
            />
            <input
              type="number"
              value={snackCalories}
              onChange={(e) => setSnackCalories(e.target.value)}
              placeholder="Calories (kcal)"
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-hidden focus:border-[#D4AF37]"
              required
            />
            <input
              type="number"
              value={snackProtein}
              onChange={(e) => setSnackProtein(e.target.value)}
              placeholder="Protein (grams)"
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-hidden focus:border-[#D4AF37]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded-xl text-xs font-extrabold text-white cursor-pointer transition-all uppercase flex items-center justify-center gap-1.5"
          >
            Add Custom Snack <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
