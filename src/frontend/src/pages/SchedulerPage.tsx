import { AddExerciseDialog } from "@/components/AddExerciseDialog";
import { ScheduledExerciseCard } from "@/components/ScheduledExerciseCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeeklySchedule } from "@/hooks/useSchedule";
import { cn } from "@/lib/utils";
import { DAYS_ORDER, type DayOfWeek } from "@/types";
import { Calendar, Moon, Plus } from "lucide-react";
import { useState } from "react";

const DAY_LABELS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

const DAY_FULL: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const JS_DAY_MAP: Record<number, string> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

function getTodayKey(): string {
  return JS_DAY_MAP[new Date().getDay()];
}

function formatTodayDate(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function SchedulerPage() {
  const { data: schedule, isLoading } = useWeeklySchedule();
  const todayKey = getTodayKey();

  const [dialogDay, setDialogDay] = useState<DayOfWeek | null>(null);

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {/* Page header */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Calendar className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground leading-tight">
                Weekly Schedule
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatTodayDate()}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-primary border-primary/30 bg-primary/10 font-mono text-xs"
          >
            Today: {DAY_FULL[todayKey]}
          </Badge>
        </div>
      </div>

      {/* Schedule grid */}
      <div className="p-6">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3"
            data-ocid="schedule.loading_state"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <Skeleton key={n} className="h-56 rounded-xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3"
            data-ocid="schedule.grid"
          >
            {DAYS_ORDER.map((day) => {
              const key = day as string;
              const daySchedule = schedule?.[key as keyof typeof schedule];
              const exercises = daySchedule?.exercises ?? [];
              const isToday = key === todayKey;
              const isRest = exercises.length === 0;

              return (
                <div
                  key={key}
                  data-ocid={`schedule.day.${key}`}
                  className={cn(
                    "flex flex-col rounded-xl border transition-smooth",
                    isToday
                      ? "border-primary/60 bg-primary/5 shadow-elevation ring-1 ring-primary/20"
                      : isRest
                        ? "border-border bg-card"
                        : "border-primary/20 bg-card hover:border-primary/40",
                  )}
                >
                  {/* Day column header */}
                  <div
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 border-b",
                      isToday
                        ? "border-primary/30 bg-primary/10 rounded-t-xl"
                        : "border-border rounded-t-xl",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "font-display font-bold text-sm uppercase tracking-wider",
                          isToday ? "text-primary" : "text-foreground",
                        )}
                      >
                        {DAY_LABELS[key]}
                      </span>
                      {isToday && (
                        <span className="text-[9px] font-bold text-primary bg-primary/20 border border-primary/40 px-1 py-0.5 rounded uppercase tracking-widest">
                          Today
                        </span>
                      )}
                    </div>
                    {!isRest ? (
                      <span className="text-[10px] font-mono text-primary bg-primary/15 border border-primary/30 px-1.5 py-0.5 rounded">
                        {exercises.length}
                      </span>
                    ) : null}
                  </div>

                  {/* Exercise list */}
                  <div className="flex-1 flex flex-col gap-1.5 p-2.5 min-h-[140px]">
                    {isRest ? (
                      <div
                        data-ocid={`schedule.rest_badge.${key}`}
                        className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4"
                      >
                        <Moon className="w-5 h-5 text-muted-foreground opacity-40" />
                        <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase opacity-50">
                          Rest
                        </span>
                      </div>
                    ) : (
                      exercises.map((ex, i) => (
                        <ScheduledExerciseCard
                          key={ex.exerciseId.toString()}
                          scheduled={ex}
                          day={day}
                          daySchedule={daySchedule!}
                          index={i}
                          total={exercises.length}
                        />
                      ))
                    )}
                  </div>

                  {/* Add exercise button */}
                  <div className="px-2.5 pb-2.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDialogDay(day)}
                      data-ocid={`schedule.add_exercise_button.${key}`}
                      className="w-full h-7 text-xs text-muted-foreground hover:text-primary border border-dashed border-border hover:border-primary/40 hover:bg-primary/5 gap-1 transition-smooth"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add exercise dialog */}
      {dialogDay && (
        <AddExerciseDialog
          open={dialogDay !== null}
          onClose={() => setDialogDay(null)}
          day={dialogDay}
          existingIds={
            schedule?.[dialogDay as keyof typeof schedule]?.exercises.map(
              (e) => e.exerciseId,
            ) ?? []
          }
        />
      )}
    </div>
  );
}
