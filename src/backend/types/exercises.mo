import Common "common";

module {
  public type Exercise = {
    id : Common.ExerciseId;
    name : Text;
    muscleGroup : Common.MuscleGroup;
    description : Text;
    steps : [Text];
    difficulty : Common.Difficulty;
    estimatedDurationSeconds : Nat;
    animationType : Common.AnimationType;
  };
};
