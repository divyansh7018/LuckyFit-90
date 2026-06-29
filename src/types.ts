export interface Exercise {
  id: string;
  name: string;
  instructions: string[];
  sets: number;
  reps: string;
  restTime: string; // e.g. "90s"
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  targetMuscles: string[];
  animationType: "chest_press" | "tricep_pushdown" | "lat_pulldown" | "bicep_curl" | "squat" | "leg_press" | "shoulder_press" | "lateral_raise" | "pushup" | "crunch";
  completed: boolean;
}

export interface WorkoutDay {
  day: string; // Monday, Tuesday, etc.
  focus: string; // e.g. "Chest + Triceps"
  isRest: boolean;
  exercises: Exercise[];
}

export interface Meal {
  id: string;
  name: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string; // e.g. "08:00 AM"
  completed: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  reminderTime: string;
  taken: boolean;
}

export interface WeightRecord {
  date: string; // YYYY-MM-DD
  weight: number;
}

export interface MeasurementRecord {
  date: string;
  chest: number;
  arms: number;
  waist: number;
  legs: number;
}

export interface PhotoRecord {
  id: string;
  date: string;
  url: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string; // Lucide icon name
  progressMax: number;
  progressCurrent: number;
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // in cm
  currentWeight: number; // in kg
  goalWeight: number; // in kg
  goal: "Muscle Gain" | "Fat Loss" | "Endurance" | "Maintenance";
  experience: "Beginner" | "Intermediate" | "Advanced";
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  category: "workout" | "meal" | "water" | "sleep" | "supplement" | "motivation";
  enabled: boolean;
}

export interface TrackerState {
  waterGoal: number; // e.g. 3000 ml
  waterConsumed: number; // in ml
  proteinGoal: number; // in g
  proteinConsumed: number; // in g
  caloriesGoal: number; // in kcal
  caloriesConsumed: number; // in kcal
}

export interface AppState {
  profile: UserProfile;
  workoutPlan: WorkoutDay[];
  meals: Meal[];
  supplements: Supplement[];
  trackers: TrackerState;
  weightHistory: WeightRecord[];
  measurementHistory: MeasurementRecord[];
  photos: PhotoRecord[];
  achievements: Achievement[];
  notifications: AppNotification[];
  streak: number;
  lastActiveDate?: string;
}
