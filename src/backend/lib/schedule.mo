import Common "../types/common";
import Types "../types/schedule";
import Array "mo:core/Array";

module {
  public type ScheduledExercise = Types.ScheduledExercise;
  public type DaySchedule = Types.DaySchedule;
  public type WeeklySchedule = Types.WeeklySchedule;

  // Build a DaySchedule value
  func makeDay(day : Common.DayOfWeek, exercises : [ScheduledExercise]) : DaySchedule {
    { day; exercises };
  };

  // Returns the default 5-day schedule pre-seeded with exercises from the library
  public func defaultSchedule() : WeeklySchedule {
    {
      monday = makeDay(#monday, [
        { exerciseId = 1; sets = 3; reps = 12; notes = "Keep core tight" },  // Push-Up
        { exerciseId = 4; sets = 3; reps = 10; notes = "Feet on chair" },     // Decline Push-Up
        { exerciseId = 19; sets = 3; reps = 12; notes = "Chair dips" },       // Tricep Dip
        { exerciseId = 25; sets = 3; reps = 1;  notes = "Hold 30 seconds" },  // Plank
        { exerciseId = 27; sets = 3; reps = 15; notes = "Slow and controlled" }, // Crunch
      ]);
      tuesday = makeDay(#tuesday, [
        { exerciseId = 6;  sets = 3; reps = 6;  notes = "Full dead hang" },   // Pull-Up
        { exerciseId = 8;  sets = 3; reps = 12; notes = "Use table edge" },   // Inverted Row
        { exerciseId = 9;  sets = 3; reps = 10; notes = "Hold 2 sec at top" }, // Superman
        { exerciseId = 26; sets = 3; reps = 1;  notes = "Hold 25 seconds each side" }, // Side Plank
        { exerciseId = 30; sets = 3; reps = 12; notes = "Lower slowly" },     // Leg Raise
      ]);
      wednesday = makeDay(#wednesday, [
        { exerciseId = 11; sets = 3; reps = 15; notes = "Thighs parallel" },  // Squat
        { exerciseId = 13; sets = 3; reps = 10; notes = "5 each leg" },       // Forward Lunge
        { exerciseId = 17; sets = 3; reps = 15; notes = "Squeeze glutes" },   // Glute Bridge
        { exerciseId = 16; sets = 3; reps = 20; notes = "Slow on way down" }, // Calf Raise
        { exerciseId = 29; sets = 3; reps = 20; notes = "10 each side" },     // Mountain Climber
      ]);
      thursday = makeDay(#thursday, [
        { exerciseId = 3;  sets = 3; reps = 8;  notes = "Elbows in" },        // Diamond Push-Up
        { exerciseId = 5;  sets = 3; reps = 8;  notes = "Hips high" },        // Pike Push-Up
        { exerciseId = 22; sets = 3; reps = 16; notes = "8 each side" },      // Shoulder Tap
        { exerciseId = 28; sets = 3; reps = 16; notes = "8 each side" },      // Bicycle Crunch
        { exerciseId = 20; sets = 3; reps = 10; notes = "Elbows tucked" },    // Close-Grip Push-Up
      ]);
      friday = makeDay(#friday, [
        { exerciseId = 12; sets = 3; reps = 10; notes = "Land softly" },      // Jump Squat
        { exerciseId = 14; sets = 3; reps = 10; notes = "5 each leg" },       // Reverse Lunge
        { exerciseId = 18; sets = 3; reps = 10; notes = "5 each leg" },       // Single-Leg Glute Bridge
        { exerciseId = 15; sets = 3; reps = 1;  notes = "Hold 45 seconds" },  // Wall Sit
        { exerciseId = 10; sets = 3; reps = 12; notes = "Hold 1 sec at top" }, // Back Extension
      ]);
      saturday = makeDay(#saturday, []);  // Rest day
      sunday   = makeDay(#sunday,   []);  // Rest day
    };
  };

  public func getSchedule(schedule : WeeklySchedule) : WeeklySchedule {
    schedule;
  };

  public func getDaySchedule(schedule : WeeklySchedule, day : Common.DayOfWeek) : DaySchedule {
    switch day {
      case (#monday)    schedule.monday;
      case (#tuesday)   schedule.tuesday;
      case (#wednesday) schedule.wednesday;
      case (#thursday)  schedule.thursday;
      case (#friday)    schedule.friday;
      case (#saturday)  schedule.saturday;
      case (#sunday)    schedule.sunday;
    };
  };

  public func setDayExercises(schedule : WeeklySchedule, day : Common.DayOfWeek, exercises : [ScheduledExercise]) : WeeklySchedule {
    let updated = makeDay(day, exercises);
    switch day {
      case (#monday)    ({ schedule with monday    = updated });
      case (#tuesday)   ({ schedule with tuesday   = updated });
      case (#wednesday) ({ schedule with wednesday = updated });
      case (#thursday)  ({ schedule with thursday  = updated });
      case (#friday)    ({ schedule with friday    = updated });
      case (#saturday)  ({ schedule with saturday  = updated });
      case (#sunday)    ({ schedule with sunday    = updated });
    };
  };

  public func addExerciseToDay(schedule : WeeklySchedule, day : Common.DayOfWeek, exercise : ScheduledExercise) : WeeklySchedule {
    let current = getDaySchedule(schedule, day);
    let newExercises = current.exercises.concat([exercise]);
    setDayExercises(schedule, day, newExercises);
  };

  public func removeExerciseFromDay(schedule : WeeklySchedule, day : Common.DayOfWeek, exerciseId : Common.ExerciseId) : WeeklySchedule {
    let current = getDaySchedule(schedule, day);
    let filtered = current.exercises.filter(func(se) { se.exerciseId != exerciseId });
    setDayExercises(schedule, day, filtered);
  };

  public func reorderDayExercises(schedule : WeeklySchedule, day : Common.DayOfWeek, orderedIds : [Common.ExerciseId]) : WeeklySchedule {
    let current = getDaySchedule(schedule, day);
    // Build a reordered list following orderedIds; skip ids not present
    let reordered = orderedIds.filterMap(
      func(id) {
        current.exercises.find(func(se) { se.exerciseId == id })
      }
    );
    setDayExercises(schedule, day, reordered);
  };
};
