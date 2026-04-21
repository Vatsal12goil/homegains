import List "mo:core/List";
import ExerciseLib "lib/exercises";
import WorkoutLib "lib/workoutlog";
import ExercisesApi "mixins/exercises-api";
import ScheduleApi "mixins/schedule-api";
import WorkoutLogApi "mixins/workoutlog-api";

actor {
  // Exercise catalog — seeded at init, read-only after that
  let exercises = ExerciseLib.seed();

  // Workout logs — append-only history
  let logs = List.empty<WorkoutLib.WorkoutLog>();

  include ExercisesApi(exercises);
  include ScheduleApi();
  include WorkoutLogApi(logs);
};
