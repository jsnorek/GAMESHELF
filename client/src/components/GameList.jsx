// This component passes a list of game props to individual Game components. 
// Takes the Game component and renders the list of games displayed on the homepage.
import Game from "./Game";
import axios from "axios";

function GameList({ gameData, handleGameDetailsModalVisible, baseURL, loggedInUser }) {
    
// If no data in gameData prop then render "Loading game...", otherwise render the game data via Game.jsx template.
    if (!gameData ) {
        return <p>Loading games...</p>
    }
    console.log('game data from gamelist', gameData);

    // Function to post user's favorite game. user_id comes from loggedInUser data.
    // Function accepts game_id as a parameter and gets it passed back from Game.jsx through button onclick.
    const userFavoritesGame = async (game_id) => {
        try {
                const response = await axios.post(`${baseURL}/favorites`, {
                user_id: loggedInUser.user_id,
                game_id: game_id
            });
            
            if (response.status === 200) {
                const user = response.data;
                console.log("New favorited game successful", user);
            } else {
                console.error("Favorited game fail", response.data.message);
            }
        } catch (error) {
            console.error("error adding new favorite game:", error);
        }
      };

    // Map through gameData and assign key value pair for each.
    return (
        <div className="game-list">
            <h2>Highest Rated Games</h2>
            {gameData.map((game) => (
                <Game key={game.id} game={game} handleGameDetailsModalVisible={handleGameDetailsModalVisible} userFavoritesGame={userFavoritesGame}/>
            ))}
        </div>
    )
};

export default GameList;