// Importa la app de express
import app from './src/app.js';
// Importa y configura dotenv para usar las variables de entorno
import 'dotenv/config';

// Lee el puerto desde las variables de entorno, con un valor por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
