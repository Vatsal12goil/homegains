import { cn } from "@/lib/utils";
import { MUSCLE_GROUP_LABELS, MuscleGroup } from "@/types";

interface MuscleGroupFilterProps {
  selected: MuscleGroup | "all";
  onChange: (value: MuscleGroup | "all") => void;
}

const ALL_GROUPS: Array<MuscleGroup | "all"> = [
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
  arms: "💪",
  shoulders: "🏋️",
  core: "🎯",
};

export default function MuscleGroupFilter({
  selected,
  onChange,
}: MuscleGroupFilterProps) {
  return (
    <fieldset className="flex items-center gap-2 flex-wrap border-0 p-0 m-0">
      <legend className="sr-only">Filter by muscle group</legend>
      {ALL_GROUPS.map((group) => {
        const isActive = selected === group;
        const label =
          group === "all"
            ? "All"
            : (MUSCLE_GROUP_LABELS[group as string] ?? group);
        return (
          <button
            type="button"
            key={group}
            onClick={() => onChange(group)}
            data-ocid={`library.filter.${group}`}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth",
              isActive
                ? "bg-primary/15 text-primary border-primary/40"
                : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-border hover:bg-muted/60",
            )}
          >
            <span className="text-xs" role="img" aria-hidden="true">
              {GROUP_ICONS[group as string] ?? ""}
            </span>
            {label}
          </button>
        );
      })}
    </fieldset>
  );
}
