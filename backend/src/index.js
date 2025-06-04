import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import universidadesRouter from './routes/universidades.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/universidades', universidadesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔆 Server escuchando en http://localhost:${port}`);
});
