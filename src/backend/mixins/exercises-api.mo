import Common "../types/common";
import ExerciseTypes "../types/exercises";
import ExerciseLib "../lib/exercises";
import List "mo:core/List";

mixin (exercises : List.List<ExerciseLib.Exercise>) {

  public query func getAllExercises() : async [ExerciseTypes.Exercise] {
    ExerciseLib.getAll(exercises);
  };

  public query func getExercise(id : Common.ExerciseId) : async ?ExerciseTypes.Exercise {
    ExerciseLib.getById(exercises, id);
  };

};
