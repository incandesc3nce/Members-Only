import pool from '../pool';

const getUsers = async () => {
	const { rows } = await pool.query('SELECT * FROM users');
	return rows;
};

const getUserById = async (id: number) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows[0];
};

const getUserByUsername = async (username: string) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return rows[0];
}

const createUser = async (full_name: string, username: string, password: string) => {
	const { rows } = await pool.query(
		'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
		[username, password],
	);
	return rows;
};

const updateUser = async (id: string, full_name: string, username: string, password: string, is_member: boolean) => {
	const { rows } = await pool.query(
		'UPDATE users SET full_name = $1, username = $2, password = $3, is_member = $4 WHERE id = $5 RETURNING *',
		[full_name, username, password, is_member, id],
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

export { getUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser };
