import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { AchievementsGrid } from "./AchievementsGrid";
import { TrendingUp, Award, Camera, Ruler, Calendar, Trash2, Plus, UploadCloud, Info } from "lucide-react";

export const ProgressScreen: React.FC = () => {
  const { state, addWeightRecord, addMeasurementRecord, addPhoto, deletePhoto } = useApp();
  
  // Measurements inputs
  const [mChest, setMChest] = useState("");
  const [mArms, setMArms] = useState("");
  const [mWaist, setMWaist] = useState("");
  const [mLegs, setMLegs] = useState("");

  // Photo drag and drop states
  const [isDragging, setIsDragging] = useState(false);

  const handleMeasurementsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = parseFloat(mChest);
    const a = parseFloat(mArms);
    const w = parseFloat(mWaist);
    const l = parseFloat(mLegs);

    if (!isNaN(c) && !isNaN(a) && !isNaN(w) && !isNaN(l)) {
      addMeasurementRecord(c, a, w, l);
      // Reset inputs
      setMChest("");
      setMArms("");
      setMWaist("");
      setMLegs("");
    }
  };

  // Convert uploaded image to base64 for persistent client-side offline storage
  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        addPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-5 pb-20 animate-fade-in">
      {/* Premium Header */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <span className="text-[9px] font-mono font-black text-[#D4AF37] uppercase tracking-widest">90 DAY TIMELINE AND LOGS</span>
        <h2 className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" /> Metrics & Evolution History
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
          Log measurements and take weekly photos to keep accountability and gauge body recomposition. Keep your eye on the trophy!
        </p>
      </div>

      {/* 1. Achievements Section */}
      <AchievementsGrid />

      {/* 2. Transformation Photos Gallery with Drag and Drop */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4.5 h-4.5 text-[#D4AF37]" />
          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Transformation Diary</h4>
        </div>

        {/* Drag and Drop Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#D4AF37] bg-[#D4AF37]/5"
              : "border-neutral-800 bg-[#141414] hover:border-neutral-700"
          }`}
          onClick={() => document.getElementById("progress-photo-input")?.click()}
        >
          <input
            id="progress-photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <UploadCloud className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <div className="text-xs font-bold text-white">Drag and Drop Transformation Photo</div>
          <p className="text-[10px] text-gray-500 mt-1">or click to browse from device. Stored offline instantly.</p>
        </div>

        {/* Photos grid */}
        {state.photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {state.photos.map((p) => (
              <div key={p.id} className="relative rounded-xl overflow-hidden group border border-neutral-900">
                <img
                  src={p.url}
                  alt={`Progress ${p.date}`}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Date overlay bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-medium text-white">{p.date}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePhoto(p.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-gray-500">No progress photos logged yet. Click above to add your first.</div>
        )}
      </div>

      {/* 3. Measurements and Weight details logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dimensions log */}
        <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-4.5 h-4.5 text-[#D4AF37]" />
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Log Body Measurements</h4>
          </div>

          <form onSubmit={handleMeasurementsSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Chest (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={mChest}
                  onChange={(e) => setMChest(e.target.value)}
                  placeholder="e.g. 91.5"
                  className="w-full bg-neutral-900 border border-[#222] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-hidden focus:border-[#D4AF37]"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Arms (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={mArms}
                  onChange={(e) => setMArms(e.target.value)}
                  placeholder="e.g. 28.5"
                  className="w-full bg-neutral-900 border border-[#222] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-hidden focus:border-[#D4AF37]"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Waist (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={mWaist}
                  onChange={(e) => setMWaist(e.target.value)}
                  placeholder="e.g. 72"
                  className="w-full bg-neutral-900 border border-[#222] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-hidden focus:border-[#D4AF37]"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-bold font-mono text-gray-400 uppercase">Legs (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={mLegs}
                  onChange={(e) => setMLegs(e.target.value)}
                  placeholder="e.g. 48.5"
                  className="w-full bg-neutral-900 border border-[#222] rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-700 focus:outline-hidden focus:border-[#D4AF37]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#D4AF37] hover:bg-[#FFD54F] text-black font-extrabold text-xs rounded-lg cursor-pointer transition-all uppercase flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" strokeWidth={3} /> Save Measurement Record
            </button>
          </form>

          {/* Measurements timeline list */}
          <div className="space-y-2 pt-2 border-t border-[#222]">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase block">Measurements Logs</span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {state.measurementHistory.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-[11px] bg-neutral-900/60 p-2 rounded-lg border border-[#222]">
                  <span className="font-mono text-gray-400">{h.date}</span>
                  <span className="text-white font-mono">
                    C: {h.chest} | A: {h.arms} | W: {h.waist} | L: {h.legs} cm
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weight history table with scroll list */}
        <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-[#D4AF37]" />
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider">Weight History Timeline</h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-900 text-[10px] font-mono text-gray-500 uppercase">
                  <th className="pb-2">Date Logged</th>
                  <th className="pb-2 text-right">Recorded Weight</th>
                  <th className="pb-2 text-right">BMI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {state.weightHistory.map((h, i) => {
                  const hm = state.profile.height / 100;
                  const bmi = (h.weight / (hm * hm)).toFixed(1);
                  return (
                    <tr key={i} className="hover:bg-neutral-900/40">
                      <td className="py-2.5 font-mono text-gray-300">{h.date}</td>
                      <td className="py-2.5 text-right font-mono font-bold text-white">{h.weight} kg</td>
                      <td className="py-2.5 text-right font-mono text-[#D4AF37]">{bmi}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
