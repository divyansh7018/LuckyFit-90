import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, Shield, Info, RotateCcw, Save, Bell, Sparkles, Copy, Download, RefreshCw, ClipboardCheck, Egg, Coffee, Sparkle } from "lucide-react";
import { UserProfile } from "../types";

export const ProfileScreen: React.FC = () => {
  const { state, updateProfile, toggleNotification, resetProgress, backupData, restoreData, toggleSupplementTaken } = useApp();

  // Profile Form States
  const [name, setName] = useState(state.profile.name);
  const [age, setAge] = useState(state.profile.age.toString());
  const [height, setHeight] = useState(state.profile.height.toString());
  const [currentWeight, setCurrentWeight] = useState(state.profile.currentWeight.toString());
  const [goalWeight, setGoalWeight] = useState(state.profile.goalWeight.toString());
  const [goal, setGoal] = useState<any>(state.profile.goal);
  const [experience, setExperience] = useState<any>(state.profile.experience);

  // Backup & restore text states
  const [backupText, setBackupText] = useState("");
  const [restoreText, setRestoreText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // Save profile trigger
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseInt(age);
    const h = parseInt(height);
    const cw = parseFloat(currentWeight);
    const gw = parseFloat(goalWeight);

    if (name.trim() && !isNaN(a) && !isNaN(h) && !isNaN(cw) && !isNaN(gw)) {
      const updated: UserProfile = {
        name,
        age: a,
        height: h,
        currentWeight: cw,
        goalWeight: gw,
        goal,
        experience
      };
      updateProfile(updated);
      setSaveStatus(true);
      setTimeout(() => setSaveStatus(false), 3000);
    }
  };

  const handleGenerateBackup = () => {
    const json = backupData();
    setBackupText(json);
    setIsCopied(false);
  };

  const handleCopyBackup = () => {
    navigator.clipboard.writeText(backupText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRestoreSubmit = () => {
    if (!restoreText.trim()) return;
    const ok = restoreData(restoreText);
    if (ok) {
      setRestoreStatus("success");
      setRestoreText("");
      setTimeout(() => setRestoreStatus(null), 3000);
    } else {
      setRestoreStatus("fail");
      setTimeout(() => setRestoreStatus(null), 3000);
    }
  };

  const handleResetClick = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetProgress();
    // Reset form states to default values
    setName("Lucky");
    setAge("25");
    setHeight("173");
    setCurrentWeight("53");
    setGoalWeight("62");
    setGoal("Muscle Gain");
    setExperience("Beginner");
    setConfirmReset(false);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* 1. Header Information */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <span className="text-[9px] font-mono font-black text-[#D4AF37] uppercase tracking-widest">USER PROFILES AND PREFERENCES</span>
        <h2 className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
          <User className="w-5 h-5 text-[#D4AF37]" /> Profile Optimization Suite
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
          Calibrate user statistics, manage anabolic supplement checklists, toggle notifications, and perform robust offline state backups.
        </p>
      </div>

      {/* 2. Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <User className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Configure Personal Stats</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Name & Age */}
          <div>
            <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
              required
            />
          </div>
          <div>
            <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
              required
            />
          </div>

          {/* Height & Weights */}
          <div>
            <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                required
              />
            </div>
            <div>
              <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Goal Wt (kg)</label>
              <input
                type="number"
                step="0.1"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                required
              />
            </div>
          </div>

          {/* Goal & Experience selectors */}
          <div>
            <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Hypertrophy Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
            >
              <option value="Muscle Gain">Muscle Gain (Anabolic Surplus)</option>
              <option value="Fat Loss">Fat Loss (Thermogenic Deficit)</option>
              <option value="Maintenance">Maintenance (Homeostatic Balance)</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value as any)}
              className="w-full bg-neutral-900 border border-[#222] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
            >
              <option value="Beginner">Beginner (Adaptation Cycle)</option>
              <option value="Intermediate">Intermediate (Overload Cycle)</option>
              <option value="Advanced">Advanced (Periodized Cycle)</option>
            </select>
          </div>
        </div>

        {saveStatus && (
          <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase text-center bg-[#D4AF37]/5 py-1 border border-emerald-950/40 rounded-lg">
            ✓ User Profile Statistics Locked and Calibrated!
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#FFD54F] text-black font-extrabold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
        >
          <Save className="w-4 h-4 text-current" strokeWidth={2.5} /> Lock & Apply Changes
        </button>
      </form>

      {/* 3. Supplements Daily Tracker */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <Egg className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Supplement Intake Tracker</h3>
        </div>

        <div className="space-y-2">
          {state.supplements.map((supp) => (
            <div
              key={supp.id}
              onClick={() => toggleSupplementTaken(supp.id)}
              className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                supp.taken
                  ? "bg-[#D4AF37]/5 border-[#D4AF37]/30 text-[#FFD54F]"
                  : "bg-neutral-900 border-[#222] text-gray-400 hover:border-neutral-700"
              }`}
              id={`chk-supp-${supp.id}`}
            >
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono font-bold block uppercase text-gray-500">
                  Daily Intake • {supp.dosage}
                </span>
                <span className="text-xs font-bold text-white">{supp.name}</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                supp.taken ? "bg-[#D4AF37] border-[#D4AF37]" : "border-gray-700 bg-black/40"
              }`}>
                {supp.taken && <div className="w-1.5 h-3 border-r-2 border-b-2 border-black rotate-45 mb-0.5" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Notification Toggles block */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <Bell className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Simulation Notifications</h3>
        </div>

        <div className="space-y-2.5">
          {state.notifications.map((n) => (
            <div key={n.id} className="flex items-center justify-between py-1 border-b border-[#222] last:border-0 pb-2">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  {n.title}
                  <span className="text-[8px] font-mono px-1 py-0.5 bg-neutral-900 text-gray-400 rounded">
                    {n.time}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-snug font-medium">{n.body}</p>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => toggleNotification(n.id)}
                className={`relative w-9 h-5 rounded-full transition-colors focus:outline-hidden cursor-pointer ${
                  n.enabled ? "bg-[#D4AF37]" : "bg-neutral-800"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    n.enabled ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Backup & Restore */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <Download className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Data Redundancy (Backup & Restore)</h3>
        </div>

        <div className="space-y-3">
          {/* Backup generate trigger */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase">Generate Export State JSON</span>
              <button
                onClick={handleGenerateBackup}
                className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 border border-[#222] rounded text-[9px] font-mono text-gray-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-[#D4AF37]" /> Generate State
              </button>
            </div>
            {backupText && (
              <div className="relative">
                <textarea
                  readOnly
                  value={backupText}
                  className="w-full h-16 bg-neutral-950 border border-[#222] rounded-lg p-2 text-[9px] text-gray-400 font-mono focus:outline-hidden"
                />
                <button
                  onClick={handleCopyBackup}
                  className="absolute bottom-2 right-2 px-2 py-1 bg-[#D4AF37] hover:bg-[#FFD54F] text-black text-[9px] font-mono font-bold rounded flex items-center gap-1 cursor-pointer"
                >
                  {isCopied ? <ClipboardCheck className="w-3 h-3 text-current" /> : <Copy className="w-3 h-3 text-current" />}
                  {isCopied ? "Copied!" : "Copy State"}
                </button>
              </div>
            )}
          </div>

          {/* Restore input panel */}
          <div className="space-y-1.5 border-t border-[#222] pt-3">
            <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block">Restore State</span>
            <div className="flex gap-2">
              <textarea
                value={restoreText}
                onChange={(e) => setRestoreText(e.target.value)}
                placeholder="Paste backup JSON string here..."
                className="flex-1 h-12 bg-neutral-950 border border-[#222] rounded-lg p-2 text-[9px] text-gray-400 font-mono placeholder-gray-700 focus:outline-hidden"
              />
              <button
                onClick={handleRestoreSubmit}
                className="px-4 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black font-extrabold text-xs rounded-lg transition-colors cursor-pointer text-gray-300"
              >
                Restore
              </button>
            </div>
            {restoreStatus === "success" && (
              <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase">✓ State successfully restored and reloaded!</p>
            )}
            {restoreStatus === "fail" && (
              <p className="text-[10px] text-rose-500 font-mono font-bold uppercase">✗ Invalid JSON payload. Restoration failed.</p>
            )}
          </div>
        </div>
      </div>

      {/* 6. System Cleanse / Resets */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#222]">
          <RotateCcw className="w-4 h-4 text-red-500" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Danger Zone</h3>
        </div>
        <p className="text-[11px] text-gray-500 leading-snug font-medium">
          Initiate a system cleanse. This deletes all active weight histories, muscle dimensions, transformation photo uploads, and unlocks.
        </p>
        
        {confirmReset ? (
          <div className="space-y-2 p-3 bg-red-950/20 border border-red-900/40 rounded-2xl">
            <p className="text-[10px] text-red-400 font-mono font-bold uppercase">⚠️ Warning: This action is permanent!</p>
            <div className="flex gap-2">
              <button
                onClick={handleResetClick}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black cursor-pointer uppercase transition-all"
              >
                Yes, Cleanse State
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-gray-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleResetClick}
            className="w-full py-2 bg-red-950/20 hover:bg-red-950 text-red-400 hover:text-white rounded-xl text-xs font-extrabold cursor-pointer border border-red-900/40 transition-all uppercase"
          >
            Reset Application State
          </button>
        )}
      </div>

      {/* 7. About application meta */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-2 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] font-sans font-black tracking-wider text-sm">
          <Shield className="w-4 h-4 text-current" />
          <span>LUCKYFIT 90 PRO</span>
        </div>
        <p className="text-[10px] text-gray-500 font-mono max-w-xs mx-auto leading-relaxed">
          Version 1.0.0 (Gold) • Offline Secured Sandbox Database • Optimized for Clean Architecture React/TypeScript
        </p>
      </div>
    </div>
  );
};
