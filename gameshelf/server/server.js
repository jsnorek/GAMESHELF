import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db-connection.js';

const { query } = db;

dotenv.config();

const app = express();
const PORT = 8080;

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
app.get("/", async (req, res) => {
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
        const queryText = 'SELECT review_text, rating FROM reviews WHERE game_id = $1';
        const { rows } = await db.query(queryText, [gameId]);
        if(rows.length === 0) {
            return res.status(404).send({ message: 'No reviews found for this game' });
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
// request for user adding a game review
// request for user logging in
// request to update user information
// request to remove/delete a favorited game
// request to delete a user review


app.listen(PORT, () => {
    console.log(`Hi, server listening on ${PORT}`);
});
export default app;
