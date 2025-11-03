import pool from '../config/db.js';

// GET all users
export const getAllUsuarios = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM usuarios;');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Ocurrió un error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// GET user by ID
export const getUsuarioById = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM usuarios WHERE id = ?;', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Ocurrió un error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// POST create user
export const createUsuario = async (req, res) => {
  let conn;
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido.' });
    }
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO usuarios (nombre) VALUES (?);',
      [nombre]
    );
    res.status(201).json({
      id: Number(result.insertId),
      nombre,
    });
  } catch (error) {
    console.error('Ocurrió un error al crear el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// PUT update user
export const updateUsuario = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido.' });
    }
    conn = await pool.getConnection();
    const result = await conn.query(
      'UPDATE usuarios SET nombre = ? WHERE id = ?;',
      [nombre, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente.' });
  } catch (error) {
    console.error('Ocurrió un error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};

// DELETE user
export const deleteUsuario = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM usuarios WHERE id = ?;', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Ocurrió un error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    if (conn) conn.release();
  }
};
