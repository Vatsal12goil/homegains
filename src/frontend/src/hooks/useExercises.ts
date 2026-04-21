import { createActor } from "@/backend";
import type { Exercise, ExerciseId } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useAllExercises() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExercises();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useExercise(id: ExerciseId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Exercise | null>({
    queryKey: ["exercise", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getExercise(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 5 * 60 * 1000,
  });
}
