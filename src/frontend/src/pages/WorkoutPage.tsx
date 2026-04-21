import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllExercises } from "@/hooks/useExercises";
import { useWeeklySchedule } from "@/hooks/useSchedule";
import {
  useActiveWorkoutSession,
  useFinishWorkoutSession,
  useLogExerciseCompletion,
  useStartWorkoutSession,
} from "@/hooks/useWorkout";
import type {
  CompletedExercise,
  Exercise,
  LogId,
  ScheduledExercise,
  WorkoutLog,
} from "@/types";
import {
  DIFFICULTY_COLORS,
  DIFFICULTY_LABELS,
  DayOfWeek,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "@/types";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardList,
  Dumbbell,
  Flame,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Day helpers ─────────────────────────────────────────────────────────────

const TODAY_INDEX = new Date().getDay(); // 0=Sun
const DAY_MAP: DayOfWeek[] = [
  DayOfWeek.sunday,
  DayOfWeek.monday,
  DayOfWeek.tuesday,
  DayOfWeek.wednesday,
  DayOfWeek.thursday,
  DayOfWeek.friday,
  DayOfWeek.saturday,
];
const TODAY_DAY: DayOfWeek = DAY_MAP[TODAY_INDEX];

const DAY_FULL_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div data-ocid="workout.loading_state" className="space-y-4">
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
    </div>
  );
}

function RestDayEmpty() {
  return (
    <div
      data-ocid="workout.empty_state"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-5 shadow-card">
        <Timer className="w-9 h-9 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-xl text-foreground mb-2">
        Rest Day
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-7">
        No workout scheduled for today. Head to the schedule to plan your
        training.
      </p>
      <Button data-ocid="workout.schedule_link" variant="outline" asChild>
        <Link to="/schedule" className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4" />
          View Schedule
          <ChevronRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

interface PreviewRowProps {
  scheduled: ScheduledExercise;
  exercise: Exercise | undefined;
  index: number;
}

function PreviewRow({ scheduled, exercise, index }: PreviewRowProps) {
  const muscleClass = exercise
    ? MUSCLE_GROUP_COLORS[exercise.muscleGroup]
    : "text-muted-foreground";
  const diffClass = exercise
    ? DIFFICULTY_COLORS[exercise.difficulty]
    : "text-muted-foreground";
  return (
    <div
      data-ocid={`workout.preview_item.${index + 1}`}
      className="flex items-center gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3 hover:bg-muted/50 transition-smooth"
    >
      <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-bold text-muted-foreground">
          {index + 1}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {exercise?.name ?? `Exercise #${scheduled.exerciseId}`}
        </p>
        {exercise && (
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-1.5 py-0.5 rounded border font-medium ${muscleClass}`}
            >
              {MUSCLE_GROUP_LABELS[exercise.muscleGroup]}
            </span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded border font-medium ${diffClass}`}
            >
              {DIFFICULTY_LABELS[exercise.difficulty]}
            </span>
          </div>
        )}
      </div>
      <div className="shrink-0 text-right">
        <span className="text-sm font-mono font-bold text-primary">
          {scheduled.sets.toString()} × {scheduled.reps.toString()}
        </span>
        <p className="text-xs text-muted-foreground">sets × reps</p>
      </div>
    </div>
  );
}

interface ActiveExerciseRowProps {
  scheduled: ScheduledExercise;
  exercise: Exercise | undefined;
  index: number;
  logId: LogId;
  isCompleted: boolean;
  completedEntry: CompletedExercise | undefined;
  onLogged: () => void;
}

function ActiveExerciseRow({
  scheduled,
  exercise,
  index,
  logId,
  isCompleted,
  completedEntry,
  onLogged,
}: ActiveExerciseRowProps) {
  const [sets, setSets] = useState(
    completedEntry
      ? Number(completedEntry.setsCompleted)
      : Number(scheduled.sets),
  );
  const [reps, setReps] = useState(
    completedEntry
      ? Number(completedEntry.repsCompleted)
      : Number(scheduled.reps),
  );
  const [notes, setNotes] = useState(completedEntry?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const logCompletion = useLogExerciseCompletion();

  async function handleMark() {
    if (isCompleted) return;
    setSaving(true);
    try {
      await logCompletion.mutateAsync({
        logId,
        completedExercise: {
          exerciseId: scheduled.exerciseId,
          setsCompleted: BigInt(sets),
          repsCompleted: BigInt(reps),
          notes,
        },
      });
      toast.success(`${exercise?.name ?? "Exercise"} logged!`);
      onLogged();
    } catch {
      toast.error("Failed to log exercise. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const muscleClass = exercise ? MUSCLE_GROUP_COLORS[exercise.muscleGroup] : "";

  return (
    <div
      data-ocid={`workout.exercise_row.${index + 1}`}
      className={`rounded-xl border p-4 transition-smooth ${
        isCompleted
          ? "bg-primary/5 border-primary/30 opacity-80"
          : "bg-card border-border"
      }`}
    >
      {/* Row header */}
      <div className="flex items-start gap-3 mb-3">
        <button
          type="button"
          data-ocid={`workout.exercise_checkbox.${index + 1}`}
          onClick={handleMark}
          disabled={isCompleted || saving}
          aria-label={isCompleted ? "Completed" : "Mark complete"}
          className="mt-0.5 shrink-0 transition-smooth disabled:cursor-default"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-primary" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-display font-semibold text-base ${isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {exercise?.name ?? `Exercise #${scheduled.exerciseId}`}
            </span>
            {exercise && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded border font-medium ${muscleClass}`}
              >
                {MUSCLE_GROUP_LABELS[exercise.muscleGroup]}
              </span>
            )}
          </div>
          {exercise && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {exercise.description}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="text-xs text-muted-foreground">Target</span>
          <p className="text-sm font-mono font-bold text-muted-foreground">
            {scheduled.sets.toString()}×{scheduled.reps.toString()}
          </p>
        </div>
      </div>

      {/* Inputs */}
      {!isCompleted && (
        <div className="flex items-end gap-3 ml-9">
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`workout-sets-${index}`}
              className="text-xs text-muted-foreground font-medium"
            >
              Sets done
            </label>
            <Input
              id={`workout-sets-${index}`}
              data-ocid={`workout.sets_input.${index + 1}`}
              type="number"
              min={1}
              max={99}
              value={sets}
              onChange={(e) => setSets(Math.max(1, Number(e.target.value)))}
              className="w-20 h-8 text-sm font-mono text-center bg-background border-input"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`workout-reps-${index}`}
              className="text-xs text-muted-foreground font-medium"
            >
              Reps done
            </label>
            <Input
              id={`workout-reps-${index}`}
              data-ocid={`workout.reps_input.${index + 1}`}
              type="number"
              min={1}
              max={999}
              value={reps}
              onChange={(e) => setReps(Math.max(1, Number(e.target.value)))}
              className="w-20 h-8 text-sm font-mono text-center bg-background border-input"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label
              htmlFor={`workout-notes-${index}`}
              className="text-xs text-muted-foreground font-medium"
            >
              Notes
            </label>
            <Input
              id={`workout-notes-${index}`}
              data-ocid={`workout.notes_input.${index + 1}`}
              type="text"
              placeholder="Optional notes…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-8 text-sm bg-background border-input"
            />
          </div>
          <Button
            data-ocid={`workout.log_button.${index + 1}`}
            size="sm"
            onClick={handleMark}
            disabled={saving}
            className="h-8 shrink-0"
          >
            {saving ? "Saving…" : "Done"}
          </Button>
        </div>
      )}

      {isCompleted && completedEntry && (
        <div className="ml-9 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="font-mono text-primary font-bold">
            {completedEntry.setsCompleted.toString()} ×{" "}
            {completedEntry.repsCompleted.toString()} completed
          </span>
          {completedEntry.notes && (
            <span className="italic truncate">"{completedEntry.notes}"</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Active session view ──────────────────────────────────────────────────────

interface ActiveSessionProps {
  session: WorkoutLog;
  exercises: Exercise[];
  scheduledList: ScheduledExercise[];
}

function ActiveSession({
  session,
  exercises,
  scheduledList,
}: ActiveSessionProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const finishSession = useFinishWorkoutSession();

  const exerciseMap = useMemo(
    () => new Map(exercises.map((e) => [e.id.toString(), e])),
    [exercises],
  );

  // Build completedMap — refreshKey forces a new reference each time an exercise is logged
  // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey is a deliberate trigger dep
  const completedMap = useMemo(
    () =>
      new Map(
        session.completedExercises.map((c) => [c.exerciseId.toString(), c]),
      ),
    [session.completedExercises, refreshKey],
  );

  const completedCount = completedMap.size;
  const total = scheduledList.length;
  const allDone = completedCount >= total;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const handleLogged = useCallback(() => setRefreshKey((k) => k + 1), []);

  async function handleFinish() {
    try {
      await finishSession.mutateAsync(session.id);
      toast.success("Workout complete! Great job 💪");
    } catch {
      toast.error("Failed to finish workout. Try again.");
    }
  }

  return (
    <div className="space-y-5">
      {/* Progress banner */}
      <div
        data-ocid="workout.progress_banner"
        className="bg-card border border-primary/30 rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              Session Active
            </span>
          </div>
          <Badge
            data-ocid="workout.progress_badge"
            variant="outline"
            className="font-mono border-primary/40 text-primary"
          >
            {completedCount} / {total}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {allDone
            ? "All exercises complete — finish when ready!"
            : `${total - completedCount} remaining`}
        </p>
      </div>

      {/* Exercise rows */}
      <div className="space-y-3">
        {scheduledList.map((sch, i) => (
          <ActiveExerciseRow
            key={`${sch.exerciseId}-${i}`}
            scheduled={sch}
            exercise={exerciseMap.get(sch.exerciseId.toString())}
            index={i}
            logId={session.id}
            isCompleted={completedMap.has(sch.exerciseId.toString())}
            completedEntry={completedMap.get(sch.exerciseId.toString())}
            onLogged={handleLogged}
          />
        ))}
      </div>

      {/* Finish controls */}
      <div className="flex gap-3 pt-2">
        <Button
          data-ocid="workout.finish_button"
          onClick={handleFinish}
          disabled={finishSession.isPending}
          className="flex-1"
        >
          <Trophy className="w-4 h-4 mr-2" />
          {finishSession.isPending
            ? "Finishing…"
            : allDone
              ? "Finish Workout"
              : "Finish Early"}
        </Button>
      </div>
    </div>
  );
}

// ─── Pre-workout preview ──────────────────────────────────────────────────────

interface PreWorkoutProps {
  scheduledList: ScheduledExercise[];
  exercises: Exercise[];
  onStart: () => void;
  starting: boolean;
}

function PreWorkout({
  scheduledList,
  exercises,
  onStart,
  starting,
}: PreWorkoutProps) {
  const exerciseMap = useMemo(
    () => new Map(exercises.map((e) => [e.id.toString(), e])),
    [exercises],
  );

  const totalSets = scheduledList.reduce((sum, s) => sum + Number(s.sets), 0);
  const muscles = [
    ...new Set(
      scheduledList
        .map((s) => exerciseMap.get(s.exerciseId.toString())?.muscleGroup)
        .filter(Boolean),
    ),
  ];

  return (
    <div className="space-y-5">
      {/* Summary card */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
        <h2 className="font-display font-bold text-lg text-foreground mb-1">
          {DAY_FULL_LABELS[TODAY_DAY]}'s Plan
        </h2>
        <div className="flex items-center gap-5 mt-3 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Dumbbell className="w-4 h-4 text-primary" />
            <span>{scheduledList.length} exercises</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Flame className="w-4 h-4 text-secondary" />
            <span>{totalSets} total sets</span>
          </div>
        </div>
        {muscles.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {muscles.map((mg) => (
              <span
                key={mg as string}
                className={`text-xs px-2 py-0.5 rounded-md border font-medium ${MUSCLE_GROUP_COLORS[mg as string]}`}
              >
                {MUSCLE_GROUP_LABELS[mg as string]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Exercise list */}
      <div className="space-y-2">
        {scheduledList.map((sch, i) => (
          <PreviewRow
            key={`${sch.exerciseId}-${i}`}
            scheduled={sch}
            exercise={exerciseMap.get(sch.exerciseId.toString())}
            index={i}
          />
        ))}
      </div>

      <Button
        data-ocid="workout.start_button"
        size="lg"
        onClick={onStart}
        disabled={starting}
        className="w-full font-display font-bold text-base"
      >
        <Zap className="w-5 h-5 mr-2" />
        {starting ? "Starting…" : "Start Workout"}
      </Button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function WorkoutPage() {
  const { data: activeSession, isLoading: sessionLoading } =
    useActiveWorkoutSession();
  const { data: schedule, isLoading: scheduleLoading } = useWeeklySchedule();
  const { data: exercises = [], isLoading: exercisesLoading } =
    useAllExercises();
  const startSession = useStartWorkoutSession();

  const isLoading = sessionLoading || scheduleLoading || exercisesLoading;

  const todaySchedule = schedule?.[TODAY_DAY as keyof typeof schedule];
  const scheduledList: ScheduledExercise[] = todaySchedule?.exercises ?? [];
  const hasWorkout = scheduledList.length > 0;

  async function handleStartWorkout() {
    try {
      await startSession.mutateAsync(TODAY_DAY);
    } catch {
      toast.error("Could not start workout. Try again.");
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shadow-card">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Today's Workout
            </h1>
            <p className="text-sm text-muted-foreground">
              {DAY_FULL_LABELS[TODAY_DAY]}
              {activeSession && (
                <span className="ml-2 text-primary font-medium">
                  · Session Active
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 md:px-8 max-w-2xl">
        {isLoading ? (
          <LoadingSkeleton />
        ) : activeSession ? (
          <ActiveSession
            session={activeSession as WorkoutLog}
            exercises={exercises}
            scheduledList={scheduledList}
          />
        ) : hasWorkout ? (
          <PreWorkout
            scheduledList={scheduledList}
            exercises={exercises}
            onStart={handleStartWorkout}
            starting={startSession.isPending}
          />
        ) : (
          <RestDayEmpty />
        )}
      </div>
    </div>
  );
}
