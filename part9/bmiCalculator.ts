export function calculateBMI(heightInCm: number, weightInKg: number): String {
  const bmi = weightInKg / (heightInCm / 100) ** 2;
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal weight';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

if (require.main === module) {
  if (process.argv.length !== 4) {
    throw new Error(
      `Incorrect number of arguments (${
        process.argv.length - 2
      }). Usage: npm run calculateBmi <height (cm)> <weight (kg)>`
    );
  }

  const [, , heightArg, weightArg] = process.argv;
  let height: number, weight: number;

  try {
    height = Number(heightArg);
    if (isNaN(height)) throw new Error();
  } catch (e) {
    throw new Error(`Height ${heightArg} could not be parsed as a number.`);
  }

  try {
    weight = Number(weightArg);
    if (isNaN(weight)) throw new Error();
  } catch (e) {
    throw new Error(`Weight ${weightArg} could not be parsed as a number.`);
  }

  console.log(calculateBMI(height, weight));
}
