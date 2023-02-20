import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { route } from './routes';
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

app.use('/', route);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
