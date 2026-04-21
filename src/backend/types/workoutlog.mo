import Common "common";

module {
  public type CompletedExercise = {
    exerciseId : Common.ExerciseId;
    setsCompleted : Nat;
    repsCompleted : Nat;
    notes : Text;
  };

  public type WorkoutLog = {
    id : Common.LogId;
    date : Common.Timestamp;
    dayOfWeek : Common.DayOfWeek;
    completedExercises : [CompletedExercise];
    isActive : Bool; // true if session still in progress
  };
};
