import Common "../types/common";
import WorkoutTypes "../types/workoutlog";
import WorkoutLib "../lib/workoutlog";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (logs : List.List<WorkoutLib.WorkoutLog>) {

  var nextLogId : Nat = 1;

  public func startWorkoutSession(day : Common.DayOfWeek) : async WorkoutTypes.WorkoutLog {
    let timestamp = Time.now();
    let (newLog, newNextId) = WorkoutLib.startSession(logs, nextLogId, day, timestamp);
    nextLogId := newNextId;
    newLog;
  };

  public func logExerciseCompletion(logId : Common.LogId, completedExercise : WorkoutTypes.CompletedExercise) : async Bool {
    WorkoutLib.logExercise(logs, logId, completedExercise);
  };

  public func finishWorkoutSession(logId : Common.LogId) : async Bool {
    let timestamp = Time.now();
    WorkoutLib.finishSession(logs, logId, timestamp);
  };

  public query func getWorkoutHistory() : async [WorkoutTypes.WorkoutLog] {
    WorkoutLib.getHistory(logs);
  };

  public query func getActiveWorkoutSession() : async ?WorkoutTypes.WorkoutLog {
    WorkoutLib.getActiveSession(logs);
  };

  public query func getWorkoutLog(logId : Common.LogId) : async ?WorkoutTypes.WorkoutLog {
    WorkoutLib.getLogById(logs, logId);
  };

};
