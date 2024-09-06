import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express app running and listening on port ${PORT}`);
});
