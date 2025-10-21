import pool from '../config/db.js';

// GET all songs (con lógica de búsqueda)
export const getAllCanciones = async (req, res) => {
  let conn;
  try {
    const { search } = req.query;
    conn = await pool.getConnection();

    let query;
    let params = [];

    if (search) {
      query = 'SELECT * FROM canciones WHERE titulo LIKE ? OR artista_nombre LIKE ?;';
      params = [`%${search}%`, `%${search}%`];
    } else {
      query = 'SELECT * FROM canciones;';
    }

    const rows = await conn.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Ocurrió un error al obtener las canciones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// GET song by ID
export const getCancionById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const query = 'SELECT * FROM canciones WHERE id = ?;';
    const rows = await conn.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Ocurrió un error al obtener la canción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// POST create song
export const createCancion = async (req, res) => {
  let conn;
  try {
    const { titulo, artista_nombre } = req.body;
    if (!titulo || !artista_nombre) {
      return res.status(400).json({ message: 'El título y el nombre del artista son requeridos.' });
    }
    conn = await pool.getConnection();
    const query = 'INSERT INTO canciones (titulo, artista_nombre) VALUES (?, ?);';
    const result = await conn.query(query, [titulo, artista_nombre]);
    res.status(201).json({
      id: Number(result.insertId),
      titulo,
      artista_nombre,
    });
  } catch (error) {
    console.error('Ocurrió un error al crear la canción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// PUT update song
export const updateCancion = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { titulo, artista_nombre } = req.body;
    if (!titulo || !artista_nombre) {
      return res.status(400).json({ message: 'El título y el nombre del artista son requeridos.' });
    }
    conn = await pool.getConnection();
    const query = 'UPDATE canciones SET titulo = ?, artista_nombre = ? WHERE id = ?;';
    const result = await conn.query(query, [titulo, artista_nombre, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Canción no encontrada.' });
    }
    res.status(200).json({ message: 'Canción actualizada correctamente.' });
  } catch (error) {
    console.error('Ocurrió un error al actualizar la canción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// DELETE song
export const deleteCancion = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const query = 'DELETE FROM canciones WHERE id = ?;';
    const result = await conn.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Canción no encontrada.' });
    }
    res.sendStatus(204);
  } catch (error)
  {
    console.error('Ocurrió un error al eliminar la canción:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};