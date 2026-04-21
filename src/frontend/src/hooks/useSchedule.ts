import { createActor } from "@/backend";
import type {
  DaySchedule,
  ExerciseId,
  ScheduledExercise,
  WeeklySchedule,
} from "@/types";
import type { DayOfWeek } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useWeeklySchedule() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<WeeklySchedule>({
    queryKey: ["weeklySchedule"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getWeeklySchedule();
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useDaySchedule(day: DayOfWeek) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DaySchedule>({
    queryKey: ["daySchedule", day],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDaySchedule(day);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdateDaySchedule() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      day,
      exercises,
    }: { day: DayOfWeek; exercises: ScheduledExercise[] }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.updateDaySchedule(day, exercises);
    },
    onSuccess: (_, { day }) => {
      qc.invalidateQueries({ queryKey: ["weeklySchedule"] });
      qc.invalidateQueries({ queryKey: ["daySchedule", day] });
    },
  });
}

export function useAddExerciseToDay() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      day,
      exercise,
    }: { day: DayOfWeek; exercise: ScheduledExercise }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addExerciseToDay(day, exercise);
    },
    onSuccess: (_, { day }) => {
      qc.invalidateQueries({ queryKey: ["weeklySchedule"] });
      qc.invalidateQueries({ queryKey: ["daySchedule", day] });
    },
  });
}

export function useRemoveExerciseFromDay() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      day,
      exerciseId,
    }: { day: DayOfWeek; exerciseId: ExerciseId }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeExerciseFromDay(day, exerciseId);
    },
    onSuccess: (_, { day }) => {
      qc.invalidateQueries({ queryKey: ["weeklySchedule"] });
      qc.invalidateQueries({ queryKey: ["daySchedule", day] });
    },
  });
}

export function useReorderDayExercises() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      day,
      orderedIds,
    }: { day: DayOfWeek; orderedIds: ExerciseId[] }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.reorderDayExercises(day, orderedIds);
    },
    onSuccess: (_, { day }) => {
      qc.invalidateQueries({ queryKey: ["weeklySchedule"] });
      qc.invalidateQueries({ queryKey: ["daySchedule", day] });
    },
  });
}
