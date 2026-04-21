import Common "../types/common";
import Types "../types/exercises";
import List "mo:core/List";

module {
  public type Exercise = Types.Exercise;

  public func seed() : List.List<Exercise> {
    let list = List.empty<Exercise>();

    // ── CHEST ────────────────────────────────────────────────────────────────
    list.add({
      id = 1;
      name = "Push-Up";
      muscleGroup = #chest;
      description = "The classic push-up builds chest, shoulder, and tricep strength using only your bodyweight.";
      steps = [
        "Start in a high plank: hands shoulder-width apart, arms straight, body in a straight line from head to heels.",
        "Engage your core and squeeze your glutes to keep your hips level throughout the movement.",
        "Bend your elbows at roughly 45 degrees and lower your chest until it nearly touches the floor.",
        "Pause briefly at the bottom, then press through your palms to push back up to the start.",
        "Fully extend your arms at the top without locking the elbows, then repeat.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #pushUp;
    });

    list.add({
      id = 2;
      name = "Wide Push-Up";
      muscleGroup = #chest;
      description = "A push-up variation with a wider hand stance that places extra emphasis on the outer chest.";
      steps = [
        "Set up in a high plank with hands placed wider than shoulder-width apart, fingers pointing slightly outward.",
        "Keep your body rigid — head, hips, and heels aligned.",
        "Lower your chest toward the floor by bending your elbows outward.",
        "Stop when your chest is an inch from the floor, then press back up explosively.",
        "Keep elbows slightly bent at the top to maintain tension on the chest.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #pushUp;
    });

    list.add({
      id = 3;
      name = "Diamond Push-Up";
      muscleGroup = #chest;
      description = "Hands form a diamond shape beneath your chest, maximising tricep and inner-chest activation.";
      steps = [
        "Place your hands directly under your chest with index fingers and thumbs touching to form a diamond shape.",
        "Extend your legs behind you into a high plank with a tight core.",
        "Lower your chest straight down toward your hands, keeping elbows tucked close to your sides.",
        "Touch the diamond with your chest gently, then press back up to the start.",
        "Breathe out on the way up; maintain a neutral spine throughout.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #pushUp;
    });

    list.add({
      id = 4;
      name = "Decline Push-Up";
      muscleGroup = #chest;
      description = "Feet elevated on a surface shifts load to the upper chest and shoulders.";
      steps = [
        "Place your feet on an elevated surface (chair, step, or couch) and hands on the floor shoulder-width apart.",
        "Form a straight diagonal line from your head to your feet.",
        "Lower your chest toward the floor, keeping elbows at 45 degrees.",
        "Press back up until arms are nearly straight, then repeat.",
        "The higher the elevation, the more upper-chest involvement.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #pushUp;
    });

    list.add({
      id = 5;
      name = "Pike Push-Up";
      muscleGroup = #chest;
      description = "A shoulder-dominant push-up performed in an inverted-V position — great prep for handstand push-ups.";
      steps = [
        "Start in a downward-dog position: hands and feet on the floor, hips high, forming an inverted V.",
        "Walk feet closer to hands until your torso is nearly vertical.",
        "Bend your elbows and lower the top of your head toward the floor between your hands.",
        "Push through your palms to straighten your arms and return to the inverted-V position.",
        "Keep your hips raised and your core braced throughout.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #pushUp;
    });

    // ── BACK ─────────────────────────────────────────────────────────────────
    list.add({
      id = 6;
      name = "Pull-Up";
      muscleGroup = #back;
      description = "The gold-standard upper-body pulling exercise targeting the lats, biceps, and mid-back.";
      steps = [
        "Hang from a bar with an overhand grip slightly wider than shoulder-width, arms fully extended.",
        "Depress and retract your shoulder blades to initiate the pull.",
        "Drive your elbows down and back, pulling your chin above the bar.",
        "Hold briefly at the top, then lower yourself in a controlled manner.",
        "Avoid swinging or kipping to keep maximum tension on the back muscles.",
      ];
      difficulty = #advanced;
      estimatedDurationSeconds = 60;
      animationType = #pullUp;
    });

    list.add({
      id = 7;
      name = "Chin-Up";
      muscleGroup = #back;
      description = "An underhand-grip pull-up that adds bicep emphasis alongside back development.";
      steps = [
        "Hang from a bar with palms facing you (supinated grip) at shoulder-width.",
        "Brace your core and cross your ankles behind you.",
        "Pull yourself up by driving your elbows down, aiming to bring your chin over the bar.",
        "Squeeze your biceps and back at the top, then slowly lower to a dead hang.",
        "Keep the movement strict — no swinging.",
      ];
      difficulty = #advanced;
      estimatedDurationSeconds = 60;
      animationType = #pullUp;
    });

    list.add({
      id = 8;
      name = "Inverted Row";
      muscleGroup = #back;
      description = "A horizontal pulling movement using a low bar or table edge — excellent back builder for beginners.";
      steps = [
        "Lie under a sturdy table or low bar, grip it overhand at shoulder-width.",
        "Extend your legs and keep your body in a straight line from heels to head.",
        "Pull your chest up to the bar by driving your elbows back.",
        "Squeeze your shoulder blades together at the top.",
        "Lower yourself with control until arms are straight, then repeat.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #pullUp;
    });

    list.add({
      id = 9;
      name = "Superman Hold";
      muscleGroup = #back;
      description = "A prone lower-back exercise that strengthens the erector spinae and glutes with zero equipment.";
      steps = [
        "Lie face down on the floor with arms extended overhead and legs straight.",
        "Simultaneously lift your arms, chest, and legs off the floor as high as comfortable.",
        "Squeeze your glutes and lower-back muscles hard at the top.",
        "Hold the raised position for 2-3 seconds.",
        "Lower everything back to the floor slowly and repeat.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 45;
      animationType = #generic;
    });

    list.add({
      id = 10;
      name = "Back Extension";
      muscleGroup = #back;
      description = "Controlled spinal extension from a prone position strengthens the entire posterior chain.";
      steps = [
        "Lie face down with hands lightly behind your head or beside your temples.",
        "Keep your feet hip-width apart and toes on the floor.",
        "Raise your chest and upper body off the floor using your lower-back muscles.",
        "Hold at the top for a beat, then slowly lower back down.",
        "Avoid pulling on your neck — the back should do the work.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 45;
      animationType = #generic;
    });

    // ── LEGS ─────────────────────────────────────────────────────────────────
    list.add({
      id = 11;
      name = "Bodyweight Squat";
      muscleGroup = #legs;
      description = "The foundational lower-body exercise targeting quads, hamstrings, and glutes.";
      steps = [
        "Stand with feet shoulder-width apart, toes turned out 15–30 degrees.",
        "Brace your core, chest up, and push your knees out in line with your toes.",
        "Sit back and down until your thighs are parallel to (or below) the floor.",
        "Drive through your heels to stand back up, squeezing your glutes at the top.",
        "Keep your heels on the floor and your torso as upright as possible.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #squat;
    });

    list.add({
      id = 12;
      name = "Jump Squat";
      muscleGroup = #legs;
      description = "An explosive squat variation that builds lower-body power and burns calories fast.";
      steps = [
        "Stand in your squat stance and descend to a parallel squat.",
        "From the bottom, explode upward as powerfully as possible, leaving the ground.",
        "Extend your hips, knees, and ankles fully in the air.",
        "Land softly with bent knees, absorbing the impact through your entire foot.",
        "Immediately drop back into the squat and repeat with minimal pause.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 45;
      animationType = #squat;
    });

    list.add({
      id = 13;
      name = "Forward Lunge";
      muscleGroup = #legs;
      description = "A unilateral leg exercise that improves balance while targeting quads and glutes.";
      steps = [
        "Stand tall with feet together and hands on hips or at your sides.",
        "Take a large step forward with one foot and lower your back knee toward the floor.",
        "Both knees should reach approximately 90 degrees at the bottom.",
        "Push off your front heel to return to the starting position.",
        "Alternate legs each rep, or complete all reps on one side then switch.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #lunge;
    });

    list.add({
      id = 14;
      name = "Reverse Lunge";
      muscleGroup = #legs;
      description = "Stepping backward reduces knee stress and increases hamstring and glute activation.";
      steps = [
        "Stand with feet hip-width apart and core engaged.",
        "Step one foot back and lower your hips until both knees are at 90 degrees.",
        "Keep your front shin vertical and your torso upright.",
        "Push through your front heel to drive yourself back to the starting position.",
        "Complete desired reps then switch legs.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #lunge;
    });

    list.add({
      id = 15;
      name = "Wall Sit";
      muscleGroup = #legs;
      description = "An isometric quad exercise — hold the seated position against a wall for time.";
      steps = [
        "Stand with your back against a flat wall, feet shoulder-width apart.",
        "Walk your feet out and slide down the wall until your thighs are parallel to the floor.",
        "Your knees should be directly above your ankles, not jutting forward.",
        "Press your back flat into the wall and hold the position.",
        "Breathe steadily and hold for the prescribed duration.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #squat;
    });

    list.add({
      id = 16;
      name = "Calf Raise";
      muscleGroup = #legs;
      description = "Targets the gastrocnemius and soleus to build strong, defined calves.";
      steps = [
        "Stand upright with feet hip-width apart, toes pointing forward.",
        "Optionally hold a wall or chair lightly for balance.",
        "Rise up onto the balls of your feet as high as possible.",
        "Pause at the top for a second, then slowly lower your heels back to the floor.",
        "For greater range, stand on the edge of a step and allow heels to drop below it.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 45;
      animationType = #generic;
    });

    list.add({
      id = 17;
      name = "Glute Bridge";
      muscleGroup = #legs;
      description = "A hip-thrust movement that isolates the glutes and activates the hamstrings.";
      steps = [
        "Lie on your back with knees bent, feet flat on the floor hip-width apart.",
        "Press your lower back into the floor and brace your core.",
        "Drive through your heels to lift your hips until your body forms a straight line from knees to shoulders.",
        "Squeeze your glutes hard at the top and hold for a count.",
        "Lower your hips slowly back to the floor and repeat.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #generic;
    });

    list.add({
      id = 18;
      name = "Single-Leg Glute Bridge";
      muscleGroup = #legs;
      description = "A unilateral glute bridge that increases the challenge and corrects imbalances.";
      steps = [
        "Lie on your back with knees bent and feet flat on the floor.",
        "Extend one leg straight out, keeping thighs parallel.",
        "Press through the heel of your planted foot to raise your hips off the floor.",
        "Keep your hips level — resist letting the free-leg side drop.",
        "Squeeze at the top, then lower with control. Complete all reps before switching legs.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #generic;
    });

    // ── ARMS ─────────────────────────────────────────────────────────────────
    list.add({
      id = 19;
      name = "Tricep Dip";
      muscleGroup = #arms;
      description = "Use a chair or step to work the triceps through a full range of motion.";
      steps = [
        "Sit on the edge of a sturdy chair and place your palms on the seat beside your hips, fingers forward.",
        "Slide your hips off the edge, supporting your weight on your hands with legs extended or bent.",
        "Bend your elbows and lower your hips toward the floor until elbows reach 90 degrees.",
        "Press through your palms to straighten your arms and return to the start.",
        "Keep your back close to the chair throughout to protect your shoulders.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #dip;
    });

    list.add({
      id = 20;
      name = "Close-Grip Push-Up";
      muscleGroup = #arms;
      description = "Narrow hand placement on a push-up shifts the work primarily to the triceps.";
      steps = [
        "Get into a high plank with hands directly under your shoulders, only a few inches apart.",
        "Keep your elbows tucked tight against your torso.",
        "Lower your chest between your hands, elbows traveling straight back.",
        "Press up powerfully to the start, fully extending the arms.",
        "Maintain a rigid plank body position throughout.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #pushUp;
    });

    list.add({
      id = 21;
      name = "Towel Bicep Curl";
      muscleGroup = #arms;
      description = "Use a table leg or door handle with a towel to create bicep resistance.";
      steps = [
        "Loop a towel around the leg of a heavy table or a door handle at waist height.",
        "Hold both ends of the towel and lean back slightly, arms extended.",
        "Curl both hands toward your shoulders by bending the elbows, using the towel as resistance.",
        "Squeeze your biceps hard at the top, then slowly extend back to the starting position.",
        "Adjust your lean angle to increase or decrease resistance.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #generic;
    });

    // ── SHOULDERS ────────────────────────────────────────────────────────────
    list.add({
      id = 22;
      name = "Shoulder Tap";
      muscleGroup = #shoulders;
      description = "A plank variation where alternating shoulder taps challenge stability and anti-rotation core strength.";
      steps = [
        "Start in a high plank with hands under shoulders and feet hip-width apart.",
        "Brace your core and keep your hips square to the ground.",
        "Lift one hand and touch the opposite shoulder, minimising hip rotation.",
        "Return the hand to the floor and repeat on the other side.",
        "The wider your feet, the easier the balance — narrow them to increase difficulty.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #plank;
    });

    list.add({
      id = 23;
      name = "Bodyweight Side Lateral Raise";
      muscleGroup = #shoulders;
      description = "Lie sideways on the floor and raise your top arm to target the medial deltoid.";
      steps = [
        "Lie on your side with your body in a straight line and top arm resting along your thigh.",
        "Keep your bottom arm extended above your head for support.",
        "Raise your top arm straight up toward the ceiling, perpendicular to your body.",
        "Hold briefly at the top, then lower slowly back to your thigh.",
        "Complete all reps on one side, then flip over and repeat.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 45;
      animationType = #generic;
    });

    list.add({
      id = 24;
      name = "Bodyweight Overhead Press";
      muscleGroup = #shoulders;
      description = "Mimic the overhead press movement pattern using resistance from a wall or partner for shoulder strength.";
      steps = [
        "Stand facing a wall about 60 cm away and place your palms flat on it at shoulder height.",
        "Step back slightly so your body is at a slight forward lean.",
        "Bend your elbows and bring your head toward the wall in a controlled push-away.",
        "Press your hands into the wall to push your body back to the start.",
        "Increase difficulty by stepping further back to increase the angle.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 45;
      animationType = #generic;
    });

    // ── CORE ─────────────────────────────────────────────────────────────────
    list.add({
      id = 25;
      name = "Plank";
      muscleGroup = #core;
      description = "The benchmark core stability exercise — hold a rigid plank position for time.";
      steps = [
        "Place forearms on the floor with elbows under shoulders, hands flat or clasped together.",
        "Extend your legs behind you, resting on your toes.",
        "Brace your core as if bracing for a punch and squeeze your glutes.",
        "Keep your body in one straight line — no sagging hips or raised buttocks.",
        "Breathe normally and hold for the target time.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #plank;
    });

    list.add({
      id = 26;
      name = "Side Plank";
      muscleGroup = #core;
      description = "Works the obliques and hip abductors through a lateral isometric hold.";
      steps = [
        "Lie on your side with your elbow directly below your shoulder and feet stacked.",
        "Lift your hips off the floor, forming a straight line from head to feet.",
        "Keep your top hand on your hip or extended toward the ceiling.",
        "Hold without letting your hips drop.",
        "Complete the hold on each side equally.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #plank;
    });

    list.add({
      id = 27;
      name = "Crunch";
      muscleGroup = #core;
      description = "The classic ab crunch isolates the rectus abdominis through a short, controlled range of motion.";
      steps = [
        "Lie on your back with knees bent, feet flat on the floor, hands behind your head.",
        "Press your lower back into the floor and engage your core.",
        "Curl your shoulders and upper back off the floor using your abs.",
        "Hold the contracted position for a count, then lower slowly.",
        "Avoid pulling on your neck — the hands are just for support.",
      ];
      difficulty = #beginner;
      estimatedDurationSeconds = 60;
      animationType = #crunch;
    });

    list.add({
      id = 28;
      name = "Bicycle Crunch";
      muscleGroup = #core;
      description = "A rotational crunch that works both the rectus abdominis and obliques simultaneously.";
      steps = [
        "Lie on your back with hands loosely behind your head and legs raised, knees bent 90 degrees.",
        "Bring your right elbow and left knee toward each other while extending your right leg.",
        "Twist from the waist — not just the elbow — to maximise oblique engagement.",
        "Switch sides in a smooth pedaling motion.",
        "Keep your lower back pressed into the floor throughout.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #crunch;
    });

    list.add({
      id = 29;
      name = "Mountain Climber";
      muscleGroup = #core;
      description = "A dynamic plank movement that raises heart rate while training core stability.";
      steps = [
        "Start in a high plank with hands under shoulders and body in a straight line.",
        "Drive one knee toward your chest without raising your hips.",
        "Quickly switch legs in a running motion, alternating knees to chest.",
        "Keep your core tight and hips level throughout.",
        "Maintain a steady rhythm — faster for cardio, slower for core focus.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 45;
      animationType = #mountainClimber;
    });

    list.add({
      id = 30;
      name = "Leg Raise";
      muscleGroup = #core;
      description = "A lying leg raise challenges the lower abs and hip flexors without any equipment.";
      steps = [
        "Lie flat on your back with legs straight and hands under your lower back for support.",
        "Press your lower back into the floor and brace your core.",
        "Raise both legs until they are perpendicular to the floor (or as high as you can).",
        "Slowly lower your legs back down without letting them touch the floor.",
        "Stop just above the floor to maintain tension, then repeat.",
      ];
      difficulty = #intermediate;
      estimatedDurationSeconds = 60;
      animationType = #crunch;
    });

    list;
  };

  public func getAll(exercises : List.List<Exercise>) : [Exercise] {
    exercises.toArray();
  };

  public func getById(exercises : List.List<Exercise>, id : Common.ExerciseId) : ?Exercise {
    exercises.find(func(e) { e.id == id });
  };
};
