import Common "../types/common";
import Types "../types/workoutlog";
import List "mo:core/List";
import Array "mo:core/Array";

module {
  public type CompletedExercise = Types.CompletedExercise;
  public type WorkoutLog = Types.WorkoutLog;

  public func startSession(logs : List.List<WorkoutLog>, nextId : Nat, day : Common.DayOfWeek, timestamp : Common.Timestamp) : (WorkoutLog, Nat) {
    let newLog : WorkoutLog = {
      id = nextId;
      date = timestamp;
      dayOfWeek = day;
      completedExercises = [];
      isActive = true;
    };
    logs.add(newLog);
    (newLog, nextId + 1);
  };

  public func logExercise(logs : List.List<WorkoutLog>, logId : Common.LogId, completedExercise : CompletedExercise) : Bool {
    switch (logs.findIndex(func(l) { l.id == logId and l.isActive })) {
      case null false;
      case (?idx) {
        let existing = logs.at(idx);
        let updated : WorkoutLog = {
          existing with
          completedExercises = existing.completedExercises.concat([completedExercise])
        };
        logs.put(idx, updated);
        true;
      };
    };
  };

  public func finishSession(logs : List.List<WorkoutLog>, logId : Common.LogId, _timestamp : Common.Timestamp) : Bool {
    switch (logs.findIndex(func(l) { l.id == logId and l.isActive })) {
      case null false;
      case (?idx) {
        let existing = logs.at(idx);
        let updated : WorkoutLog = { existing with isActive = false };
        logs.put(idx, updated);
        true;
      };
    };
  };

  public func getHistory(logs : List.List<WorkoutLog>) : [WorkoutLog] {
    logs.toArray();
  };

  public func getActiveSession(logs : List.List<WorkoutLog>) : ?WorkoutLog {
    logs.find(func(l) { l.isActive });
  };

  public func getLogById(logs : List.List<WorkoutLog>, logId : Common.LogId) : ?WorkoutLog {
    logs.find(func(l) { l.id == logId });
  };
};
