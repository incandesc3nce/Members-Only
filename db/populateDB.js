require('dotenv').config();
const Client = require('pg').Client;
const hashPassword = require('../utils/hashPassword');

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

const users = [
  {
    full_name: 'John Doe',
    username: 'john',
    password: hashPassword('john123'),
    is_member: false,
    is_admin: false,
  },
  {
    full_name: 'Jane Doe',
    username: 'jane',
    password: hashPassword('qwerty'),
    is_member: false,
    is_admin: false,
  },
];

const messages = [
  {
    title: 'Hello, world!',
    body: 'This thing we call "failure" is not the falling down, but the staying down.',
    author_id: 1,
  },
  {
    title: 'Ice T Quote',
    body: "Don't hate the player; hate the game.",
    author_id: 2,
  },
];


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

		console.log('Populating users...');
    for (const user of users) {
      const { full_name, username, password, is_member, is_admin } = user;
      const query = `
        INSERT INTO users (full_name, username, password, is_member, is_admin)
        VALUES ($1, $2, $3, $4, $5);
      `;
      await client.query(query, [full_name, username, password, is_member, is_admin]);
    }
    console.log('Users populated successfully!');

    console.log('Populating messages...');

    for (const message of messages) {
      const { title, body, author_id } = message;
      const query = `
        INSERT INTO messages (title, body, author_id)
        VALUES ($1, $2, $3);
      `;
      await client.query(query, [title, body, author_id]);
    }
    console.log('Messages populated successfully!');

		await client.end();
    console.log('Done.');
	} catch (err) {
		console.error(err);
	}
};

main();
