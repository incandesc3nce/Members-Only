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

const createMessage = async (title, body, author_id) => {
	const { rows } = await pool.query(
		'INSERT INTO messages (title, body, author_id) VALUES ($1, $2, $3) RETURNING *',
		[title, body, author_id],
	);
	return rows[0];
};

const updateMessage = async (id, title, body) => {
	const { rows } = await pool.query(
		'UPDATE messages SET title = $2, body = $3 WHERE id = $1 RETURNING *',
		[id, title, body],
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
