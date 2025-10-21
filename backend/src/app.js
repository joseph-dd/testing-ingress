import express from 'express';
import cors from 'cors';

// Import routers
import cancionesRouter from './routes/canciones.routes.js';
import usuariosRouter from './routes/usuarios.routes.js';
import votosRouter from './routes/votos.routes.js';
import eventosRouter from './routes/eventos.routes.js'; 

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Main route
app.get('/', (req, res) => {
  res.json({ message: '¡API funcionando correctamente!' });
});

// API Routes
app.use('/api/canciones', cancionesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/solicitudes', votosRouter);
app.use('/api/eventos', eventosRouter); 

// Export
export default app;