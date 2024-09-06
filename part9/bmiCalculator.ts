function calculateBMI(heightInCm: number, weightInKg: number): String {
  const bmi = weightInKg / (heightInCm / 100) ** 2;
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal weight';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

console.log(calculateBMI(180, 74));
