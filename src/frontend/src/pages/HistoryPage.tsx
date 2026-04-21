import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllExercises } from "@/hooks/useExercises";
import { useWorkoutHistory } from "@/hooks/useWorkout";
import { cn } from "@/lib/utils";
import type { CompletedExercise, Exercise, WorkoutLog } from "@/types";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Dumbbell,
  History,
  StickyNote,
} from "lucide-react";
import { useState } from "react";

const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function totalSets(exercises: CompletedExercise[]): number {
  return exercises.reduce((sum, e) => sum + Number(e.setsCompleted), 0);
}

function totalReps(exercises: CompletedExercise[]): number {
  return exercises.reduce((sum, e) => sum + Number(e.repsCompleted), 0);
}

function resolveExerciseName(
  id: bigint,
  exerciseMap: Map<string, Exercise>,
): string {
  return exerciseMap.get(id.toString())?.name ?? `Exercise #${id}`;
}

// ─── Single Exercise Row ───────────────────────────────────────────────────────
function CompletedExerciseRow({
  completed,
  exerciseMap,
  index,
}: {
  completed: CompletedExercise;
  exerciseMap: Map<string, Exercise>;
  index: number;
}) {
  const name = resolveExerciseName(completed.exerciseId, exerciseMap);
  const sets = Number(completed.setsCompleted);
  const reps = Number(completed.repsCompleted);

  return (
    <div
      data-ocid={`history.exercise_row.${index}`}
      className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0"
    >
      <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Dumbbell className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate">
          {name}
        </p>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-mono font-bold text-foreground">{sets}</span>
            {sets === 1 ? "set" : "sets"}
          </span>
          <span className="text-xs text-border">·</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-mono font-bold text-foreground">{reps}</span>
            {reps === 1 ? "rep" : "reps"}
          </span>
          {completed.notes && (
            <>
              <span className="text-xs text-border">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <StickyNote className="w-3 h-3" />
                <span className="truncate max-w-[200px]">
                  {completed.notes}
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Session Card ──────────────────────────────────────────────────────────────
function SessionCard({
  log,
  exerciseMap,
  index,
}: {
  log: WorkoutLog;
  exerciseMap: Map<string, Exercise>;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const exCount = log.completedExercises.length;
  const sets = totalSets(log.completedExercises);
  const reps = totalReps(log.completedExercises);

  return (
    <div
      data-ocid={`history.item.${index}`}
      className={cn(
        "bg-card border rounded-xl overflow-hidden transition-smooth",
        log.isActive
          ? "border-primary/40 shadow-[0_0_0_1px_oklch(var(--primary)/0.15)]"
          : "border-border hover:border-border/80",
      )}
    >
      {/* Card header row */}
      <button
        type="button"
        data-ocid={`history.toggle.${index}`}
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-muted/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={expanded}
      >
        {/* Status icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0",
            log.isActive
              ? "bg-primary/10 border-primary/30"
              : "bg-muted/40 border-border",
          )}
        >
          <CheckCircle2
            className={cn(
              "w-5 h-5",
              log.isActive ? "text-primary" : "text-muted-foreground",
            )}
          />
        </div>

        {/* Title + date */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-semibold text-sm text-foreground">
              {DAY_LABELS[log.dayOfWeek as string] ?? log.dayOfWeek} Workout
            </span>
            {log.isActive && (
              <Badge
                variant="outline"
                className="text-xs border-primary/40 text-primary px-1.5 py-0"
              >
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formatDate(log.date)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <div className="text-center hidden sm:block">
            <p className="font-mono font-bold text-base text-foreground leading-none">
              {exCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {exCount === 1 ? "exercise" : "exercises"}
            </p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="font-mono font-bold text-base text-foreground leading-none">
              {sets}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">sets</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="font-mono font-bold text-base text-foreground leading-none">
              {reps}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">reps</p>
          </div>

          {/* Mobile compact */}
          <div className="sm:hidden text-right">
            <p className="font-mono font-bold text-sm text-foreground">
              {exCount}×
            </p>
            <p className="text-xs text-muted-foreground">{sets} sets</p>
          </div>

          {/* Expand chevron */}
          <div className="w-5 h-5 text-muted-foreground ml-1">
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded exercise list */}
      {expanded && (
        <div
          data-ocid={`history.exercises_panel.${index}`}
          className="border-t border-border/60 px-5 pb-2 bg-background/40"
        >
          {exCount === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No exercises recorded for this session.
            </p>
          ) : (
            log.completedExercises.map((ex, i) => (
              <CompletedExerciseRow
                key={`${ex.exerciseId.toString()}-${i}`}
                completed={ex}
                exerciseMap={exerciseMap}
                index={i + 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const { data: history, isLoading, isError } = useWorkoutHistory();
  const { data: exercises } = useAllExercises();

  const exerciseMap = new Map<string, Exercise>(
    (exercises ?? []).map((ex) => [ex.id.toString(), ex]),
  );

  const sorted = [...(history ?? [])].sort(
    (a, b) => Number(b.date) - Number(a.date),
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 sm:px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Workout History
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isLoading
                ? "Loading sessions…"
                : `${history?.length ?? 0} session${history?.length === 1 ? "" : "s"} completed`}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 py-6 max-w-3xl mx-auto">
        {/* Loading */}
        {isLoading && (
          <div data-ocid="history.loading_state" className="space-y-3">
            {[1, 2, 3, 4].map((k) => (
              <div
                key={k}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              >
                <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
                <div className="flex gap-5">
                  <Skeleton className="h-8 w-10 rounded" />
                  <Skeleton className="h-8 w-10 rounded" />
                  <Skeleton className="h-8 w-10 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div
            data-ocid="history.error_state"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mb-4">
              <AlertCircle className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="font-display font-semibold text-base text-foreground mb-1">
              Failed to load history
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Could not fetch your workout sessions. Try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && sorted.length === 0 && (
          <div
            data-ocid="history.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mb-4">
              <ClipboardList className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No workouts yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Complete your first workout session to see your progress log here.
            </p>
          </div>
        )}

        {/* Sessions list */}
        {!isLoading && !isError && sorted.length > 0 && (
          <div className="space-y-3" data-ocid="history.list">
            {sorted.map((log, i) => (
              <SessionCard
                key={log.id.toString()}
                log={log}
                exerciseMap={exerciseMap}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
