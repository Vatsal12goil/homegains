import type { backendInterface, Exercise, WorkoutLog, WeeklySchedule, DaySchedule } from "../backend";
import { AnimationType, DayOfWeek, Difficulty, MuscleGroup } from "../backend";

const sampleExercises: Exercise[] = [
  {
    id: BigInt(1),
    name: "Push-Up",
    muscleGroup: MuscleGroup.chest,
    description: "The classic push-up builds chest, shoulder, and tricep strength using only your bodyweight.",
    steps: [
      "Start in a high plank: hands shoulder-width apart, arms straight, body in a straight line from head to heels.",
      "Engage your core and squeeze your glutes to keep your hips level throughout the movement.",
      "Bend your elbows at roughly 45 degrees and lower your chest until it nearly touches the floor.",
      "Pause briefly at the bottom, then press through your palms to push back up to the start.",
      "Fully extend your arms at the top without locking the elbows, then repeat.",
    ],
    difficulty: Difficulty.beginner,
    estimatedDurationSeconds: BigInt(60),
    animationType: AnimationType.pushUp,
  },
  {
    id: BigInt(6),
    name: "Pull-Up",
    muscleGroup: MuscleGroup.back,
    description: "The gold-standard upper-body pulling exercise targeting the lats, biceps, and mid-back.",
    steps: [
      "Hang from a bar with an overhand grip slightly wider than shoulder-width, arms fully extended.",
      "Depress and retract your shoulder blades to initiate the pull.",
      "Drive your elbows down and back, pulling your chin above the bar.",
      "Hold briefly at the top, then lower yourself in a controlled manner.",
      "Avoid swinging or kipping to keep maximum tension on the back muscles.",
    ],
    difficulty: Difficulty.advanced,
    estimatedDurationSeconds: BigInt(60),
    animationType: AnimationType.pullUp,
  },
  {
    id: BigInt(11),
    name: "Bodyweight Squat",
    muscleGroup: MuscleGroup.legs,
    description: "The foundational lower-body exercise targeting quads, hamstrings, and glutes.",
    steps: [
      "Stand with feet shoulder-width apart, toes turned out 15–30 degrees.",
      "Brace your core, chest up, and push your knees out in line with your toes.",
      "Sit back and down until your thighs are parallel to (or below) the floor.",
      "Drive through your heels to stand back up, squeezing your glutes at the top.",
      "Keep your heels on the floor and your torso as upright as possible.",
    ],
    difficulty: Difficulty.beginner,
    estimatedDurationSeconds: BigInt(60),
    animationType: AnimationType.squat,
  },
  {
    id: BigInt(25),
    name: "Plank",
    muscleGroup: MuscleGroup.core,
    description: "The benchmark core stability exercise — hold a rigid plank position for time.",
    steps: [
      "Place forearms on the floor with elbows under shoulders, hands flat or clasped together.",
      "Extend your legs behind you, resting on your toes.",
      "Brace your core as if bracing for a punch and squeeze your glutes.",
      "Keep your body in one straight line — no sagging hips or raised buttocks.",
      "Breathe normally and hold for the target time.",
    ],
    difficulty: Difficulty.beginner,
    estimatedDurationSeconds: BigInt(60),
    animationType: AnimationType.plank,
  },
  {
    id: BigInt(19),
    name: "Tricep Dip",
    muscleGroup: MuscleGroup.arms,
    description: "Use a chair or step to work the triceps through a full range of motion.",
    steps: [
      "Sit on the edge of a sturdy chair and place your palms on the seat beside your hips, fingers forward.",
      "Slide your hips off the edge, supporting your weight on your hands with legs extended or bent.",
      "Bend your elbows and lower your hips toward the floor until elbows reach 90 degrees.",
      "Press through your palms to straighten your arms and return to the start.",
      "Keep your back close to the chair throughout to protect your shoulders.",
    ],
    difficulty: Difficulty.beginner,
    estimatedDurationSeconds: BigInt(60),
    animationType: AnimationType.dip,
  },
  {
    id: BigInt(29),
    name: "Mountain Climber",
    muscleGroup: MuscleGroup.core,
    description: "A dynamic plank movement that raises heart rate while training core stability.",
    steps: [
      "Start in a high plank with hands under shoulders and body in a straight line.",
      "Drive one knee toward your chest without raising your hips.",
      "Quickly switch legs in a running motion, alternating knees to chest.",
      "Keep your core tight and hips level throughout.",
      "Maintain a steady rhythm — faster for cardio, slower for core focus.",
    ],
    difficulty: Difficulty.intermediate,
    estimatedDurationSeconds: BigInt(45),
    animationType: AnimationType.mountainClimber,
  },
];

const mondaySchedule: DaySchedule = {
  day: DayOfWeek.monday,
  exercises: [
    { exerciseId: BigInt(1), sets: BigInt(3), reps: BigInt(12), notes: "" },
    { exerciseId: BigInt(25), sets: BigInt(3), reps: BigInt(1), notes: "Hold 60s" },
  ],
};

const wednesdaySchedule: DaySchedule = {
  day: DayOfWeek.wednesday,
  exercises: [
    { exerciseId: BigInt(11), sets: BigInt(4), reps: BigInt(15), notes: "" },
    { exerciseId: BigInt(29), sets: BigInt(3), reps: BigInt(20), notes: "" },
  ],
};

const fridaySchedule: DaySchedule = {
  day: DayOfWeek.friday,
  exercises: [
    { exerciseId: BigInt(6), sets: BigInt(3), reps: BigInt(8), notes: "" },
    { exerciseId: BigInt(19), sets: BigInt(3), reps: BigInt(12), notes: "" },
  ],
};

const emptyDay = (day: DayOfWeek): DaySchedule => ({ day, exercises: [] });

const weeklySchedule: WeeklySchedule = {
  monday: mondaySchedule,
  tuesday: emptyDay(DayOfWeek.tuesday),
  wednesday: wednesdaySchedule,
  thursday: emptyDay(DayOfWeek.thursday),
  friday: fridaySchedule,
  saturday: emptyDay(DayOfWeek.saturday),
  sunday: emptyDay(DayOfWeek.sunday),
};

const sampleLog: WorkoutLog = {
  id: BigInt(1),
  date: BigInt(Date.now()) * BigInt(1_000_000),
  dayOfWeek: DayOfWeek.monday,
  isActive: false,
  completedExercises: [
    { exerciseId: BigInt(1), setsCompleted: BigInt(3), repsCompleted: BigInt(12), notes: "Felt strong" },
    { exerciseId: BigInt(25), setsCompleted: BigInt(3), repsCompleted: BigInt(1), notes: "" },
  ],
};

export const mockBackend: backendInterface = {
  getAllExercises: async () => sampleExercises,
  getExercise: async (id) => sampleExercises.find((e) => e.id === id) ?? null,
  getWeeklySchedule: async () => weeklySchedule,
  getDaySchedule: async (day) => weeklySchedule[day],
  addExerciseToDay: async () => undefined,
  removeExerciseFromDay: async () => undefined,
  updateDaySchedule: async () => undefined,
  reorderDayExercises: async () => undefined,
  startWorkoutSession: async (day) => ({
    id: BigInt(99),
    date: BigInt(Date.now()) * BigInt(1_000_000),
    dayOfWeek: day,
    isActive: true,
    completedExercises: [],
  }),
  finishWorkoutSession: async () => true,
  getActiveWorkoutSession: async () => null,
  logExerciseCompletion: async () => true,
  getWorkoutHistory: async () => [sampleLog],
  getWorkoutLog: async (id) => (id === BigInt(1) ? sampleLog : null),
};
