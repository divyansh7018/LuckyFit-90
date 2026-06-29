import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { WorkoutDetailModal } from "./WorkoutDetailModal";
import { Exercise, WorkoutDay } from "../types";
import { Dumbbell, CheckSquare, Square, Calendar, PlayCircle, Trophy, Clock, Zap } from "lucide-react";
import { motion } from "motion/react";

export const WorkoutScreen: React.FC = () => {
  const { state, toggleExerciseCompleted } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  });
  
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const currentWorkoutDay = state.workoutPlan.find((w) => w.day === selectedDay) || state.workoutPlan[0];

  const handleExerciseClick = (exercise: Exercise) => {
    setActiveExercise(exercise);
  };

  const handleCloseModal = () => {
    setActiveExercise(null);
  };

  const completedCount = currentWorkoutDay.exercises.filter((e) => e.completed).length;
  const totalCount = currentWorkoutDay.exercises.length;

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Premium header block */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-md">
        <span className="text-[9px] font-mono font-black text-[#D4AF37] uppercase tracking-widest">90 DAY ROUTINE PLANNER</span>
        <h2 className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
          <Dumbbell className="w-5 h-5 text-[#D4AF37]" /> Weekly Training Schedule
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-medium">
          Select a day to inspect your specific muscle hypertrophy target routine. Stick to the rep ranges, complete all sets, and observe strict rest times.
        </p>
      </div>

      {/* Days slider selectors */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {daysOfWeek.map((day) => {
          const isToday = (() => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return days[new Date().getDay()] === day;
          })();
          const isSelected = selectedDay === day;
          const dayPlan = state.workoutPlan.find((w) => w.day === day);
          const isRest = dayPlan?.isRest ?? false;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-center text-xs font-bold whitespace-nowrap cursor-pointer transition-all shrink-0 flex flex-col items-center gap-1 border ${
                isSelected
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-black"
                  : isToday
                  ? "bg-[#D4AF37]/10 text-white border-[#D4AF37]/30"
                  : "bg-[#141414] text-gray-400 border-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-1">
                {day.substring(0, 3)}
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#FFD54F]" />}
              </div>
              <span className={`text-[8px] uppercase tracking-wider font-mono ${isSelected ? "text-neutral-950 font-bold" : "text-gray-500"}`}>
                {isRest ? "REST" : dayPlan?.focus.split(" + ")[0] || "GYM"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Focused Target Block Card */}
      <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#222] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-[#D4AF37]" />
            <div>
              <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">{currentWorkoutDay.day} FOCUS</span>
              <h3 className="text-base font-extrabold text-white">{currentWorkoutDay.focus}</h3>
            </div>
          </div>

          {!currentWorkoutDay.isRest && (
            <span className="text-xs font-mono text-gray-400 font-bold">
              {completedCount} / {totalCount} Completed
            </span>
          )}
        </div>

        {/* Workout Completion Gauge */}
        {!currentWorkoutDay.isRest && totalCount > 0 && (
          <div className="mt-4 space-y-1">
            <div className="w-full h-1.5 bg-[#0D0D0D] rounded-full overflow-hidden border border-[#222]">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD54F] rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Exercises list */}
      {currentWorkoutDay.isRest ? (
        <div className="bg-[#1A1A1A]/40 rounded-3xl p-8 border border-[#222] border-dashed text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto border border-[#D4AF37]/20">
            <Trophy className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <div className="max-w-xs mx-auto space-y-1">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hypertrophy Recovery Day</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              No planned movements for Sunday. Deep recovery is essential for muscle tissue protein synthesis. Stay hydrated and prioritize nutrition.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {currentWorkoutDay.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`group bg-[#1A1A1A] hover:bg-[#222] p-4 rounded-3xl border transition-all flex items-center justify-between gap-3 ${
                exercise.completed ? "border-emerald-950/40 bg-neutral-900/60" : "border-[#222]"
              }`}
            >
              {/* Tap overlay trigger */}
              <div
                onClick={() => handleExerciseClick(exercise)}
                className="flex-1 min-w-0 cursor-pointer space-y-1"
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-900 text-gray-400 uppercase">
                    {exercise.restTime} Rest
                  </span>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#FFD54F]">
                    {exercise.sets} x {exercise.reps}
                  </span>
                </div>
                <h4 className={`text-sm font-bold truncate ${exercise.completed ? "text-gray-500 line-through" : "text-white group-hover:text-[#D4AF37]"}`}>
                  {exercise.name}
                </h4>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#FFD54F]" />
                  Targets: {exercise.targetMuscles.join(", ")}
                </p>
              </div>

              {/* Completion checkbox button */}
              <button
                onClick={() => toggleExerciseCompleted(selectedDay, exercise.id)}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 hover:bg-neutral-800 transition-colors cursor-pointer text-[#D4AF37]"
                id={`chk-ex-${exercise.id}`}
              >
                {exercise.completed ? (
                  <CheckSquare className="w-5.5 h-5.5 text-emerald-400" strokeWidth={2.5} />
                ) : (
                  <Square className="w-5.5 h-5.5 text-gray-600 hover:text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Active Exercise details/timer overlay Modal */}
      {activeExercise && (
        <WorkoutDetailModal
          exercise={activeExercise}
          dayName={selectedDay}
          isOpen={!!activeExercise}
          onClose={handleCloseModal}
          onToggleComplete={() => toggleExerciseCompleted(selectedDay, activeExercise.id)}
        />
      )}
    </div>
  );
};
