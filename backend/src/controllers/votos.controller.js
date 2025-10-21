import pool from '../config/db.js';

export const getAllVotos = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      SELECT
        v.id,
        v.cantidad,
        u.nombre AS usuario_nombre,
        c.titulo AS cancion_titulo,
        c.artista_nombre,
        e.nombre AS evento_nombre,
        v.creado_en
      FROM votos v
      JOIN usuarios u ON v.usuario_id = u.id
      JOIN canciones c ON v.cancion_id = c.id
      JOIN eventos e ON v.evento_id = e.id
      ORDER BY v.creado_en DESC;
    `;
    const rows = await conn.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Ocurrió un error al obtener los votos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

export const createVoto = async (req, res) => {
  let conn;
  try {
    const { usuario_id, cancion_id, evento_id, cantidad } = req.body;

    if (!usuario_id || !cancion_id || !evento_id || !cantidad) {
      return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    conn = await pool.getConnection();

    const checkQuery = 'SELECT id FROM votos WHERE usuario_id = ? AND cancion_id = ? AND evento_id = ?;';
    const existing = await conn.query(checkQuery, [usuario_id, cancion_id, evento_id]);

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Este usuario ya votó por esta canción en este evento.' });
    }

    const insertQuery = 'INSERT INTO votos (usuario_id, cancion_id, evento_id, cantidad) VALUES (?, ?, ?, ?);';
    const result = await conn.query(insertQuery, [usuario_id, cancion_id, evento_id, cantidad]);

    res.status(201).json({
      id: Number(result.insertId),
      ...req.body,
    });
  } catch (error) {
    console.error('Ocurrió un error al crear el voto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

export const getVotoById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const query = `
      SELECT
        v.id,
        v.cantidad,
        u.nombre AS usuario_nombre,
        c.titulo AS cancion_titulo,
        c.artista_nombre,
        e.nombre AS evento_nombre,
        v.creado_en
      FROM votos v
      JOIN usuarios u ON v.usuario_id = u.id
      JOIN canciones c ON v.cancion_id = c.id
      JOIN eventos e ON v.evento_id = e.id
      WHERE v.id = ?;
    `;
    const rows = await conn.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Voto no encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Ocurrió un error al obtener el voto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

export const deleteVoto = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM votos WHERE id = ?;', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Voto no encontrado.' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Ocurrió un error al eliminar el voto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

export const updateVoto = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || isNaN(cantidad)) {
      return res.status(400).json({ message: 'La cantidad es requerida y debe ser un número.' });
    }

    conn = await pool.getConnection();
    const query = 'UPDATE votos SET cantidad = ? WHERE id = ?;';
    const result = await conn.query(query, [cantidad, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Voto no encontrado.' });
    }
    res.status(200).json({ message: 'Solicitud actualizada correctamente.' });
  } catch (error) {
    console.error('Ocurrió un error al actualizar el voto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

export const getTopCanciones = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      SELECT
        c.id,
        c.titulo,
        c.artista_nombre,
        SUM(v.cantidad) AS total_votos
      FROM votos v
      JOIN canciones c ON v.cancion_id = c.id
      GROUP BY c.id, c.titulo, c.artista_nombre
      ORDER BY total_votos DESC
      LIMIT 10;
    `;
    const rows = await conn.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Ocurrió un error al obtener el top de canciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};