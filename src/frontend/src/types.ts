// Re-export backend types with frontend-friendly aliases
export type {
  Exercise,
  ScheduledExercise,
  DaySchedule,
  WeeklySchedule,
  CompletedExercise,
  WorkoutLog,
  ExerciseId,
  LogId,
  Timestamp,
} from "./backend";

export {
  DayOfWeek,
  MuscleGroup,
  Difficulty,
  AnimationType,
} from "./backend";

import { DayOfWeek as DayOfWeekEnum } from "./backend";

// Ordered week days for display
export const DAYS_ORDER: DayOfWeekEnum[] = [
  DayOfWeekEnum.monday,
  DayOfWeekEnum.tuesday,
  DayOfWeekEnum.wednesday,
  DayOfWeekEnum.thursday,
  DayOfWeekEnum.friday,
  DayOfWeekEnum.saturday,
  DayOfWeekEnum.sunday,
];

export const MUSCLE_GROUP_LABELS: Record<string, string> = {
  chest: "Chest",
  back: "Back",
  legs: "Legs",
  arms: "Arms",
  shoulders: "Shoulders",
  core: "Core",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  advanced: "text-red-400 bg-red-400/10 border-red-400/30",
};

export const MUSCLE_GROUP_COLORS: Record<string, string> = {
  chest: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  back: "text-violet-400 bg-violet-400/10 border-violet-400/30",
  legs: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  arms: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  shoulders: "text-pink-400 bg-pink-400/10 border-pink-400/30",
  core: "text-green-400 bg-green-400/10 border-green-400/30",
};
