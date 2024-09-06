import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Express app running and listening on port ${PORT}`);
});
