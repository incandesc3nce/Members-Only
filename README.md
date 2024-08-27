# Members-Only

This project is about creating a simple authentication system using Passport.js and Express.js. The project is a simple message board where users can post messages and only authenticated users can view the author of the message and the time when the message was posted. Also only admins can delete messages of other users.

## Features

- User registration and authorization
- User session management: user stays logged in until they log out or the session expires
- User roles: admin, club member and user
- User can post messages
- Club members can view the author of the message and the time when the message was posted
- Admins can delete messages of other users

## Tech Stack

[![Tech Stack](https://skillicons.dev/icons?i=nodejs,js,express,postgres&theme=dark)](https://github.com/incandesc3nce/)

## Live Preview

Live preview is available at [Members-Only](https://members-only-production-7e71.up.railway.app/).

## Installation

1. Clone the repository

```bash
git clone https://github.com/incandesc3nce/Members-Only.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
DB_URL - The URL to the PostgreSQL database (URL format: postgresql://dbuser:password@database.server.com:3211/mydb)
HOST - The host for the server (default is localhost)
PORT - The port for the server (default is 3000)
ADMIN_PASSWORD - The password for the admin user
```

4. Create a PostgreSQL database named members, connect to it

```SQL
CREATE DATABASE members;
\c members; /* psql connect */
```

and run the following command in your terminal to populate the database with the necessary tables and example data

```bash
npm run populate
```

5. Start the server

```bash
npm start
```

6. Terminal output should display the following message

```bash
Server is running on http://localhost:3000
```

## Feedback

If you liked the project, please give it a star⭐. It means a lot!🙂

If you want to report bugs, please open an issue or a pull request.
