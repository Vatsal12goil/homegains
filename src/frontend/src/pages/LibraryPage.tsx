import ExerciseCard from "@/components/ExerciseCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllExercises } from "@/hooks/useExercises";
import { cn } from "@/lib/utils";
import {
  type Exercise,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
  MuscleGroup,
  type MuscleGroup as MuscleGroupType,
} from "@/types";
import { Dumbbell, Search, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// Count per muscle group
function useMuscleGroupCounts(exercises: Exercise[] | undefined) {
  return useMemo(() => {
    if (!exercises) return {} as Record<string, number>;
    return exercises.reduce<Record<string, number>>((acc, ex) => {
      const key = ex.muscleGroup as string;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  }, [exercises]);
}

const ALL_MUSCLE_GROUPS: Array<MuscleGroupType | "all"> = [
  "all",
  MuscleGroup.chest,
  MuscleGroup.back,
  MuscleGroup.legs,
  MuscleGroup.arms,
  MuscleGroup.shoulders,
  MuscleGroup.core,
];

const GROUP_ICONS: Record<string, string> = {
  all: "⚡",
  chest: "💪",
  back: "🔙",
  legs: "🦵",
  arms: "🤜",
  shoulders: "🏋️",
  core: "🎯",
};

export default function LibraryPage() {
  const { data: exercises, isLoading } = useAllExercises();
  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroupType | "all">(
    "all",
  );
  const counts = useMuscleGroupCounts(exercises);

  const filtered = useMemo(() => {
    return (exercises ?? []).filter((ex) => {
      const matchesSearch = ex.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMuscle =
        muscleFilter === "all" || ex.muscleGroup === muscleFilter;
      return matchesSearch && matchesMuscle;
    });
  }, [exercises, search, muscleFilter]);

  const totalCount = exercises?.length ?? 0;
  const filteredCount = filtered.length;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 md:px-8 pt-5 pb-4">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-primary" />
                </div>
                <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
                  Exercise Library
                </h1>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                {isLoading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-16 h-3.5 bg-muted rounded animate-pulse inline-block" />
                    <span className="text-muted-foreground/40">loading...</span>
                  </span>
                ) : (
                  <>
                    <span className="text-primary font-semibold">
                      {filteredCount}
                    </span>
                    {filteredCount !== totalCount && (
                      <span className="text-muted-foreground/60">
                        {" "}
                        of {totalCount}
                      </span>
                    )}{" "}
                    {filteredCount === 1 ? "exercise" : "exercises"}
                    {muscleFilter !== "all" && (
                      <span className="text-muted-foreground/60">
                        {" "}
                        · {MUSCLE_GROUP_LABELS[muscleFilter as string]}
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-56 md:w-72 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="library.search_input"
                placeholder="Search exercises..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-muted/30 border-input focus:border-primary/60 transition-smooth text-sm"
              />
            </div>
          </div>

          {/* Muscle group filter with counts */}
          <fieldset
            className="flex items-center gap-2 flex-wrap border-none p-0 m-0"
            aria-label="Filter by muscle group"
          >
            {ALL_MUSCLE_GROUPS.map((group) => {
              const isActive = muscleFilter === group;
              const label =
                group === "all"
                  ? "All"
                  : (MUSCLE_GROUP_LABELS[group as string] ?? group);
              const count =
                group === "all" ? totalCount : (counts[group as string] ?? 0);
              const colorClass =
                group !== "all" && isActive
                  ? MUSCLE_GROUP_COLORS[group as string]
                  : undefined;

              return (
                <button
                  type="button"
                  key={group}
                  onClick={() => setMuscleFilter(group)}
                  data-ocid={`library.filter.${group}`}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth",
                    isActive && group === "all"
                      ? "bg-primary/15 text-primary border-primary/40"
                      : isActive && colorClass
                        ? cn(colorClass, "border-current/40")
                        : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  <span className="text-xs" role="img" aria-hidden="true">
                    {GROUP_ICONS[group as string] ?? ""}
                  </span>
                  {label}
                  {!isLoading && (
                    <span
                      className={cn(
                        "ml-0.5 text-xs font-mono tabular-nums",
                        isActive ? "opacity-80" : "opacity-50",
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </fieldset>
        </div>
      </div>
      {!isLoading && exercises && exercises.length > 0 && (
        <div className="bg-muted/20 border-b border-border px-6 md:px-8 py-2 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-foreground font-medium">{totalCount}</span>{" "}
            total exercises
          </span>
          <span className="text-border">·</span>
          {Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([key, count]) => (
              <span
                key={key}
                className={cn(
                  "flex items-center gap-1 text-xs whitespace-nowrap px-2 py-0.5 rounded-md border",
                  MUSCLE_GROUP_COLORS[key] ??
                    "text-muted-foreground bg-muted border-border",
                )}
              >
                {MUSCLE_GROUP_LABELS[key] ?? key}
                <span className="font-mono font-semibold">{count}</span>
              </span>
            ))}
        </div>
      )}

      {/* Content */}
      <div className="px-6 md:px-8 py-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              data-ocid="library.loading_state"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Skeleton className="h-5 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-4 rounded-full flex-shrink-0" />
                  </div>
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-2/3 rounded-md" />
                  <div className="flex items-center gap-2 pt-1">
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md ml-auto" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-ocid="library.empty_state"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
                  <Search className="w-9 h-9 text-muted-foreground/50" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                  <span className="text-xs">0</span>
                </div>
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                No exercises found
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-5">
                {search && muscleFilter !== "all"
                  ? `No ${MUSCLE_GROUP_LABELS[muscleFilter as string] ?? muscleFilter} exercises match "${search}".`
                  : search
                    ? `No exercises match "${search}".`
                    : "No exercises in this category yet."}
              </p>
              {(search || muscleFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setMuscleFilter("all");
                  }}
                  data-ocid="library.clear_filters_button"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-smooth"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Clear filters
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${muscleFilter}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {filtered.map((exercise, i) => (
                <motion.div
                  key={exercise.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(i * 0.04, 0.4),
                  }}
                >
                  <ExerciseCard exercise={exercise} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
