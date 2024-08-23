import 'dotenv/config';
import express from 'express';
import path from 'path';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * routers
 */

/*
 * 404
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}`);
});
