import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carsRouter from './routes/cars';
import motoRouter from './routes/motorcycles';

const app = express();
app.use(express.json());

app.use(carsRouter);
app.use(motoRouter);
app.use(errorHandler);

export default app;
