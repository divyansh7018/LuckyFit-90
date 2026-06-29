import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Check, X, ShieldAlert, Award, Clock, ArrowRight, Activity, Dumbbell } from "lucide-react";
import { Exercise } from "../types";

interface WorkoutDetailModalProps {
  exercise: Exercise;
  dayName: string;
  isOpen: boolean;
  onClose: () => void;
  onToggleComplete: () => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  exercise,
  dayName,
  isOpen,
  onClose,
  onToggleComplete
}) => {
  const [time, setTime] = useState(0); // in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restCountdown, setRestCountdown] = useState(0);

  // Parse rest seconds
  const getRestSeconds = () => {
    const val = parseInt(exercise.restTime);
    return isNaN(val) ? 60 : val;
  };

  // Stopwatch effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && !isResting) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isResting]);

  // Rest timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isResting && restCountdown > 0) {
      interval = setInterval(() => {
        setRestCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isResting && restCountdown === 0) {
      setIsResting(false);
      setIsTimerActive(true);
      if (currentSet < exercise.sets) {
        setCurrentSet((prev) => prev + 1);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isResting, restCountdown, currentSet, exercise.sets]);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsTimerActive(false);
    setIsResting(false);
    setRestCountdown(0);
    setCurrentSet(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRest = () => {
    setIsResting(true);
    setIsTimerActive(false);
    setRestCountdown(getRestSeconds());
  };

  const handleFinishExercise = () => {
    onToggleComplete();
    resetTimer();
    onClose();
  };

  if (!isOpen) return null;

  // Exercise visual animations based on type using pure, beautiful CSS keyframes!
  const renderExerciseAnimation = () => {
    return (
      <div className="relative w-full h-44 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex items-center justify-center">
        {/* Grid backgrounds */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
        
        {/* Humanoid schematic / target muscle rendering */}
        <div className="absolute top-2 left-3 bg-[#1A1A1A] px-2 py-0.5 rounded border border-gray-800/80">
          <span className="text-[10px] text-[#D4AF37] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" /> Live Visual Loop
          </span>
        </div>

        {/* Animation content */}
        <div className="flex flex-col items-center justify-center scale-90">
          {exercise.animationType === "chest_press" && (
            <div className="flex flex-col items-center">
              {/* Chest outline */}
              <div className="relative w-16 h-12 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                <div className="absolute left-1 top-3 bottom-3 w-4 bg-[#D4AF37] opacity-60 rounded-sm animate-pulse" />
                <div className="absolute right-1 top-3 bottom-3 w-4 bg-[#D4AF37] opacity-60 rounded-sm animate-pulse" />
                <div className="text-[10px] text-gray-500 font-mono font-semibold">CHEST</div>
              </div>
              {/* Pressing barbell/dumbbells */}
              <div className="w-24 h-1.5 bg-neutral-600 rounded-full mt-3 animate-bounce flex justify-between px-2">
                <div className="w-3 h-3 bg-[#FFD54F] rounded-sm -mt-0.5" />
                <div className="w-3 h-3 bg-[#FFD54F] rounded-sm -mt-0.5" />
              </div>
            </div>
          )}

          {exercise.animationType === "tricep_pushdown" && (
            <div className="flex flex-col items-center">
              <div className="relative w-12 h-16 bg-neutral-800 rounded-lg flex flex-col items-center justify-between py-2 border border-neutral-700">
                {/* Highlight triceps */}
                <div className="absolute right-0 top-4 w-1.5 h-6 bg-[#D4AF37] rounded-l animate-pulse" />
                <div className="absolute left-0 top-4 w-1.5 h-6 bg-[#D4AF37] rounded-r animate-pulse" />
                <div className="text-[8px] text-gray-500 font-mono">TRICEPS</div>
              </div>
              {/* Pulley motion */}
              <div className="w-8 h-[2px] bg-neutral-400 mt-2 animate-bounce" />
            </div>
          )}

          {exercise.animationType === "lat_pulldown" && (
            <div className="flex flex-col items-center">
              {/* Back / Lats */}
              <div className="relative w-16 h-14 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                <div className="absolute left-1 bottom-2 top-2 w-3 bg-[#D4AF37]/80 rounded-sm animate-ping" />
                <div className="absolute right-1 bottom-2 top-2 w-3 bg-[#D4AF37]/80 rounded-sm animate-ping" />
                <div className="text-[10px] text-gray-500 font-mono">LATS</div>
              </div>
              {/* Pulldown bar */}
              <div className="w-24 h-1 bg-neutral-400 rounded mt-2 animate-pulse" />
            </div>
          )}

          {exercise.animationType === "bicep_curl" && (
            <div className="flex flex-col items-center">
              <div className="relative w-14 h-14 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                <div className="absolute -left-1 top-4 w-3 h-5 bg-[#D4AF37] rounded-full animate-bounce" />
                <div className="absolute -right-1 top-4 w-3 h-5 bg-[#D4AF37] rounded-full animate-bounce" />
                <div className="text-[10px] text-gray-500 font-mono">BICEPS</div>
              </div>
            </div>
          )}

          {exercise.animationType === "squat" && (
            <div className="flex flex-col items-center">
              <div className="text-center mb-1 text-[9px] font-mono text-gray-500">QUADS & GLUTES</div>
              <div className="w-10 h-10 bg-[#1A1A1A] border-2 border-dashed border-[#D4AF37]/50 rounded-full flex items-center justify-center animate-bounce">
                <Dumbbell className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
          )}

          {exercise.animationType === "leg_press" && (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-neutral-800 border border-neutral-700 rounded-lg flex flex-col justify-around p-1">
                <div className="w-full h-2 bg-[#D4AF37] rounded animate-pulse" />
                <div className="text-[8px] text-gray-500 text-center font-mono">LEG PRESS</div>
              </div>
            </div>
          )}

          {exercise.animationType === "shoulder_press" && (
            <div className="flex flex-col items-center">
              <div className="relative w-14 h-12 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                <div className="absolute left-1 -top-1 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
                <div className="absolute right-1 -top-1 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
                <div className="text-[10px] text-gray-500 font-mono">SHOULDERS</div>
              </div>
              <div className="w-20 h-1 bg-neutral-500 mt-2 animate-pulse" />
            </div>
          )}

          {exercise.animationType === "lateral_raise" && (
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-12 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
                <div className="absolute -left-2 top-2 w-2 h-4 bg-[#D4AF37] rounded-l animate-pulse" />
                <div className="absolute -right-2 top-2 w-2 h-4 bg-[#D4AF37] rounded-r animate-pulse" />
                <div className="text-[9px] text-gray-500 font-mono">SIDE DELTS</div>
              </div>
            </div>
          )}

          {exercise.animationType === "pushup" && (
            <div className="flex flex-col items-center">
              <div className="w-20 h-2 bg-neutral-800 border border-neutral-700 rounded relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 bg-[#D4AF37] w-1/2 animate-pulse" />
              </div>
              <div className="text-[9px] text-gray-500 font-mono mt-1">PUSHUP INTENSITY</div>
            </div>
          )}

          {exercise.animationType === "crunch" && (
            <div className="flex flex-col items-center">
              <div className="relative w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37]/30 border border-[#D4AF37] animate-ping" />
                <div className="text-[9px] text-gray-500 font-mono">CORE</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-[#1A1A1A] w-full max-w-md rounded-2xl overflow-hidden border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-900 bg-[#121212]">
          <div>
            <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">{dayName} Program</span>
            <h3 className="text-lg font-bold text-white">{exercise.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Difficulty and muscles row */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded bg-[#D4AF37]/10 text-[#FFD54F] border border-[#D4AF37]/30 text-xs font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {exercise.difficulty}
            </span>
            {exercise.targetMuscles.map((muscle) => (
              <span key={muscle} className="px-2.5 py-1 rounded bg-neutral-800 text-gray-300 border border-neutral-700/60 text-xs font-medium">
                {muscle}
              </span>
            ))}
          </div>

          {/* Core Exercise Visual representation */}
          {renderExerciseAnimation()}

          {/* Sets, Reps, Rest stats layout */}
          <div className="grid grid-cols-3 gap-2 text-center bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl">
            <div className="border-r border-neutral-800/80">
              <div className="text-[10px] font-mono font-medium text-gray-400 uppercase">Sets Target</div>
              <div className="text-lg font-extrabold text-white">{exercise.sets} Sets</div>
            </div>
            <div className="border-r border-neutral-800/80">
              <div className="text-[10px] font-mono font-medium text-gray-400 uppercase">Repetitions</div>
              <div className="text-lg font-extrabold text-[#D4AF37]">{exercise.reps}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono font-medium text-gray-400 uppercase">Rest Period</div>
              <div className="text-lg font-extrabold text-white">{exercise.restTime}</div>
            </div>
          </div>

          {/* Stopwatch / Rest Timer Widget */}
          <div className="bg-[#121212] rounded-xl p-4 border border-gray-900 text-center space-y-3">
            {isResting ? (
              <div>
                <span className="text-xs uppercase font-mono text-[#FFD54F] tracking-widest font-extrabold">Active Recovery Rest</span>
                <div className="text-4xl font-black font-mono text-white tracking-widest animate-pulse mt-1">
                  {restCountdown}s
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Next Up: Set {currentSet} of {exercise.sets}
                </div>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase font-mono text-gray-400 tracking-wider">Exercise stopwatch</span>
                <div className="text-3xl font-black font-mono text-white tracking-widest mt-1">
                  {formatTime(time)}
                </div>
                <div className="text-xs text-[#D4AF37] font-semibold mt-1">
                  Set {currentSet} of {exercise.sets}
                </div>
              </div>
            )}

            {/* Timer controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetTimer}
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer hover:bg-neutral-700"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleTimer}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-black cursor-pointer shadow-lg transition-transform hover:scale-105 ${
                  isTimerActive ? "bg-[#FFD54F]" : "bg-[#D4AF37]"
                }`}
              >
                {isTimerActive ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black translate-x-0.5" />}
              </button>

              <button
                onClick={startRest}
                disabled={isResting}
                className="px-4 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Skip to Rest
              </button>
            </div>
          </div>

          {/* Instructions checklist */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#D4AF37]">Instructions</h4>
            <ul className="space-y-2">
              {exercise.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs text-gray-300 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700/80 text-center flex items-center justify-center text-[10px] font-bold text-[#D4AF37] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-gray-900 bg-[#121212] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            Go Back
          </button>
          
          <button
            onClick={handleFinishExercise}
            className={`flex-1 py-3 text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shadow-[0_4px_15px_rgba(212,175,55,0.2)] ${
              exercise.completed
                ? "bg-neutral-600 hover:bg-neutral-500 text-white shadow-none"
                : "bg-gradient-to-r from-[#D4AF37] to-[#FFD54F]"
            }`}
          >
            <Check className="w-4 h-4 text-current" strokeWidth={3} />
            {exercise.completed ? "Mark Incomplete" : "Mark as Completed"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
