import pool from '../pool';

const getMessages = async () => {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
};

const getMessageById = async (id: string) => {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
  return rows;
};

const createMessage = async (text: string) => {
  const { rows } = await pool.query(
    'INSERT INTO messages (text) VALUES ($1) RETURNING *',
    [text],
  );
  return rows;
};

const updateMessage = async (id: string, text: string) => {
  const { rows } = await pool.query(
    'UPDATE messages SET text = $2 WHERE id = $1 RETURNING *',
    [id, text],
  );
  return rows;
};

const deleteMessage = async (id: string) => {
  const { rows } = await pool.query(
    'DELETE FROM messages WHERE id = $1 RETURNING *',
    [id],
  );
  return rows;
};

export { getMessages, getMessageById, createMessage, updateMessage, deleteMessage };