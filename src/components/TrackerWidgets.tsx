import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Droplet, Egg, Flame, Plus, RotateCcw, Scale, Calculator, ArrowRight, TrendingUp } from "lucide-react";

export const TrackerWidgets: React.FC = () => {
  const { state, addWater, resetWater, addProtein, resetProtein, addCalories, resetCalories, addWeightRecord, calculations } = useApp();
  const [weightInput, setWeightInput] = useState("");
  const [isWeeklyChart, setIsWeeklyChart] = useState(true);

  // Calculator states
  const [calcHeight, setCalcHeight] = useState(state.profile.height.toString());
  const [calcWeight, setCalcWeight] = useState(state.profile.currentWeight.toString());
  const [calcAge, setCalcAge] = useState(state.profile.age.toString());
  const [calcGender, setCalcGender] = useState("male");
  const [calcBmiResult, setCalcBmiResult] = useState<number | null>(null);
  const [calcBmrResult, setCalcBmrResult] = useState<number | null>(null);
  const [calcFatResult, setCalcFatResult] = useState<number | null>(null);

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightInput);
    if (!isNaN(w) && w > 20 && w < 300) {
      addWeightRecord(w);
      setWeightInput("");
    }
  };

  // Custom BMR/BMI Calculate trigger
  const runManualCalculators = () => {
    const h = parseFloat(calcHeight);
    const w = parseFloat(calcWeight);
    const a = parseInt(calcAge);
    if (!isNaN(h) && !isNaN(w) && !isNaN(a)) {
      const hm = h / 100;
      const computedBmi = Number((w / (hm * hm)).toFixed(1));
      setCalcBmiResult(computedBmi);

      // BMR Harris-Benedict formula
      let computedBmr = 0;
      if (calcGender === "male") {
        computedBmr = Math.round(88.362 + 13.397 * w + 4.799 * h - 5.677 * a);
      } else {
        computedBmr = Math.round(447.593 + 9.247 * w + 3.098 * h - 4.33 * a);
      }
      setCalcBmrResult(computedBmr);

      // Body Fat Estimate formula
      const computedFat = Math.max(3, Number((1.2 * computedBmi + 0.23 * a - (calcGender === "male" ? 16.2 : 5.4)).toFixed(1)));
      setCalcFatResult(computedFat);
    }
  };

  // SVG Chart drawing helper
  const renderSVGChart = () => {
    // Determine history subset
    const dataPoints = state.weightHistory;
    if (dataPoints.length === 0) return <div className="text-gray-500 py-8 text-center text-xs">No logs registered yet.</div>;

    const displayedData = isWeeklyChart ? dataPoints.slice(-7) : dataPoints;
    
    // Chart dimensions
    const width = 340;
    const height = 150;
    const padding = 30;

    const weights = displayedData.map(d => d.weight);
    const minWeight = Math.min(...weights) - 1;
    const maxWeight = Math.max(...weights) + 1;
    const rangeWeight = maxWeight - minWeight || 1;

    // Map points to SVG coordinates
    const points = displayedData.map((d, i) => {
      const x = padding + (i / Math.max(1, displayedData.length - 1)) * (width - padding * 2);
      const y = height - padding - ((d.weight - minWeight) / rangeWeight) * (height - padding * 2);
      return { x, y, weight: d.weight, date: d.date };
    });

    // Create polyline path
    const pathString = points.map(p => `${p.x},${p.y}`).join(" ");

    return (
      <div className="w-full bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Weight Progression</h4>
          </div>
          <div className="flex gap-1.5 bg-black/40 rounded-lg p-0.5 border border-[#222]">
            <button
              onClick={() => setIsWeeklyChart(true)}
              className={`px-2 py-0.5 text-[9px] font-mono rounded cursor-pointer ${
                isWeeklyChart ? "bg-[#D4AF37] text-black font-extrabold" : "text-gray-400 hover:text-white"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setIsWeeklyChart(false)}
              className={`px-2 py-0.5 text-[9px] font-mono rounded cursor-pointer ${
                !isWeeklyChart ? "bg-[#D4AF37] text-black font-extrabold" : "text-gray-400 hover:text-white"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* SVG Drawing container */}
        <div className="relative overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
            {/* Horizontal Grid lines */}
            {[0, 0.5, 1].map((val, idx) => {
              const y = padding + val * (height - padding * 2);
              const gridWeight = maxWeight - val * rangeWeight;
              return (
                <g key={idx} className="opacity-10">
                  <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="white" strokeWidth="1" strokeDasharray="3,3" />
                  <text x={padding - 5} y={y + 3} fill="white" fontSize="8" textAnchor="end" fontFamily="monospace">
                    {gridWeight.toFixed(0)}
                  </text>
                </g>
              );
            })}

            {/* Line Path */}
            {points.length > 1 && (
              <polyline
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.5"
                points={pathString}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
              />
            )}

            {/* Glowing nodes and weight labels */}
            {points.map((p, idx) => (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#FFD54F"
                  stroke="#0D0D0D"
                  strokeWidth="1.5"
                  className="hover:scale-125 transition-transform cursor-pointer"
                />
                <text x={p.x} y={p.y - 8} fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {p.weight}
                </text>
                <text x={p.x} y={height - 10} fill="#666" fontSize="7" textAnchor="middle" fontFamily="monospace">
                  {p.date.substring(5)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Daily Trackers (Grid of Water, Protein, Calories) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Water Tracker card */}
        <div className="bg-[#1A1A1A] rounded-3xl p-5 border border-[#222] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-950/40 flex items-center justify-center border border-blue-900/30">
                <Droplet className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Hydration</span>
                <h5 className="text-sm font-bold text-white">Water Tracker</h5>
              </div>
            </div>
            <button
              onClick={resetWater}
              className="p-1 text-gray-500 hover:text-gray-300 rounded cursor-pointer"
              title="Reset Water"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl font-black text-white font-mono">{state.trackers.waterConsumed}</span>
            <span className="text-xs text-gray-500 font-bold">/ {state.trackers.waterGoal} ml</span>
          </div>

          {/* Quick Increments */}
          <div className="mt-4 flex gap-1.5">
            <button
              onClick={() => addWater(250)}
              className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer transition-all border border-neutral-850"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" /> 250ml
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer transition-all border border-neutral-850"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" /> 500ml
            </button>
          </div>
        </div>

        {/* Protein Tracker card */}
        <div className="bg-[#1A1A1A] rounded-3xl p-5 border border-[#222] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-950/40 flex items-center justify-center border border-amber-900/30">
                <Egg className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Anabolic</span>
                <h5 className="text-sm font-bold text-white">Protein Target</h5>
              </div>
            </div>
            <button
              onClick={resetProtein}
              className="p-1 text-gray-500 hover:text-gray-300 rounded cursor-pointer"
              title="Reset Protein"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl font-black text-white font-mono">{state.trackers.proteinConsumed}</span>
            <span className="text-xs text-gray-500 font-bold">/ {state.trackers.proteinGoal} g</span>
          </div>

          {/* Quick Increments */}
          <div className="mt-4 flex gap-1.5">
            <button
              onClick={() => addProtein(15)}
              className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer transition-all border border-neutral-850"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" /> 15g
            </button>
            <button
              onClick={() => addProtein(30)}
              className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer transition-all border border-neutral-850"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" /> 30g
            </button>
          </div>
        </div>

        {/* Calories Tracker card */}
        <div className="bg-[#1A1A1A] rounded-3xl p-5 border border-[#222] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-950/40 flex items-center justify-center border border-orange-900/30">
                <Flame className="w-4.5 h-4.5 text-orange-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Energy</span>
                <h5 className="text-sm font-bold text-white">Daily Calories</h5>
              </div>
            </div>
            <button
              onClick={resetCalories}
              className="p-1 text-gray-500 hover:text-gray-300 rounded cursor-pointer"
              title="Reset Calories"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl font-black text-white font-mono">{state.trackers.caloriesConsumed}</span>
            <span className="text-xs text-gray-500 font-bold">/ {state.trackers.caloriesGoal} kcal</span>
          </div>

          {/* Quick Increments */}
          <div className="mt-4 flex gap-1.5">
            <button
              onClick={() => addCalories(200)}
              className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer transition-all border border-neutral-850"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" /> 200
            </button>
            <button
              onClick={() => addCalories(400)}
              className="flex-1 py-1.5 rounded-xl bg-neutral-900 hover:bg-[#222] hover:border-[#D4AF37]/50 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-1 cursor-pointer transition-all border border-neutral-850"
            >
              <Plus className="w-3 h-3 text-[#D4AF37]" /> 400
            </button>
          </div>
        </div>
      </div>

      {/* 2. Weight Progress & Quick Log form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SVG Progress Graph */}
        {renderSVGChart()}

        {/* Weight Log card form */}
        <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Log Current Weight</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Your registered baseline is <strong className="text-white">{state.profile.currentWeight} kg</strong>. Regular monitoring provides precision feedback to tune the caloric intake curves.
            </p>
          </div>

          <form onSubmit={handleWeightSubmit} className="flex gap-2">
            <input
              type="number"
              step="0.1"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="e.g. 54.5"
              className="flex-1 bg-neutral-900 border border-[#222] rounded-xl px-4 text-xs font-bold text-white focus:outline-hidden focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#FFD54F] text-black font-extrabold text-xs cursor-pointer transition-all flex items-center gap-1"
            >
              Log Weight <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Advanced Fitness Calculators */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Advanced Fitness Calculator (BMI, BMR, Body Fat)</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Inputs */}
          <div className="space-y-2.5 bg-neutral-900/60 p-4 rounded-2xl border border-[#222]">
            <div>
              <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Height (cm)</label>
              <input
                type="number"
                value={calcHeight}
                onChange={(e) => setCalcHeight(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700/60 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Weight (kg)</label>
              <input
                type="number"
                value={calcWeight}
                onChange={(e) => setCalcWeight(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700/60 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Age (years)</label>
                <input
                  type="number"
                  value={calcAge}
                  onChange={(e) => setCalcAge(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700/60 rounded px-2.5 py-1 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Gender</label>
                <select
                  value={calcGender}
                  onChange={(e) => setCalcGender(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700/60 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <button
              onClick={runManualCalculators}
              className="w-full mt-2 py-2 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-bold font-mono text-gray-300 cursor-pointer transition-all uppercase"
            >
              Run Calculations
            </button>
          </div>

          {/* Results Summary column */}
          <div className="md:col-span-2 space-y-3 flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-2">
              {/* BMI */}
              <div className="bg-neutral-900/60 p-3 rounded-2xl border border-[#222] text-center">
                <span className="text-[9px] font-bold font-mono text-gray-400 uppercase">BMI (Calculated)</span>
                <div className="text-xl font-black text-white font-mono mt-1">
                  {calcBmiResult ?? calculations.bmi}
                </div>
                <span className="text-[9px] font-bold text-[#D4AF37] uppercase">
                  {calcBmiResult ? "Result Updated" : calculations.bmiStatus}
                </span>
              </div>

              {/* BMR */}
              <div className="bg-neutral-900/60 p-3 rounded-2xl border border-[#222] text-center">
                <span className="text-[9px] font-bold font-mono text-gray-400 uppercase">BMR (Metabolism)</span>
                <div className="text-xl font-black text-[#FFD54F] font-mono mt-1">
                  {calcBmrResult ?? calculations.bmr}
                </div>
                <span className="text-[8px] text-gray-500 font-mono">kcal / daily</span>
              </div>

              {/* Body Fat */}
              <div className="bg-neutral-900/60 p-3 rounded-2xl border border-[#222] text-center">
                <span className="text-[9px] font-bold font-mono text-gray-400 uppercase">Est. Body Fat</span>
                <div className="text-xl font-black text-white font-mono mt-1">
                  {calcFatResult ?? calculations.bodyFatEstimate}%
                </div>
                <span className="text-[8px] text-gray-500 font-mono">US Navy YMCA Formula</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 italic leading-relaxed text-center font-medium">
              *Calculations are calculated based on weight ({calcWeight} kg), height ({calcHeight} cm), age ({calcAge}), and gender ({calcGender}). Keep records accurate for high fidelity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
