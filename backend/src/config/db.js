import mariadb from 'mariadb';
import 'dotenv/config';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    conn.release();
  } catch (err) {
    console.error('❌ No se pudo conectar a la base de datos:', err);
  }
}

testConnection();

export default pool;