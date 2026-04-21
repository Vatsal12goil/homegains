import { cn } from "@/lib/utils";
import type { Exercise } from "@/types";
import {
  DIFFICULTY_COLORS,
  DIFFICULTY_LABELS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  index?: number;
}

export default function ExerciseCard({
  exercise,
  index = 0,
}: ExerciseCardProps) {
  const durationMin = Math.ceil(Number(exercise.estimatedDurationSeconds) / 60);
  const muscleKey = exercise.muscleGroup as string;
  const diffKey = exercise.difficulty as string;

  return (
    <Link
      to="/exercise/$id"
      params={{ id: exercise.id.toString() }}
      data-ocid={`exercise.item.${index + 1}`}
      className="group block"
    >
      <div
        className={cn(
          "relative bg-card border border-border rounded-xl p-5 transition-smooth",
          "hover:border-primary/40 hover:shadow-elevation hover:-translate-y-0.5",
          "cursor-pointer overflow-hidden",
        )}
      >
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-semibold text-base text-foreground leading-tight line-clamp-2 min-w-0">
            {exercise.name}
          </h3>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-smooth" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {exercise.description}
        </p>

        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border",
              MUSCLE_GROUP_COLORS[muscleKey] ??
                "text-muted-foreground bg-muted border-border",
            )}
          >
            {MUSCLE_GROUP_LABELS[muscleKey] ?? muscleKey}
          </span>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border",
              DIFFICULTY_COLORS[diffKey] ??
                "text-muted-foreground bg-muted border-border",
            )}
          >
            {DIFFICULTY_LABELS[diffKey] ?? diffKey}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Clock className="w-3 h-3" />
            {durationMin}m
          </span>
        </div>
      </div>
    </Link>
  );
}
