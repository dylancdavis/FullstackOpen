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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
