require('dotenv').config();
const Client = require('pg').Client;

const usersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
  );
`;

const messagesTable = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(500) NOT NULL,
    body VARCHAR(1500) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
  );
`;

// TODO: insert users and some messages

const main = async () => {
	const client = new Client({
		connectionString: process.env.DB_URL,
	});

	try {
		console.log('Creating tables...');
		await client.connect();
		await client.query(usersTable);
		await client.query(messagesTable);
		console.log('Tables created successfully!');

		// TODO: insert users and some messages

		await client.end();
	} catch (err) {
		console.error(err);
	}
};

main();
