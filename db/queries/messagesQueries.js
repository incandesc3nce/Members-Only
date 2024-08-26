const pool = require('../pool');

const getMessages = async () => {
	const { rows } = await pool.query('SELECT * FROM messages');
	return rows;
};

const getMessageById = async (id) => {
	const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
		id,
	]);
	return rows[0];
};

const createMessage = async (text) => {
	const { rows } = await pool.query(
		'INSERT INTO messages (text) VALUES ($1) RETURNING *',
		[text],
	);
	return rows[0];
};

const updateMessage = async (id, text) => {
	const { rows } = await pool.query(
		'UPDATE messages SET text = $2 WHERE id = $1 RETURNING *',
		[id, text],
	);
	return rows;
};

const deleteMessage = async (id) => {
	const { rows } = await pool.query(
		'DELETE FROM messages WHERE id = $1 RETURNING *',
		[id],
	);
	return rows;
};

module.exports = {
	getMessages,
	getMessageById,
	createMessage,
	updateMessage,
	deleteMessage,
};
