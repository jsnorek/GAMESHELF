// This component passes a list of game props to individual Game components. 
// Takes the Game component and renders the list of games displayed on the homepage.
import { useState } from "react";
import Game from "./Game";
import axios from "axios";
import { useEffect } from "react";

function GameList({ gameData, handleGameDetailsModalVisible, baseURL, loggedInUser }) {
    const [favoritedGames, setFavoritedGames] = useState([]);

    useEffect(() => {
        // Fetch user's favorited games from the database on component mount
        const fetchFavoritedGames = async () => {
            try {
                const response = await axios.get(`${baseURL}/favorites/${loggedInUser.user_id}`);
                const user = response.data;
                console.log("New favorited game successful", user);
                setFavoritedGames(response.data.map(fav => fav.game_id)); 
            } catch (error) {
                console.error("Error fetching favorited games:", error);
            }
        };

        fetchFavoritedGames();
    }, [loggedInUser, baseURL]);

    console.log("this twis the favoritedgames list", favoritedGames);

    // Function to post user's favorite game. user_id comes from loggedInUser data.
    // Function accepts game_id as a parameter and gets it passed back from Game.jsx through button onclick.
    const userFavoritesGame = async (game_id) => {
        try {
                const response = await axios.post(`${baseURL}/favorites`, {
                user_id: loggedInUser.user_id,
                game_id: game_id
            });
            
            if (response.status === 200) {
                // setFavoritedGames([...favoritedGames, game_id]); // Add game_id to favoritedGames
                setFavoritedGames(prev => [...prev, game_id]);
                console.log("New favorited game successful", response.data);
            } else {
                console.error("Favorited game fail", response.data.message);
            }
        } catch (error) {
            console.error("error adding new favorite game:", error);
        }
      };

      // If no data in gameData prop then render "Loading game...", otherwise render the game data via Game.jsx template.
    if (!gameData ) {
        return <p>Loading games...</p>
    }
    console.log('game data from gamelist', gameData);

    // Map through gameData and assign key value pair for each.
    return (
        <div className="game-list">
            <h2>Highest Rated Games</h2>
            {gameData.map((game) => (
                <Game 
                    key={game.id} 
                    game={game} 
                    handleGameDetailsModalVisible={handleGameDetailsModalVisible} 
                    userFavoritesGame={userFavoritesGame}
                    loggedInUser={loggedInUser}
                    favoritedGames={favoritedGames} // Pass whether the game is favorited
                />
            ))}
        </div>
    )
};

export default GameList;