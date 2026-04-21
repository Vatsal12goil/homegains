import ExerciseModel from "@/components/ExerciseModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useExercise } from "@/hooks/useExercises";
import {
  DIFFICULTY_COLORS,
  DIFFICULTY_LABELS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Clock, Target, Zap } from "lucide-react";
import { Suspense } from "react";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ExerciseDetailSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Skeleton
        className="w-full lg:w-[58%] rounded-xl"
        style={{ minHeight: "60vh" }}
      />
      <div className="lg:w-[42%] space-y-4">
        <Skeleton className="h-9 w-3/4 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-5 w-32 rounded" />
        <Skeleton className="h-px w-full rounded" />
        {[...Array(5)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ─── Step item ────────────────────────────────────────────────────────────────
function StepItem({ step, index }: { step: string; index: number }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-smooth group"
      data-ocid={`exercise.step.${index + 1}`}
    >
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-sm font-display font-bold group-hover:bg-primary/25 transition-smooth">
        {index + 1}
      </span>
      <p className="text-foreground/90 text-sm leading-relaxed pt-0.5">
        {step}
      </p>
    </div>
  );
}

// ─── Duration helper ──────────────────────────────────────────────────────────
function formatDuration(seconds: bigint): string {
  const s = Number(seconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
}

// ─── Animation label map ──────────────────────────────────────────────────────
const ANIM_LABELS: Record<string, string> = {
  pushUp: "Push-Up",
  pullUp: "Pull-Up",
  squat: "Squat",
  plank: "Plank",
  lunge: "Lunge",
  dip: "Dip",
  crunch: "Crunch",
  jumpingJack: "Jumping Jack",
  burpee: "Burpee",
  mountainClimber: "Mountain Climber",
  generic: "Movement",
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ExerciseDetailPage() {
  const { id } = useParams({ from: "/exercise/$id" });
  const navigate = useNavigate();

  const exerciseId = BigInt(id);
  const { data: exercise, isLoading, isError } = useExercise(exerciseId);

  const handleBack = () => navigate({ to: "/library" });

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="gap-1.5 text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="exercise.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Button>
        {exercise && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm font-display text-foreground truncate min-w-0">
              {exercise.name}
            </span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {isLoading && (
          <div data-ocid="exercise.loading_state">
            <ExerciseDetailSkeleton />
          </div>
        )}

        {isError && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            data-ocid="exercise.error_state"
          >
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-7 h-7 text-destructive" />
            </div>
            <p className="text-foreground font-display text-lg">
              Couldn't load exercise
            </p>
            <Button
              variant="outline"
              onClick={handleBack}
              data-ocid="exercise.back_button"
            >
              Return to Library
            </Button>
          </div>
        )}

        {!isLoading && !isError && !exercise && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            data-ocid="exercise.empty_state"
          >
            <p className="text-muted-foreground font-display text-lg">
              Exercise not found
            </p>
            <Button
              variant="outline"
              onClick={handleBack}
              data-ocid="exercise.back_button"
            >
              Return to Library
            </Button>
          </div>
        )}

        {exercise && (
          <div
            className="flex flex-col lg:flex-row gap-6 xl:gap-10"
            data-ocid="exercise.page"
          >
            {/* 3D canvas — 60vh min */}
            <div className="w-full lg:w-[58%] flex flex-col gap-3">
              <Suspense
                fallback={
                  <Skeleton
                    className="w-full rounded-xl"
                    style={{ minHeight: "60vh" }}
                  />
                }
              >
                <ExerciseModel
                  animationType={exercise.animationType}
                  className="w-full"
                  style={{ minHeight: "60vh", height: "60vh" }}
                />
              </Suspense>
              <p className="text-center text-xs text-muted-foreground select-none">
                🖱 Drag to rotate · Scroll to zoom
              </p>
            </div>

            {/* Details panel */}
            <div
              className="lg:w-[42%] flex flex-col gap-5"
              data-ocid="exercise.panel"
            >
              {/* Name + description */}
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {exercise.name}
                </h1>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {exercise.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs font-medium border ${MUSCLE_GROUP_COLORS[exercise.muscleGroup as string] ?? ""}`}
                  data-ocid="exercise.muscle_badge"
                >
                  <Target className="w-3 h-3 mr-1" />
                  {MUSCLE_GROUP_LABELS[exercise.muscleGroup as string] ??
                    exercise.muscleGroup}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium border ${DIFFICULTY_COLORS[exercise.difficulty as string] ?? ""}`}
                  data-ocid="exercise.difficulty_badge"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {DIFFICULTY_LABELS[exercise.difficulty as string] ??
                    exercise.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs font-medium border border-border text-muted-foreground"
                  data-ocid="exercise.anim_badge"
                >
                  {ANIM_LABELS[exercise.animationType] ??
                    exercise.animationType}
                </Badge>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>Estimated duration:</span>
                <span
                  className="text-foreground font-semibold font-mono"
                  data-ocid="exercise.duration"
                >
                  {formatDuration(exercise.estimatedDurationSeconds)}
                </span>
              </div>

              <div className="border-t border-border" />

              {/* Steps */}
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground mb-3">
                  Step-by-Step Instructions
                </h2>
                {exercise.steps.length === 0 ? (
                  <p
                    className="text-muted-foreground text-sm"
                    data-ocid="exercise.steps.empty_state"
                  >
                    No steps available for this exercise.
                  </p>
                ) : (
                  <div
                    className="flex flex-col gap-2"
                    data-ocid="exercise.steps.list"
                  >
                    {exercise.steps.map((step, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: exercise steps are ordered
                      <StepItem key={i} step={step} index={i} />
                    ))}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  className="w-full gap-2 font-display font-semibold"
                  size="lg"
                  onClick={() => navigate({ to: "/workout" })}
                  data-ocid="exercise.start_workout_button"
                >
                  <Zap className="w-4 h-4" />
                  Start Workout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
