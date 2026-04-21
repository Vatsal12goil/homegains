import Common "../types/common";
import ScheduleTypes "../types/schedule";
import ScheduleLib "../lib/schedule";

mixin () {

  var schedule : ScheduleLib.WeeklySchedule = ScheduleLib.defaultSchedule();

  public query func getWeeklySchedule() : async ScheduleTypes.WeeklySchedule {
    ScheduleLib.getSchedule(schedule);
  };

  public query func getDaySchedule(day : Common.DayOfWeek) : async ScheduleTypes.DaySchedule {
    ScheduleLib.getDaySchedule(schedule, day);
  };

  public func updateDaySchedule(day : Common.DayOfWeek, exercises : [ScheduleTypes.ScheduledExercise]) : async () {
    schedule := ScheduleLib.setDayExercises(schedule, day, exercises);
  };

  public func addExerciseToDay(day : Common.DayOfWeek, exercise : ScheduleTypes.ScheduledExercise) : async () {
    schedule := ScheduleLib.addExerciseToDay(schedule, day, exercise);
  };

  public func removeExerciseFromDay(day : Common.DayOfWeek, exerciseId : Common.ExerciseId) : async () {
    schedule := ScheduleLib.removeExerciseFromDay(schedule, day, exerciseId);
  };

  public func reorderDayExercises(day : Common.DayOfWeek, orderedIds : [Common.ExerciseId]) : async () {
    schedule := ScheduleLib.reorderDayExercises(schedule, day, orderedIds);
  };

};
