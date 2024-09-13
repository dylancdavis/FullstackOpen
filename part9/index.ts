import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    const numHeight = Number(height);
    const numWeight = Number(weight);
    if (isNaN(numHeight)) throw new Error('Could not parse height');
    if (isNaN(numWeight)) throw new Error('Could not parse weight');
    const bmi = calculateBMI(numHeight, numWeight);
    res.status(200).json({ height, weight, bmi });
  } catch (e) {
    res.status(404).send({ error: `malformatted parameters. ${e}` });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (daily_exercises === undefined || target === undefined)
    res.status(400).json({ error: 'parameters missing' });

  try {
    const dailyExercises = Array.from(daily_exercises as unknown[]);
    const dailyNums: number[] = dailyExercises.map(Number);
    const numTarget = Number(target);
    const result = calculateExercises(dailyNums, numTarget);
    res.json(result);
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express app running and listening on port ${PORT}`);
});
