import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.log('Database connection error.', error);
  });

app.get('/', (_req, res) => {
  return res.json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
