module {
  public type ExerciseId = Nat;
  public type LogId = Nat;
  public type Timestamp = Int; // nanoseconds from Time.now()

  public type DayOfWeek = {
    #monday;
    #tuesday;
    #wednesday;
    #thursday;
    #friday;
    #saturday;
    #sunday;
  };

  public type MuscleGroup = {
    #chest;
    #back;
    #legs;
    #arms;
    #shoulders;
    #core;
  };

  public type Difficulty = {
    #beginner;
    #intermediate;
    #advanced;
  };

  public type AnimationType = {
    #pushUp;
    #pullUp;
    #squat;
    #plank;
    #lunge;
    #dip;
    #crunch;
    #jumpingJack;
    #burpee;
    #mountainClimber;
    #generic;
  };
};
