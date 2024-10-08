const pool = require('../pool');

const getUsers = async () => {
	const { rows } = await pool.query('SELECT * FROM users');
	return rows;
};

const getUserById = async (id) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows[0];
};

const getUserByUsername = async (username) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
		username,
	]);
	return rows[0];
};

const createUser = async (full_name, username, password) => {
	const { rows } = await pool.query(
		'INSERT INTO users (full_name, username, password) VALUES ($1, $2, $3) RETURNING *',
		[full_name, username, password],
	);
	return rows;
};

const updateUser = async (id, full_name, username, password, is_member) => {
	const { rows } = await pool.query(
		'UPDATE users SET full_name = $1, username = $2, password = $3, is_member = $4 WHERE id = $5 RETURNING *',
		[full_name, username, password, is_member, id],
	);
	return rows;
};

const updateUserStatus = async (id) => {
	const { rows } = await pool.query(
		'UPDATE users SET is_member = TRUE WHERE id = $1 RETURNING *',
		[id],
	);
	return rows;
};

const updateUserAdmin = async (id) => {
	const { rows } = await pool.query(
		'UPDATE users SET is_admin = TRUE WHERE id = $1 RETURNING *',
		[id],
	);
	return rows;
};

const deleteUser = async (id) => {
	const { rows } = await pool.query(
		'DELETE FROM users WHERE id = $1 RETURNING *',
		[id],
	);
	return rows;
};

module.exports = {
	getUsers,
	getUserById,
	getUserByUsername,
	createUser,
	updateUser,
	updateUserStatus,
	updateUserAdmin,
	deleteUser,
};
