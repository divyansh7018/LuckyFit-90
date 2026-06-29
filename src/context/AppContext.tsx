import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, UserProfile, WeightRecord, MeasurementRecord, PhotoRecord, Exercise, Meal, Supplement, AppNotification, Achievement } from "../types";
import { DEFAULT_APP_STATE } from "../data";

interface AppContextType {
  state: AppState;
  updateProfile: (profile: UserProfile) => void;
  toggleExerciseCompleted: (day: string, exerciseId: string) => void;
  toggleMealCompleted: (mealId: string) => void;
  toggleSupplementTaken: (suppId: string) => void;
  addWater: (amount: number) => void;
  resetWater: () => void;
  addProtein: (amount: number) => void;
  resetProtein: () => void;
  addCalories: (amount: number) => void;
  resetCalories: () => void;
  addWeightRecord: (weight: number) => void;
  addMeasurementRecord: (chest: number, arms: number, waist: number, legs: number) => void;
  addPhoto: (url: string) => void;
  deletePhoto: (id: string) => void;
  toggleNotification: (id: string) => void;
  resetProgress: () => void;
  backupData: () => string;
  restoreData: (jsonString: string) => boolean;
  calculations: {
    bmi: number;
    bmiStatus: string;
    bmr: number;
    bodyFatEstimate: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("luckyfit90_state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved state", e);
      }
    }
    return DEFAULT_APP_STATE;
  });

  // Automatically save state on changes
  useEffect(() => {
    localStorage.setItem("luckyfit90_state", JSON.stringify(state));
  }, [state]);

  // Handle active day/streak calculations on load
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (state.lastActiveDate !== todayStr) {
      setState((prev) => {
        let newStreak = prev.streak;
        if (prev.lastActiveDate) {
          const lastDate = new Date(prev.lastActiveDate);
          const today = new Date(todayStr);
          const diffTime = Math.abs(today.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1; // Streak broken, reset to 1
          }
        } else {
          newStreak = 1;
        }

        // Reset daily metrics if it's a new day
        const resetTrackers = {
          ...prev.trackers,
          waterConsumed: 0,
          proteinConsumed: 0,
          caloriesConsumed: 0
        };

        const resetMeals = prev.meals.map((m) => ({ ...m, completed: false }));
        const resetSupplements = prev.supplements.map((s) => ({ ...s, taken: false }));
        const resetWorkouts = prev.workoutPlan.map((day) => ({
          ...day,
          exercises: day.exercises.map((ex) => ({ ...ex, completed: false }))
        }));

        // Check streak achievements
        const updatedAchievements = prev.achievements.map((ach) => {
          let progressCurrent = ach.progressCurrent;
          if (ach.id === "ach-streak-7") progressCurrent = Math.min(7, newStreak);
          if (ach.id === "ach-streak-30") progressCurrent = Math.min(30, newStreak);
          if (ach.id === "ach-streak-90") progressCurrent = Math.min(90, newStreak);

          const unlocked = progressCurrent >= ach.progressMax;
          return {
            ...ach,
            progressCurrent,
            unlocked,
            unlockedAt: unlocked && !ach.unlocked ? todayStr : ach.unlockedAt
          };
        });

        return {
          ...prev,
          streak: newStreak,
          lastActiveDate: todayStr,
          trackers: resetTrackers,
          meals: resetMeals,
          supplements: resetSupplements,
          workoutPlan: resetWorkouts,
          achievements: updatedAchievements
        };
      });
    }
  }, []);

  // Recalculate achievements helper
  const runAchievementsCheck = (updatedState: AppState): Achievement[] => {
    const todayStr = new Date().toISOString().split("T")[0];
    return updatedState.achievements.map((ach) => {
      if (ach.unlocked) return ach;

      let current = ach.progressCurrent;
      if (ach.id === "ach-streak-7") current = Math.min(7, updatedState.streak);
      if (ach.id === "ach-streak-30") current = Math.min(30, updatedState.streak);
      if (ach.id === "ach-streak-90") current = Math.min(90, updatedState.streak);

      if (ach.id === "ach-workout") {
        // Count how many exercises have been completed historically (could be simulated)
        // Or simply keep track of completed exercises in state
      }

      const unlocked = current >= ach.progressMax;
      return {
        ...ach,
        progressCurrent: current,
        unlocked,
        unlockedAt: unlocked ? todayStr : undefined
      };
    });
  };

  // 1. Update Profile
  const updateProfile = (profile: UserProfile) => {
    setState((prev) => {
      // Calculate new target goals based on goals
      const waterGoal = 3000; // default ml
      let proteinGoal = Math.round(profile.currentWeight * 2); // 2g per kg for muscle gain
      let caloriesGoal = Math.round(10 * profile.currentWeight + 6.25 * profile.height - 5 * profile.age + 5); // Base BMR
      
      if (profile.goal === "Muscle Gain") {
        caloriesGoal = Math.round(caloriesGoal * 1.5 + 400); // Surplus
      } else if (profile.goal === "Fat Loss") {
        caloriesGoal = Math.round(caloriesGoal * 1.3 - 400); // Deficit
        proteinGoal = Math.round(profile.currentWeight * 2.2);
      } else {
        caloriesGoal = Math.round(caloriesGoal * 1.4); // Maintenance / Activity
      }

      const nextWeightHistory = [...prev.weightHistory];
      const todayStr = new Date().toISOString().split("T")[0];
      const existingIndex = nextWeightHistory.findIndex((w) => w.date === todayStr);
      if (existingIndex > -1) {
        nextWeightHistory[existingIndex].weight = profile.currentWeight;
      } else {
        nextWeightHistory.push({ date: todayStr, weight: profile.currentWeight });
      }

      return {
        ...prev,
        profile,
        trackers: {
          ...prev.trackers,
          waterGoal,
          proteinGoal,
          caloriesGoal
        },
        weightHistory: nextWeightHistory
      };
    });
  };

  // 2. Toggle Exercise
  const toggleExerciseCompleted = (dayName: string, exerciseId: string) => {
    setState((prev) => {
      const updatedWorkoutPlan = prev.workoutPlan.map((day) => {
        if (day.day !== dayName) return day;
        return {
          ...day,
          exercises: day.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            return { ...ex, completed: !ex.completed };
          })
        };
      });

      // Workout Master Progress tracker
      const beforeCompletedCount = prev.workoutPlan
        .flatMap((d) => d.exercises)
        .filter((e) => e.completed).length;

      const afterCompletedCount = updatedWorkoutPlan
        .flatMap((d) => d.exercises)
        .filter((e) => e.completed).length;

      let addedWorkoutsCount = 0;
      if (afterCompletedCount > beforeCompletedCount) {
        // Just completed an exercise, count toward workout achievement if all completed in a day
        const day = updatedWorkoutPlan.find((d) => d.day === dayName);
        if (day && day.exercises.every((e) => e.completed)) {
          addedWorkoutsCount = 1;
        }
      }

      const updatedAchievements = prev.achievements.map((ach) => {
        if (ach.id === "ach-workout") {
          const nextVal = Math.min(ach.progressMax, ach.progressCurrent + addedWorkoutsCount);
          return {
            ...ach,
            progressCurrent: nextVal,
            unlocked: nextVal >= ach.progressMax,
            unlockedAt: nextVal >= ach.progressMax && !ach.unlocked ? new Date().toISOString().split("T")[0] : ach.unlockedAt
          };
        }
        return ach;
      });

      return {
        ...prev,
        workoutPlan: updatedWorkoutPlan,
        achievements: updatedAchievements
      };
    });
  };

  // 3. Toggle Meal
  const toggleMealCompleted = (mealId: string) => {
    setState((prev) => {
      const meal = prev.meals.find((m) => m.id === mealId);
      if (!meal) return prev;

      const isBecomingCompleted = !meal.completed;
      const updatedMeals = prev.meals.map((m) => {
        if (m.id !== mealId) return m;
        return { ...m, completed: isBecomingCompleted };
      });

      // Update tracker consumption values automatically
      const caloriesDiff = isBecomingCompleted ? meal.calories : -meal.calories;
      const proteinDiff = isBecomingCompleted ? meal.protein : -meal.protein;

      const nextCalories = Math.max(0, prev.trackers.caloriesConsumed + caloriesDiff);
      const nextProtein = Math.max(0, prev.trackers.proteinConsumed + proteinDiff);

      // Check for Protein Goal Achievement
      let proteinGoalIncrement = 0;
      if (nextProtein >= prev.trackers.proteinGoal && prev.trackers.proteinConsumed < prev.trackers.proteinGoal) {
        proteinGoalIncrement = 1;
      } else if (nextProtein < prev.trackers.proteinGoal && prev.trackers.proteinConsumed >= prev.trackers.proteinGoal) {
        proteinGoalIncrement = -1;
      }

      const updatedAchievements = prev.achievements.map((ach) => {
        if (ach.id === "ach-protein" && proteinGoalIncrement !== 0) {
          const nextVal = Math.max(0, Math.min(ach.progressMax, ach.progressCurrent + proteinGoalIncrement));
          return {
            ...ach,
            progressCurrent: nextVal,
            unlocked: nextVal >= ach.progressMax,
            unlockedAt: nextVal >= ach.progressMax && !ach.unlocked ? new Date().toISOString().split("T")[0] : ach.unlockedAt
          };
        }
        return ach;
      });

      return {
        ...prev,
        meals: updatedMeals,
        trackers: {
          ...prev.trackers,
          caloriesConsumed: nextCalories,
          proteinConsumed: nextProtein
        },
        achievements: updatedAchievements
      };
    });
  };

  // 4. Toggle Supplement Taken
  const toggleSupplementTaken = (suppId: string) => {
    setState((prev) => {
      const updatedSupplements = prev.supplements.map((s) => {
        if (s.id !== suppId) return s;
        return { ...s, taken: !s.taken };
      });
      return {
        ...prev,
        supplements: updatedSupplements
      };
    });
  };

  // 5. Trackers additions
  const addWater = (amount: number) => {
    setState((prev) => {
      const nextWater = Math.max(0, prev.trackers.waterConsumed + amount);

      // Check hydration hero achievement
      let waterGoalIncrement = 0;
      if (nextWater >= prev.trackers.waterGoal && prev.trackers.waterConsumed < prev.trackers.waterGoal) {
        waterGoalIncrement = 1;
      }

      const updatedAchievements = prev.achievements.map((ach) => {
        if (ach.id === "ach-water" && waterGoalIncrement > 0) {
          const nextVal = Math.min(ach.progressMax, ach.progressCurrent + waterGoalIncrement);
          return {
            ...ach,
            progressCurrent: nextVal,
            unlocked: nextVal >= ach.progressMax,
            unlockedAt: nextVal >= ach.progressMax && !ach.unlocked ? new Date().toISOString().split("T")[0] : ach.unlockedAt
          };
        }
        return ach;
      });

      return {
        ...prev,
        trackers: {
          ...prev.trackers,
          waterConsumed: nextWater
        },
        achievements: updatedAchievements
      };
    });
  };

  const resetWater = () => {
    setState((prev) => ({
      ...prev,
      trackers: { ...prev.trackers, waterConsumed: 0 }
    }));
  };

  const addProtein = (amount: number) => {
    setState((prev) => {
      const nextProtein = Math.max(0, prev.trackers.proteinConsumed + amount);
      return {
        ...prev,
        trackers: { ...prev.trackers, proteinConsumed: nextProtein }
      };
    });
  };

  const resetProtein = () => {
    setState((prev) => ({
      ...prev,
      trackers: { ...prev.trackers, proteinConsumed: 0 }
    }));
  };

  const addCalories = (amount: number) => {
    setState((prev) => {
      const nextCalories = Math.max(0, prev.trackers.caloriesConsumed + amount);
      return {
        ...prev,
        trackers: { ...prev.trackers, caloriesConsumed: nextCalories }
      };
    });
  };

  const resetCalories = () => {
    setState((prev) => ({
      ...prev,
      trackers: { ...prev.trackers, caloriesConsumed: 0 }
    }));
  };

  // 6. Weight & measurements logs
  const addWeightRecord = (weight: number) => {
    setState((prev) => {
      const todayStr = new Date().toISOString().split("T")[0];
      const nextWeightHistory = [...prev.weightHistory];
      const existingIdx = nextWeightHistory.findIndex((w) => w.date === todayStr);

      if (existingIdx > -1) {
        nextWeightHistory[existingIdx].weight = weight;
      } else {
        nextWeightHistory.push({ date: todayStr, weight });
      }

      // Also sync current profile weight
      const nextProfile = { ...prev.profile, currentWeight: weight };

      return {
        ...prev,
        profile: nextProfile,
        weightHistory: nextWeightHistory
      };
    });
  };

  const addMeasurementRecord = (chest: number, arms: number, waist: number, legs: number) => {
    setState((prev) => {
      const todayStr = new Date().toISOString().split("T")[0];
      const nextMeasurementHistory = [...prev.measurementHistory];
      const existingIdx = nextMeasurementHistory.findIndex((m) => m.date === todayStr);

      const record: MeasurementRecord = {
        date: todayStr,
        chest,
        arms,
        waist,
        legs
      };

      if (existingIdx > -1) {
        nextMeasurementHistory[existingIdx] = record;
      } else {
        nextMeasurementHistory.push(record);
      }

      return {
        ...prev,
        measurementHistory: nextMeasurementHistory
      };
    });
  };

  const addPhoto = (url: string) => {
    setState((prev) => {
      const todayStr = new Date().toISOString().split("T")[0];
      const newPhoto: PhotoRecord = {
        id: `photo-${Date.now()}`,
        date: todayStr,
        url
      };
      return {
        ...prev,
        photos: [newPhoto, ...prev.photos]
      };
    });
  };

  const deletePhoto = (id: string) => {
    setState((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id)
    }));
  };

  // 7. Notifications settings toggles
  const toggleNotification = (id: string) => {
    setState((prev) => {
      const updatedNotifs = prev.notifications.map((notif) => {
        if (notif.id !== id) return notif;
        return { ...notif, enabled: !notif.enabled };
      });
      return {
        ...prev,
        notifications: updatedNotifs
      };
    });
  };

  // 8. Resets / Backups
  const resetProgress = () => {
    setState(DEFAULT_APP_STATE);
    localStorage.setItem("luckyfit90_state", JSON.stringify(DEFAULT_APP_STATE));
  };

  const backupData = () => {
    return JSON.stringify(state);
  };

  const restoreData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && parsed.workoutPlan) {
        setState(parsed);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Calculations: BMI, BMR, Body Fat Estimate
  const calculateMetrics = () => {
    const { currentWeight, height, age, goal } = state.profile;
    const heightInMeters = height / 100;
    const bmi = Number((currentWeight / (heightInMeters * heightInMeters)).toFixed(1));

    let bmiStatus = "Healthy";
    if (bmi < 18.5) bmiStatus = "Underweight";
    else if (bmi >= 18.5 && bmi < 25) bmiStatus = "Healthy Weight";
    else if (bmi >= 25 && bmi < 30) bmiStatus = "Overweight";
    else bmiStatus = "Obese";

    // Harris-Benedict Equation for BMR (Male default, user is "Lucky", age 25, height 173cm, weight 53kg)
    // BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
    const bmr = Math.round(88.362 + 13.397 * currentWeight + 4.799 * height - 5.677 * age);

    // US Navy Circumference Method / YMCA Estimate for Body Fat
    // Since we don't always have full circumferences, let's estimate based on BMI and age
    // Formula: BF% = (1.20 * BMI) + (0.23 * Age) - 16.2 (assuming male, which Lucky fit is)
    const bodyFatEstimate = Math.max(3, Number((1.2 * bmi + 0.23 * age - 16.2).toFixed(1)));

    return { bmi, bmiStatus, bmr, bodyFatEstimate };
  };

  const calculations = calculateMetrics();

  return (
    <AppContext.Provider
      value={{
        state,
        updateProfile,
        toggleExerciseCompleted,
        toggleMealCompleted,
        toggleSupplementTaken,
        addWater,
        resetWater,
        addProtein,
        resetProtein,
        addCalories,
        resetCalories,
        addWeightRecord,
        addMeasurementRecord,
        addPhoto,
        deletePhoto,
        toggleNotification,
        resetProgress,
        backupData,
        restoreData,
        calculations
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
