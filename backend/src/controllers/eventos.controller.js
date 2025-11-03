import pool from '../config/db.js';

// GET all events
export const getAllEventos = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM eventos;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Ocurrió un error al obtener los eventos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// GET event by ID
export const getEventoById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM eventos WHERE id = ?;', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Ocurrió un error al obtener el evento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// POST create event
export const createEvento = async (req, res) => {
  let conn;
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res
        .status(400)
        .json({ message: 'El nombre del evento es requerido.' });
    }
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO eventos (nombre) VALUES (?);',
      [nombre]
    );
    res.status(201).json({
      id: Number(result.insertId),
      nombre,
    });
  } catch (error) {
    console.error('Ocurrió un error al crear el evento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// PUT update event
export const updateEvento = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido.' });
    }
    conn = await pool.getConnection();
    const result = await conn.query(
      'UPDATE eventos SET nombre = ? WHERE id = ?;',
      [nombre, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado.' });
    }
    res.status(200).json({ message: 'Evento actualizado correctamente.' });
  } catch (error) {
    console.error('Ocurrió un error al actualizar el evento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// DELETE event
export const deleteEvento = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM eventos WHERE id = ?;', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Evento no encontrado.' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Ocurrió un error al eliminar el evento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};
