import { AppState, UserProfile, WorkoutDay, Meal, Supplement, Achievement, AppNotification } from "./types";

export const MOTIVATIONAL_QUOTES = [
  "Consistency beats intensity. Show up every day.",
  "Your only limit is you. Push harder than yesterday.",
  "The 90-day version of you is waiting. Don't let them down.",
  "Pain is temporary. Pride is forever.",
  "Success isn't given, it's earned. In the gym and in the kitchen.",
  "Small daily improvements over time lead to stunning results.",
  "Suffer the pain of discipline or suffer the pain of regret.",
  "Gold isn't refined without fire. Build your premium self."
];

export const INITIAL_PROFILE: UserProfile = {
  name: "Lucky",
  age: 25,
  height: 173,
  currentWeight: 53,
  goalWeight: 62,
  goal: "Muscle Gain",
  experience: "Beginner"
};

export const INITIAL_WORKOUTS: WorkoutDay[] = [
  {
    day: "Monday",
    focus: "Chest + Triceps",
    isRest: false,
    exercises: [
      {
        id: "ex-mon-1",
        name: "Incline Dumbbell Press",
        instructions: [
          "Set the bench to a 30-45 degree incline.",
          "Sit down, lift dumbbells to your chest, then lie back.",
          "Press the weights upward until your arms are fully extended.",
          "Lower them back down with control to chest level."
        ],
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        difficulty: "Intermediate",
        targetMuscles: ["Upper Chest", "Front Delts", "Triceps"],
        animationType: "chest_press",
        completed: false
      },
      {
        id: "ex-mon-2",
        name: "Dumbbell Chest Flyes",
        instructions: [
          "Lie flat on a bench, holding dumbbells above chest with slightly bent elbows.",
          "With a wide arc, lower the dumbbells to your sides until you feel a chest stretch.",
          "Squeeze your chest muscles to bring the dumbbells back together at the top."
        ],
        sets: 3,
        reps: "12",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Chest", "Front Delts"],
        animationType: "chest_press",
        completed: false
      },
      {
        id: "ex-mon-3",
        name: "Tricep Pushdowns",
        instructions: [
          "Attach a rope or straight bar to a high cable pulley.",
          "Keep elbows tucked to your side, brace your core.",
          "Push the weight downward by extending your elbows fully.",
          "Slowly return to the starting position with control."
        ],
        sets: 4,
        reps: "12-15",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Triceps (Lateral Head)", "Forearms"],
        animationType: "tricep_pushdown",
        completed: false
      },
      {
        id: "ex-mon-4",
        name: "Overhead Tricep Extension",
        instructions: [
          "Sit or stand holding a single dumbbell with both hands vertically behind your head.",
          "Keep your elbows pointed forward and close to your ears.",
          "Extend your arms upward to lift the weight towards the ceiling.",
          "Lower back down slowly, keeping the elbow joint stable."
        ],
        sets: 3,
        reps: "12",
        restTime: "70s",
        difficulty: "Intermediate",
        targetMuscles: ["Triceps (Long Head)"],
        animationType: "tricep_pushdown",
        completed: false
      },
      {
        id: "ex-mon-5",
        name: "Push-ups to Failure",
        instructions: [
          "Place hands slightly wider than shoulder-width on the floor.",
          "Keep your body in a straight line from head to heels.",
          "Lower your chest until it nearly touches the ground.",
          "Push back up explosively."
        ],
        sets: 3,
        reps: "As many as possible (AMRAP)",
        restTime: "90s",
        difficulty: "Beginner",
        targetMuscles: ["Chest", "Triceps", "Core"],
        animationType: "pushup",
        completed: false
      }
    ]
  },
  {
    day: "Tuesday",
    focus: "Back + Biceps",
    isRest: false,
    exercises: [
      {
        id: "ex-tue-1",
        name: "Lat Pulldown",
        instructions: [
          "Sit at a pulldown machine and grab the wide bar with an overhand grip.",
          "Pull the bar down towards your upper chest while squeezing your shoulder blades.",
          "Slowly resist the weight as it returns back up."
        ],
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        difficulty: "Beginner",
        targetMuscles: ["Lats", "Upper Back", "Biceps"],
        animationType: "lat_pulldown",
        completed: false
      },
      {
        id: "ex-tue-2",
        name: "Dumbbell Bent-Over Row",
        instructions: [
          "Hinge at your hips with a flat back, knees slightly bent.",
          "Hold dumbbells at arm's length with palms facing each other.",
          "Pull the weights to your rib cage, driving your elbows back.",
          "Lower back down slowly with full extension."
        ],
        sets: 4,
        reps: "10",
        restTime: "90s",
        difficulty: "Intermediate",
        targetMuscles: ["Middle Back", "Rhomboids", "Lats", "Rear Delts"],
        animationType: "lat_pulldown",
        completed: false
      },
      {
        id: "ex-tue-3",
        name: "Barbell Bicep Curl",
        instructions: [
          "Stand tall, holding a barbell with an underhand grip, shoulder-width apart.",
          "Squeeze your biceps and curl the bar toward your shoulders.",
          "Keep elbows pinned to your ribs, do not swing.",
          "Lower back down fully."
        ],
        sets: 4,
        reps: "10-12",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Biceps (Short/Long Head)"],
        animationType: "bicep_curl",
        completed: false
      },
      {
        id: "ex-tue-4",
        name: "Hammer Curl",
        instructions: [
          "Hold dumbbells at your sides with neutral grip (palms facing each other).",
          "Curl the weights upward while keeping your palms facing.",
          "Squeeze at the top, then lower with control."
        ],
        sets: 3,
        reps: "12",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Brachialis", "Biceps", "Forearms"],
        animationType: "bicep_curl",
        completed: false
      }
    ]
  },
  {
    day: "Wednesday",
    focus: "Legs",
    isRest: false,
    exercises: [
      {
        id: "ex-wed-1",
        name: "Dumbbell Goblet Squat",
        instructions: [
          "Hold a single heavy dumbbell vertically at your chest.",
          "Stand with feet shoulder-width apart, toes pointed slightly out.",
          "Lower your hips down and back, keeping your chest upright and back straight.",
          "Drive back up through your heels to a standing position."
        ],
        sets: 4,
        reps: "12-15",
        restTime: "90s",
        difficulty: "Beginner",
        targetMuscles: ["Quads", "Glutes", "Hamstrings", "Core"],
        animationType: "squat",
        completed: false
      },
      {
        id: "ex-wed-2",
        name: "Leg Press Machine",
        instructions: [
          "Sit on the machine and place feet hip-width apart on the platform.",
          "Lower the safety locks and bend knees to 90 degrees.",
          "Press the platform away, driving through your midfoot (do not lock knees).",
          "Lower back down slowly."
        ],
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        difficulty: "Intermediate",
        targetMuscles: ["Quads", "Glutes", "Adductors"],
        animationType: "leg_press",
        completed: false
      },
      {
        id: "ex-wed-3",
        name: "Dumbbell Romanian Deadlift",
        instructions: [
          "Stand holding dumbbells in front of your thighs.",
          "Hinge at the hips, pushing them backward with a slight bend in your knees.",
          "Lower weights close to your shins until you feel a stretch in your hamstrings.",
          "Squeeze glutes to stand back up."
        ],
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        difficulty: "Intermediate",
        targetMuscles: ["Hamstrings", "Glutes", "Lower Back"],
        animationType: "squat",
        completed: false
      },
      {
        id: "ex-wed-4",
        name: "Standing Calf Raises",
        instructions: [
          "Stand on the edge of a step with your heels hanging off.",
          "Press up on the balls of your feet as high as possible.",
          "Squeeze your calves, then lower down until heels are below the step."
        ],
        sets: 4,
        reps: "15-20",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Calves (Gastrocnemius)"],
        animationType: "squat",
        completed: false
      }
    ]
  },
  {
    day: "Thursday",
    focus: "Shoulders",
    isRest: false,
    exercises: [
      {
        id: "ex-thu-1",
        name: "Seated Dumbbell Shoulder Press",
        instructions: [
          "Sit on a vertical back bench holding dumbbells at ear level.",
          "Keep elbows slightly in front of your body (not flared out).",
          "Press weights straight up until arms are fully extended.",
          "Lower slowly to ear level."
        ],
        sets: 4,
        reps: "10-12",
        restTime: "90s",
        difficulty: "Beginner",
        targetMuscles: ["Front Delts", "Side Delts", "Triceps"],
        animationType: "shoulder_press",
        completed: false
      },
      {
        id: "ex-thu-2",
        name: "Dumbbell Lateral Raises",
        instructions: [
          "Stand holding dumbbells at your sides with a slight forward lean.",
          "Raise arms out to your sides in a wide arc until parallel to the floor.",
          "Keep a slight bend in the elbows and lead with your elbows.",
          "Lower back down with control."
        ],
        sets: 4,
        reps: "12-15",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Side Delts"],
        animationType: "lateral_raise",
        completed: false
      },
      {
        id: "ex-thu-3",
        name: "Dumbbell Front Raises",
        instructions: [
          "Stand tall, holding dumbbells in front of your thighs.",
          "Keep arms straight and raise one weight directly in front to shoulder height.",
          "Lower and alternate to the other side."
        ],
        sets: 3,
        reps: "12 per arm",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Front Delts"],
        animationType: "lateral_raise",
        completed: false
      },
      {
        id: "ex-thu-4",
        name: "Face Pulls",
        instructions: [
          "Set cable at upper-chest height with rope attachment.",
          "Pull the rope toward your nose, flaring elbows out.",
          "Hold the squeeze and externally rotate wrists at the end.",
          "Slowly release."
        ],
        sets: 3,
        reps: "15",
        restTime: "60s",
        difficulty: "Intermediate",
        targetMuscles: ["Rear Delts", "Rotator Cuff", "Upper Back"],
        animationType: "lat_pulldown",
        completed: false
      }
    ]
  },
  {
    day: "Friday",
    focus: "Upper Body",
    isRest: false,
    exercises: [
      {
        id: "ex-fri-1",
        name: "Dumbbell Bench Press",
        instructions: [
          "Lie flat on a bench holding dumbbells at chest level.",
          "Press weights straight up, squeezing chest muscles.",
          "Lower weights slowly until they touch the outer chest."
        ],
        sets: 4,
        reps: "10",
        restTime: "90s",
        difficulty: "Beginner",
        targetMuscles: ["Mid Chest", "Triceps", "Front Delts"],
        animationType: "chest_press",
        completed: false
      },
      {
        id: "ex-fri-2",
        name: "Seated Cable Row",
        instructions: [
          "Sit at a rowing machine with feet braced and back straight.",
          "Grip the close-grip attachment, row to lower ribs.",
          "Squeeze back muscles, extend arms fully on release."
        ],
        sets: 4,
        reps: "12",
        restTime: "90s",
        difficulty: "Beginner",
        targetMuscles: ["Rhomboids", "Middle Back", "Lats", "Biceps"],
        animationType: "lat_pulldown",
        completed: false
      },
      {
        id: "ex-fri-3",
        name: "Dumbbell Incline Flyes",
        instructions: [
          "Set incline to 30 degrees, open chest with dumbbells.",
          "Bring weights together above upper chest.",
          "Feel a deep chest stretch, do not over-extend."
        ],
        sets: 3,
        reps: "12",
        restTime: "70s",
        difficulty: "Intermediate",
        targetMuscles: ["Upper Chest"],
        animationType: "chest_press",
        completed: false
      },
      {
        id: "ex-fri-4",
        name: "Incline Dumbbell Curl",
        instructions: [
          "Sit on a 45-degree incline bench with arms hanging down.",
          "Keep elbows locked back, curl dumbbells upward.",
          "Ensures deep stretch at bottom of bicep."
        ],
        sets: 3,
        reps: "12",
        restTime: "60s",
        difficulty: "Intermediate",
        targetMuscles: ["Biceps (Long Head)"],
        animationType: "bicep_curl",
        completed: false
      }
    ]
  },
  {
    day: "Saturday",
    focus: "Arms + Abs",
    isRest: false,
    exercises: [
      {
        id: "ex-sat-1",
        name: "Close-Grip Pushups",
        instructions: [
          "Set up on floor with hands placed under shoulders (closer than shoulder width).",
          "Keep elbows tightly tucked in to ribs as you lower.",
          "Push back up using tricep strength."
        ],
        sets: 4,
        reps: "12-15",
        restTime: "75s",
        difficulty: "Intermediate",
        targetMuscles: ["Triceps", "Inner Chest"],
        animationType: "pushup",
        completed: false
      },
      {
        id: "ex-sat-2",
        name: "Concentration Curl",
        instructions: [
          "Sit on flat bench, place elbow on inner thigh.",
          "Curl dumbbell toward your chin without moving body.",
          "Slowly release back down for isolated peak stretch."
        ],
        sets: 3,
        reps: "12 per arm",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Biceps (Brachii Peak)"],
        animationType: "bicep_curl",
        completed: false
      },
      {
        id: "ex-sat-3",
        name: "Tricep Overhead Rope Extension",
        instructions: [
          "Attach rope to low cable pulley.",
          "Face away, hold rope overhead and extend elbows.",
          "Keep elbows locked pointing upward."
        ],
        sets: 3,
        reps: "15",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Triceps (Long Head)"],
        animationType: "tricep_pushdown",
        completed: false
      },
      {
        id: "ex-sat-4",
        name: "Bicycle Crunches",
        instructions: [
          "Lie flat on back with hands behind your head.",
          "Bring opposite elbow to opposite knee while cycling legs.",
          "Maintain controlled, continuous tension."
        ],
        sets: 3,
        reps: "20",
        restTime: "45s",
        difficulty: "Beginner",
        targetMuscles: ["Rectus Abdominis", "Obliques"],
        animationType: "crunch",
        completed: false
      },
      {
        id: "ex-sat-5",
        name: "Core Plank Hold",
        instructions: [
          "Place elbows on ground directly below shoulders.",
          "Squeeze glutes, quads, and pull belly button in.",
          "Hold straight rigid alignment."
        ],
        sets: 3,
        reps: "60 seconds",
        restTime: "60s",
        difficulty: "Beginner",
        targetMuscles: ["Transverse Abdominis", "Lower Back"],
        animationType: "crunch",
        completed: false
      }
    ]
  },
  {
    day: "Sunday",
    focus: "Rest",
    isRest: true,
    exercises: []
  }
];

export const INITIAL_MEALS: Meal[] = [
  {
    id: "meal-breakfast",
    name: "Breakfast",
    items: ["4 Boiled Eggs (3 Egg Whites, 1 Whole Egg)", "1 Bowl Oats with 200ml Skimmed Milk", "1 Medium Banana"],
    calories: 450,
    protein: 28,
    carbs: 60,
    fat: 11,
    time: "08:00 AM",
    completed: false
  },
  {
    id: "meal-lunch",
    name: "Lunch",
    items: ["1.5 Cups Boiled White Rice", "1 Bowl Dal Tadka", "50g Sautéed Soy Chunks", "Mixed Stir-Fry Vegetables", "1 Small Cup Low-Fat Curd"],
    calories: 680,
    protein: 32,
    carbs: 102,
    fat: 14,
    time: "01:30 PM",
    completed: false
  },
  {
    id: "meal-evening",
    name: "Evening Snack",
    items: ["1 Banana Peanut Shake (1 Banana, 1 Scoop Whey, 250ml Milk)", "Handful of Roasted Unsalted Peanuts (approx 30g)"],
    calories: 520,
    protein: 36,
    carbs: 55,
    fat: 18,
    time: "05:30 PM",
    completed: false
  },
  {
    id: "meal-dinner",
    name: "Dinner",
    items: ["1 Cup Brown/White Rice", "100g Sautéed Paneer (Cottage Cheese)", "Sautéed Broccoli, Carrots, and Bell Peppers"],
    calories: 580,
    protein: 24,
    carbs: 65,
    fat: 22,
    time: "08:30 PM",
    completed: false
  },
  {
    id: "meal-bed",
    name: "Before Bed",
    items: ["200ml Warm Skimmed Milk with a Pinch of Turmeric"],
    calories: 120,
    protein: 8,
    carbs: 12,
    fat: 3,
    time: "10:30 PM",
    completed: false
  }
];

export const INITIAL_SUPPLEMENTS: Supplement[] = [
  {
    id: "supp-creatine",
    name: "Creatine Monohydrate",
    dosage: "5g Daily with water or shake",
    reminderTime: "05:00 PM",
    taken: false
  },
  {
    id: "supp-whey",
    name: "Whey Protein",
    dosage: "1 Scoop (approx 30g) post-workout",
    reminderTime: "06:30 PM",
    taken: false
  },
  {
    id: "supp-omega",
    name: "Omega-3 Fish Oil",
    dosage: "1 Capsule with your lunch",
    reminderTime: "02:00 PM",
    taken: false
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-streak-7",
    title: "7 Day Streak",
    description: "Keep up the momentum! Log your activity for 7 consecutive days.",
    unlocked: false,
    icon: "Flame",
    progressMax: 7,
    progressCurrent: 1
  },
  {
    id: "ach-streak-30",
    title: "30 Day Streak",
    description: "Habit unlocked. Log for 30 consecutive days.",
    unlocked: false,
    icon: "ShieldAlert",
    progressMax: 30,
    progressCurrent: 1
  },
  {
    id: "ach-streak-90",
    title: "90 Day Challenge",
    description: "The ultimate evolution! Complete the entire 90-day cycle.",
    unlocked: false,
    icon: "Trophy",
    progressMax: 90,
    progressCurrent: 1
  },
  {
    id: "ach-workout",
    title: "Workout Master",
    description: "Complete 15 workouts fully.",
    unlocked: false,
    icon: "Activity",
    progressMax: 15,
    progressCurrent: 0
  },
  {
    id: "ach-protein",
    title: "Protein Goal",
    description: "Reach your protein goal 5 times.",
    unlocked: false,
    icon: "Egg",
    progressMax: 5,
    progressCurrent: 0
  },
  {
    id: "ach-water",
    title: "Hydration Hero",
    description: "Drink your target amount of water 10 times.",
    unlocked: false,
    icon: "Droplets",
    progressMax: 10,
    progressCurrent: 0
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-workout",
    title: "Morning Workout Reminder",
    body: "Time to sweat! Open LuckyFit and view your focus for today.",
    time: "07:00 AM",
    category: "workout",
    enabled: true
  },
  {
    id: "notif-meal",
    title: "Meal Reminder",
    body: "Fuel up! It's time for your planned anabolic nutrition meal.",
    time: "01:15 PM",
    category: "meal",
    enabled: true
  },
  {
    id: "notif-water",
    title: "Water Hydration Alert",
    body: "Keep that system clean. Drink 250ml of water now.",
    time: "11:00 AM",
    category: "water",
    enabled: true
  },
  {
    id: "notif-supp",
    title: "Supplement Reminder",
    body: "Take your 5g Creatine to saturate muscle fibers.",
    time: "05:00 PM",
    category: "supplement",
    enabled: true
  },
  {
    id: "notif-sleep",
    title: "Sleep Optimization",
    body: "Recovery is growth. Wind down for 8 hours of premium sleep.",
    time: "10:15 PM",
    category: "sleep",
    enabled: true
  },
  {
    id: "notif-motivation",
    title: "Daily Motivation Dose",
    body: "No excuses. Your future self is begging you to pull through.",
    time: "09:00 AM",
    category: "motivation",
    enabled: true
  }
];

export const DEFAULT_WEIGHT_HISTORY = [
  { date: "2026-06-01", weight: 53.0 },
  { date: "2026-06-07", weight: 53.4 },
  { date: "2026-06-14", weight: 54.1 },
  { date: "2026-06-21", weight: 54.6 },
  { date: "2026-06-28", weight: 55.2 }
];

export const DEFAULT_MEASUREMENT_HISTORY = [
  { date: "2026-06-01", chest: 91, arms: 28, waist: 72, legs: 48 },
  { date: "2026-06-15", chest: 92, arms: 28.5, waist: 71.5, legs: 49 },
  { date: "2026-06-29", chest: 93, arms: 29.2, waist: 71.0, legs: 50 }
];

export const DEFAULT_PHOTOS = [
  { id: "p-1", date: "2026-06-01", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80" },
  { id: "p-2", date: "2026-06-15", url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80" }
];

export const DEFAULT_APP_STATE: AppState = {
  profile: INITIAL_PROFILE,
  workoutPlan: INITIAL_WORKOUTS,
  meals: INITIAL_MEALS,
  supplements: INITIAL_SUPPLEMENTS,
  trackers: {
    waterGoal: 3000,
    waterConsumed: 1250,
    proteinGoal: 120,
    proteinConsumed: 56,
    caloriesGoal: 2500,
    caloriesConsumed: 1130
  },
  weightHistory: DEFAULT_WEIGHT_HISTORY,
  measurementHistory: DEFAULT_MEASUREMENT_HISTORY,
  photos: DEFAULT_PHOTOS,
  achievements: INITIAL_ACHIEVEMENTS,
  notifications: INITIAL_NOTIFICATIONS,
  streak: 5,
  lastActiveDate: "2026-06-28"
};
