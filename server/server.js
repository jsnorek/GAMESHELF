import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const { query } = db;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api key
const api_key = process.env.api_key

// test route
// app.get("/", (req, res) => {
//     res.json("Hello to your gameshelf server!");
// });

//request for top games to list on homepage
app.get("/api", async (req, res) => {
    console.log('root path triggered');
    const defaultGames = '&metacritic=80,100';
    const url = `https://api.rawg.io/api/games?key=${api_key}${defaultGames}`;
    const rawData = await fetch(url);
    const defaultGameData = await rawData.json();
    res.send(defaultGameData);
    if (!defaultGameData) {
        return res.status(404).send({ message: 'Game data from API not found'});
    }
});

//request for searching games
app.get('/search', async (req, res) => {
    const { query } = req.query;
    const url = `https://api.rawg.io/api/games?key=${api_key}&search=${query}`;
    try{
        const rawgRes = await fetch(url);
        const data = await rawgRes.json();
        console.log('RAWG API Data:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching search results', error);
        res.status(500).json({ message: 'Failed to fetch search results' });
    }
});

//request for user favorites game list
app.get('/favorites/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const queryText = 'SELECT game_id FROM favorites WHERE user_id = $1';
        const { rows } = await db.query(queryText, [userId]);
        if (rows.length === 0) {
            return res.status(404).send({ message: 'No favorite games found for this user' });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching favorite games', error);
        res.status(500).send('Server error');
    }
});

//request for user's game reviews 
app.get('/reviews/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const queryText = 'SELECT review_text, rating FROM reviews WHERE user_id = $1';
        const { rows } = await db.query(queryText, [userId]);
        if (rows.length === 0) {
            return res.status(404).send({ message: 'No reviews found for this user' });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching user reviews', error);
        res.status(500).send('Server error');
    }
});

//request for database reviews for game details page
app.get('/game-reviews/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    try {
        const queryText = 'SELECT r.review_text, r.rating, u.username, r.created_at FROM reviews r JOIN users u ON r.user_id = u.user_id WHERE r.game_id = $1';
        const { rows } = await db.query(queryText, [gameId]);
        if(rows.length === 0) {
            return res.status(200).send('');
            // return res.status(404).send({ message: 'No reviews found for this game' });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching game reviews', error);
        res.status(500).send('Server error');
    }
});

// request for fetching game details
app.get('/game/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    try {
        const url = `https://api.rawg.io/api/games/${gameId}?key=${api_key}`;
        const rawData = await fetch(url);
        const gameData = await rawData.json();
        if (!gameData) {
            return res.status(404).send({ message: 'Game not found' });
        }
        res.status(200).json(gameData);
    } catch (error) {
        console.error('Error fetching game details from API', error);
        res.status(500).send('Server error');
    }
});

// request for fetching all user information including reviews and favorite games
app.get('/user-info/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // const queryText = '
        // SELECT u.username, u.email, u.name, u.city, 
        // r.game_id AS review_game_id, r.rating, r.review_text, r.created_at, 
        // f.game_id AS favorite_game_id 
        // FROM users u 
        // LEFT JOIN reviews r ON u.user_id = r.user_id 
        // LEFT JOIN favorites f ON u.user_id = f.user_id 
        // WHERE u.user_id = $1';

        // json_agg() function aggregates (collects multiple rows of data and turns them into an array) the result set into the array - each row of the result set will be an element
        // json_build_object() function builds a JSON object for each review and then for each favorite
        const queryText = `
            SELECT 
                u.username, u.email, u.name, u.city,
                (
                    SELECT json_agg( 
                        json_build_object(
                            'game_id', r.game_id,
                            'rating', r.rating,
                            'review_text', r.review_text,
                            'created_at', r.created_at
                        )
                    )
                    FROM reviews r
                    WHERE r.user_id = u.user_id
                ) AS reviews,
                (
                    SELECT json_agg(
                        json_build_object(
                            'game_id', f.game_id
                        )
                    )
                    FROM favorites f
                    WHERE f.user_id = u.user_id
                ) AS favorites
            FROM users u 
            WHERE u.user_id = $1
        `; 
        const { rows } = await db.query(queryText, [userId]);
        if (rows.length === 0) {
            return res.status(200).send({ message: 'User not found' });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching user information', error);
        res.status(500).send('Server error');
    }
});

// request for adding a new user to the database
app.post('/users', async (req, res) => {
    const { username, email, password, name, city } = req.body;
    try {
        const queryText = 'INSERT INTO users (username, email, password, name, city) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(queryText, [username, email, password, name, city]);
        res.status(200).json(rows[0]); 
    } catch (error) {
        console.error('Error adding new user', error);
        res.status(500).send('Server error');
    }
});

// request for user adding a game to their favorites
app.post('/favorites', async (req, res) => {
    const { user_id, game_id } = req.body;
    try {
        const queryText = 'INSERT INTO favorites (user_id, game_id) VALUES ($1, $2) RETURNING *';
        const { rows } = await db.query(queryText, [user_id, game_id]);
        res.status(200).json(rows[0])
    } catch (error) {
        console.error('Error adding favorite game', error);
        res.status(500).send('Server error');
    }
});

// request for user adding a game review
app.post('/reviews', async (req, res) => {
    const { user_id, game_id, rating, review_text } = req.body;
    try {
        const queryText = 'INSERT INTO reviews (user_id, game_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await db.query(queryText, [user_id, game_id, rating, review_text]);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error adding game review', error);
        res.status(500).send('Server error');
    }
});

// request for user logging in
app.post('/login/', async (req, res) => {
    const { username, password } = req.body; // User sends username and password
    try {
        // Check the database for a user with the given username and password
        const queryText = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const { rows } = await db.query(queryText, [username, password]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const user = rows[0];
        // to return user's data except for password for added security
        res.status(200).json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            name: user.name,
            city: user.city
        });
        // res.status(200).json(rows[0]); // to return all of user's data including password
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).send('Server error');
    }
});

// request to update user information
// app.post('/users/:user_id', async (req, res) => {
//     const userId = req.params.user_id;
//     const { username, email, password, name, city } = req.body;
//     try {
//         const queryText = 'UPDATE users SET username = $1, email = $2, password = $3, name = $4, city = $5 WHERE user_id = $6 RETURNING *';
//         const { rows } = await db.query(queryText, [username, email, password, name, city, userId]);
//         res.status(200).json(rows[0]);
//     } catch (error) {
//         console.error('Error updating user information', error);
//         res.status(500).send('Server error');
//     }
// });

app.patch('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const { username, email, password, name, city } = req.body;
    try {
        if (username !== undefined) {
            await db.query('UPDATE users SET username = $1 WHERE user_id = $2', [username, userId]);
        }
        if (email !== undefined) {
            await db.query('UPDATE users SET email = $1 WHERE user_id = $2', [email, userId]);
        }
        if (password !== undefined) {
            await db.query('UPDATE users SET password = $1 WHERE user_id = $2', [password, userId]);
        }
        if (name !== undefined) {
            await db.query('UPDATE users SET name = $1 WHERE user_id = $2', [name, userId]);
        }
        if (city !== undefined) {
            await db.query('UPDATE users SET city = $1 WHERE user_id = $2', [city, userId]);
        }
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user information', error);
        res.status(500).send('Server error');
    }
});

// request to remove/delete a favorited game
app.delete('/favorites/:user_id/:game_id', async (req, res) => {
    const userId = req.params.user_id;
    const gameId = req.params.game_id;
    try {
        const queryText = 'DELETE FROM favorites WHERE user_id = $1 AND game_id = $2 RETURNING *';
        const { rows } = await db.query(queryText, [userId, gameId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Favorite game not found' });
        }
        res.status(200).json({ message: 'Favorite game removed' });
    } catch (error) {
        console.error('Error deleting favorite game', error);
        res.status(500).send('Server error');
    }
});

// request to delete a user review
app.delete('/reviews/:user_id/:game_id', async (req, res) => {
    const { user_id, game_id } = req.params;
    try {
        const queryText = 'DELETE FROM reviews WHERE user_id = $1 AND game_id = $2 RETURNING *';
        const { rows } = await db.query(queryText, [user_id, game_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting review', error);
        res.status(500).send('Server error');
    }
});

//FOR RENDER
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;
