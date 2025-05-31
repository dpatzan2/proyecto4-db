import express from 'express';
import dotenv from 'dotenv';
import universidadesRouter from './routes/universidades.js';

dotenv.config();

const app = express();
app.use(express.json());

// montas rutas
app.use('/universidades', universidadesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔆 Server escuchando en http://localhost:${port}`);
});
