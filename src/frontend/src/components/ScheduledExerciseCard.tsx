import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAllExercises } from "@/hooks/useExercises";
import {
  useRemoveExerciseFromDay,
  useUpdateDaySchedule,
} from "@/hooks/useSchedule";
import type {
  DayOfWeek,
  DaySchedule,
  ExerciseId,
  ScheduledExercise,
} from "@/types";
import { MUSCLE_GROUP_COLORS } from "@/types";
import { Check, ChevronDown, ChevronUp, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

interface ScheduledExerciseCardProps {
  scheduled: ScheduledExercise;
  day: DayOfWeek;
  daySchedule: DaySchedule;
  index: number;
  total: number;
}

export function ScheduledExerciseCard({
  scheduled,
  day,
  daySchedule,
  index,
  total,
}: ScheduledExerciseCardProps) {
  const { data: exercises } = useAllExercises();
  const removeExercise = useRemoveExerciseFromDay();
  const updateDay = useUpdateDaySchedule();

  const [editing, setEditing] = useState(false);
  const [sets, setSets] = useState(scheduled.sets.toString());
  const [reps, setReps] = useState(scheduled.reps.toString());

  const exercise = exercises?.find((e) => e.id === scheduled.exerciseId);
  const muscleColor = exercise ? MUSCLE_GROUP_COLORS[exercise.muscleGroup] : "";

  function handleRemove() {
    removeExercise.mutate({ day, exerciseId: scheduled.exerciseId });
  }

  function handleSave() {
    const parsedSets = Math.max(1, Number.parseInt(sets, 10) || 1);
    const parsedReps = Math.max(1, Number.parseInt(reps, 10) || 1);
    const updated = daySchedule.exercises.map((ex) =>
      ex.exerciseId === scheduled.exerciseId
        ? { ...ex, sets: BigInt(parsedSets), reps: BigInt(parsedReps) }
        : ex,
    );
    updateDay.mutate({ day, exercises: updated });
    setSets(parsedSets.toString());
    setReps(parsedReps.toString());
    setEditing(false);
  }

  function handleCancel() {
    setSets(scheduled.sets.toString());
    setReps(scheduled.reps.toString());
    setEditing(false);
  }

  function moveUp() {
    if (index === 0) return;
    const arr = [...daySchedule.exercises];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    updateDay.mutate({ day, exercises: arr });
  }

  function moveDown() {
    if (index === total - 1) return;
    const arr = [...daySchedule.exercises];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    updateDay.mutate({ day, exercises: arr });
  }

  return (
    <div
      data-ocid={`schedule.exercise_card.${index + 1}`}
      className="group relative bg-muted/30 border border-border hover:border-primary/30 rounded-lg p-3 transition-smooth"
    >
      {/* Reorder arrows */}
      <div className="absolute right-2 top-2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-smooth">
        <button
          type="button"
          onClick={moveUp}
          disabled={index === 0}
          data-ocid={`schedule.move_up_button.${index + 1}`}
          className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20 rounded"
          aria-label="Move up"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={moveDown}
          disabled={index === total - 1}
          data-ocid={`schedule.move_down_button.${index + 1}`}
          className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20 rounded"
          aria-label="Move down"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Exercise name */}
      <p className="text-xs font-medium text-foreground truncate pr-8 leading-tight">
        {exercise?.name ?? `Exercise #${scheduled.exerciseId}`}
      </p>

      {/* Muscle group badge */}
      {exercise && (
        <span
          className={`inline-block text-[10px] font-medium border rounded px-1.5 py-0.5 mt-1 ${muscleColor}`}
        >
          {exercise.muscleGroup}
        </span>
      )}

      {/* Sets × Reps */}
      {editing ? (
        <div className="mt-2 flex items-center gap-1.5">
          <Input
            data-ocid={`schedule.sets_input.${index + 1}`}
            type="number"
            min={1}
            max={99}
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="h-6 w-12 text-xs px-1.5 py-0 bg-input border-border text-center"
          />
          <span className="text-xs text-muted-foreground">×</span>
          <Input
            data-ocid={`schedule.reps_input.${index + 1}`}
            type="number"
            min={1}
            max={999}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="h-6 w-12 text-xs px-1.5 py-0 bg-input border-border text-center"
          />
          <button
            type="button"
            onClick={handleSave}
            data-ocid={`schedule.save_button.${index + 1}`}
            className="p-0.5 text-primary hover:text-primary/80 rounded"
            aria-label="Save"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            data-ocid={`schedule.cancel_button.${index + 1}`}
            className="p-0.5 text-muted-foreground hover:text-foreground rounded"
            aria-label="Cancel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="mt-1.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setEditing(true)}
            data-ocid={`schedule.edit_sets_button.${index + 1}`}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-smooth group/edit"
            aria-label="Edit sets and reps"
          >
            <span className="font-mono">
              {scheduled.sets.toString()}×{scheduled.reps.toString()}
            </span>
            <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/edit:opacity-100 transition-smooth" />
          </button>

          <button
            type="button"
            onClick={handleRemove}
            data-ocid={`schedule.delete_button.${index + 1}`}
            className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/20 rounded transition-smooth"
            aria-label="Remove exercise"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
