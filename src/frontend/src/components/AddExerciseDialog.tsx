import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAllExercises } from "@/hooks/useExercises";
import { useAddExerciseToDay } from "@/hooks/useSchedule";
import type { DayOfWeek, Exercise } from "@/types";
import {
  DIFFICULTY_COLORS,
  DIFFICULTY_LABELS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "@/types";
import { Dumbbell, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface AddExerciseDialogProps {
  open: boolean;
  onClose: () => void;
  day: DayOfWeek;
  /** IDs already scheduled on this day to disable them */
  existingIds: bigint[];
}

const MUSCLE_FILTERS = [
  "all",
  "chest",
  "back",
  "legs",
  "arms",
  "shoulders",
  "core",
] as const;

export function AddExerciseDialog({
  open,
  onClose,
  day,
  existingIds,
}: AddExerciseDialogProps) {
  const { data: exercises, isLoading } = useAllExercises();
  const addExercise = useAddExerciseToDay();

  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState<string>("all");
  const [adding, setAdding] = useState<bigint | null>(null);

  const filtered = useMemo(() => {
    if (!exercises) return [];
    return exercises.filter((ex) => {
      const matchSearch =
        search.trim() === "" ||
        ex.name.toLowerCase().includes(search.toLowerCase());
      const matchMuscle =
        muscleFilter === "all" || ex.muscleGroup === muscleFilter;
      return matchSearch && matchMuscle;
    });
  }, [exercises, search, muscleFilter]);

  function handleAdd(ex: Exercise) {
    setAdding(ex.id);
    addExercise.mutate(
      {
        day,
        exercise: {
          exerciseId: ex.id,
          sets: 3n,
          reps: 10n,
          notes: "",
        },
      },
      {
        onSuccess: () => {
          setAdding(null);
          onClose();
        },
        onError: () => setAdding(null),
      },
    );
  }

  function handleOpenChange(val: boolean) {
    if (!val) {
      setSearch("");
      setMuscleFilter("all");
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-ocid="add_exercise.dialog"
        className="bg-card border-border max-w-lg w-full p-0 gap-0 overflow-hidden"
      >
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border">
          <DialogTitle className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            Add Exercise
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-5 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="add_exercise.search_input"
              placeholder="Search exercises…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 bg-input border-border text-sm"
            />
          </div>
        </div>

        {/* Muscle group filter chips */}
        <div className="px-5 py-2.5 border-b border-border flex gap-1.5 flex-wrap">
          {MUSCLE_FILTERS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMuscleFilter(m)}
              data-ocid={`add_exercise.filter.${m}`}
              className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                muscleFilter === m
                  ? "bg-primary/20 border-primary/50 text-primary"
                  : "bg-transparent border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
              }`}
            >
              {m === "all" ? "All" : MUSCLE_GROUP_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Exercise list */}
        <ScrollArea className="h-80">
          {isLoading ? (
            <div
              data-ocid="add_exercise.loading_state"
              className="flex flex-col gap-2 p-5"
            >
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-14 bg-muted/40 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              data-ocid="add_exercise.empty_state"
              className="flex flex-col items-center justify-center py-12 text-center px-5"
            >
              <Dumbbell className="w-8 h-8 text-muted-foreground mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">
                No exercises found
              </p>
              <p className="text-xs text-muted-foreground mt-1 opacity-60">
                Try a different search or filter
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-3">
              {filtered.map((ex, i) => {
                const alreadyAdded = existingIds.some((id) => id === ex.id);
                const isAdding = adding === ex.id;

                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: filtered list reorders by search, stable visual position is index
                    key={i}
                    data-ocid={`add_exercise.item.${i + 1}`}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-smooth ${
                      alreadyAdded
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-muted/40 cursor-pointer"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {ex.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[10px] font-medium border rounded px-1.5 py-0.5 ${MUSCLE_GROUP_COLORS[ex.muscleGroup]}`}
                        >
                          {MUSCLE_GROUP_LABELS[ex.muscleGroup]}
                        </span>
                        <span
                          className={`text-[10px] font-medium border rounded px-1.5 py-0.5 ${DIFFICULTY_COLORS[ex.difficulty]}`}
                        >
                          {DIFFICULTY_LABELS[ex.difficulty]}
                        </span>
                      </div>
                    </div>

                    {alreadyAdded ? (
                      <span className="text-xs text-muted-foreground">
                        Added
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAdd(ex)}
                        data-ocid={`add_exercise.add_button.${i + 1}`}
                        disabled={isAdding}
                        className="h-7 px-2.5 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        {isAdding ? "Adding…" : "Add"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="add_exercise.close_button"
            className="text-muted-foreground hover:text-foreground"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
