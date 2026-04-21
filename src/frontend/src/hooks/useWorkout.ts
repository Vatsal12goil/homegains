import { createActor } from "@/backend";
import type { CompletedExercise, LogId, WorkoutLog } from "@/types";
import type { DayOfWeek } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useActiveWorkoutSession() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<WorkoutLog | null>({
    queryKey: ["activeWorkout"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getActiveWorkoutSession();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useWorkoutHistory() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<WorkoutLog[]>({
    queryKey: ["workoutHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkoutHistory();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60 * 1000,
  });
}

export function useWorkoutLog(logId: LogId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<WorkoutLog | null>({
    queryKey: ["workoutLog", logId?.toString()],
    queryFn: async () => {
      if (!actor || logId === null) return null;
      return actor.getWorkoutLog(logId);
    },
    enabled: !!actor && !isFetching && logId !== null,
  });
}

export function useStartWorkoutSession() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (day: DayOfWeek) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.startWorkoutSession(day);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["activeWorkout"] });
      qc.invalidateQueries({ queryKey: ["workoutHistory"] });
    },
  });
}

export function useLogExerciseCompletion() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      logId,
      completedExercise,
    }: { logId: LogId; completedExercise: CompletedExercise }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.logExerciseCompletion(logId, completedExercise);
    },
    onSuccess: (_, { logId }) => {
      qc.invalidateQueries({ queryKey: ["activeWorkout"] });
      qc.invalidateQueries({ queryKey: ["workoutLog", logId.toString()] });
    },
  });
}

export function useFinishWorkoutSession() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (logId: LogId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.finishWorkoutSession(logId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["activeWorkout"] });
      qc.invalidateQueries({ queryKey: ["workoutHistory"] });
    },
  });
}
