import Common "common";

module {
  public type ScheduledExercise = {
    exerciseId : Common.ExerciseId;
    sets : Nat;
    reps : Nat;
    notes : Text;
  };

  public type DaySchedule = {
    day : Common.DayOfWeek;
    exercises : [ScheduledExercise];
  };

  public type WeeklySchedule = {
    monday : DaySchedule;
    tuesday : DaySchedule;
    wednesday : DaySchedule;
    thursday : DaySchedule;
    friday : DaySchedule;
    saturday : DaySchedule;
    sunday : DaySchedule;
  };
};
