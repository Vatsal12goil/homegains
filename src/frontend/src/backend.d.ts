import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Exercise {
    id: ExerciseId;
    estimatedDurationSeconds: bigint;
    animationType: AnimationType;
    difficulty: Difficulty;
    name: string;
    description: string;
    steps: Array<string>;
    muscleGroup: MuscleGroup;
}
export interface CompletedExercise {
    exerciseId: ExerciseId;
    notes: string;
    repsCompleted: bigint;
    setsCompleted: bigint;
}
export interface WorkoutLog {
    id: LogId;
    completedExercises: Array<CompletedExercise>;
    date: Timestamp;
    dayOfWeek: DayOfWeek;
    isActive: boolean;
}
export type Timestamp = bigint;
export type ExerciseId = bigint;
export interface WeeklySchedule {
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    saturday: DaySchedule;
    thursday: DaySchedule;
    sunday: DaySchedule;
    friday: DaySchedule;
    monday: DaySchedule;
}
export interface ScheduledExercise {
    exerciseId: ExerciseId;
    reps: bigint;
    sets: bigint;
    notes: string;
}
export interface DaySchedule {
    day: DayOfWeek;
    exercises: Array<ScheduledExercise>;
}
export type LogId = bigint;
export enum AnimationType {
    dip = "dip",
    mountainClimber = "mountainClimber",
    pullUp = "pullUp",
    pushUp = "pushUp",
    lunge = "lunge",
    squat = "squat",
    crunch = "crunch",
    jumpingJack = "jumpingJack",
    generic = "generic",
    plank = "plank",
    burpee = "burpee"
}
export enum DayOfWeek {
    tuesday = "tuesday",
    wednesday = "wednesday",
    saturday = "saturday",
    thursday = "thursday",
    sunday = "sunday",
    friday = "friday",
    monday = "monday"
}
export enum Difficulty {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced"
}
export enum MuscleGroup {
    shoulders = "shoulders",
    arms = "arms",
    back = "back",
    core = "core",
    chest = "chest",
    legs = "legs"
}
export interface backendInterface {
    addExerciseToDay(day: DayOfWeek, exercise: ScheduledExercise): Promise<void>;
    finishWorkoutSession(logId: LogId): Promise<boolean>;
    getActiveWorkoutSession(): Promise<WorkoutLog | null>;
    getAllExercises(): Promise<Array<Exercise>>;
    getDaySchedule(day: DayOfWeek): Promise<DaySchedule>;
    getExercise(id: ExerciseId): Promise<Exercise | null>;
    getWeeklySchedule(): Promise<WeeklySchedule>;
    getWorkoutHistory(): Promise<Array<WorkoutLog>>;
    getWorkoutLog(logId: LogId): Promise<WorkoutLog | null>;
    logExerciseCompletion(logId: LogId, completedExercise: CompletedExercise): Promise<boolean>;
    removeExerciseFromDay(day: DayOfWeek, exerciseId: ExerciseId): Promise<void>;
    reorderDayExercises(day: DayOfWeek, orderedIds: Array<ExerciseId>): Promise<void>;
    startWorkoutSession(day: DayOfWeek): Promise<WorkoutLog>;
    updateDaySchedule(day: DayOfWeek, exercises: Array<ScheduledExercise>): Promise<void>;
}
