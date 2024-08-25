import pool from '../pool';

const getUsers = async () => {
	const { rows } = await pool.query('SELECT * FROM users');
	return rows;
};

const getUserById = async (id: string) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows;
};

const createUser = async (username: string, password: string) => {
	const { rows } = await pool.query(
		'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
		[username, password],
	);
	return rows;
};

const updateUser = async (id: string, username: string, password: string) => {
	const { rows } = await pool.query(
		'UPDATE users SET username = $2, password = $3 WHERE id = $1 RETURNING *',
		[id, username, password],
	);
	return rows;
};

const deleteUser = async (id: string) => {
	const { rows } = await pool.query(
		'DELETE FROM users WHERE id = $1 RETURNING *',
		[id],
	);
	return rows;
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
