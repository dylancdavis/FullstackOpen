interface exerciseResult {
  daysTotal: number;
  daysExercised: number;
  targetHours: number;
  dailyAverageHours: number;
  metTarget: boolean;
  goalRating: number;
  ratingDescription: string;
}

const ratingDescriptions: string[] = [
  'Not even close to target hours',
  'Mostly met target hours',
  'Met or exceeded target hours',
];

function getRatingFromAverageHours(
  dailyAverageHours: number,
  targetHours: number
): number {
  const percentHoursCompleted = dailyAverageHours / targetHours;
  if (percentHoursCompleted < 0.75) return 1;
  if (percentHoursCompleted < 1) return 2;
  return 3;
}

function calculateExercises(
  dailyExerciseHours: number[],
  targetHours: number
): exerciseResult {
  const totalHoursExercised = dailyExerciseHours.reduce((a, b) => a + b, 0);
  const dailyAverageHours = totalHoursExercised / dailyExerciseHours.length;
  const goalRating = getRatingFromAverageHours(dailyAverageHours, targetHours);
  return {
    daysTotal: dailyExerciseHours.length,
    daysExercised: dailyExerciseHours.filter((n) => n !== 0).length,
    targetHours,
    dailyAverageHours,
    metTarget: goalRating === 3,
    goalRating,
    ratingDescription: ratingDescriptions[goalRating - 1],
  };
}

if (process.argv.length < 4) {
  throw new Error(
    `Incorrect number of arguments (${
      process.argv.length - 2
    }). Usage: npm run calculateExercises <target hours> <day one hours> <day two hours> ...`
  );
}

const [, , targetArg, ...dailyHoursArgs] = process.argv;
let target;
const dailyHours: number[] = [];

try {
  target = Number(targetArg);
  if (isNaN(target)) throw new Error();
} catch {
  throw new Error(`Target hours ${targetArg} could not be parsed as a number.`);
}

try {
  dailyHoursArgs.forEach((arg) => {
    const hours = Number(arg);
    if (isNaN(hours)) throw new Error();
    dailyHours.push(hours);
  });
} catch {
  throw new Error(
    `Daily hours (${dailyHoursArgs}) could not all be parsed as numbers.`
  );
}

console.log(calculateExercises(dailyHours, target));
