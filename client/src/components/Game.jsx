// This component creates a template for each individual game rendering from API.
// It displays the game's image, title, and rating, with buttons for viewing details and marking as favorite.

import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

function Game({ game, handleGameDetailsModalVisible, userFavoritesGame, loggedInUser, favoritedGames}) {

    // Determine if the game is currently favorited
    const isFavorited = favoritedGames.includes(game.id);

    // On button click, if the game_id is not already on the favorited list pulled from the endpoint in GameList,
    // Then run endpoint to add to user's favorites list
    const handleFavoriteClick = () => {
        if (!isFavorited) {
            userFavoritesGame(game.id);
        }
    };

    return (
        <div>
        <div key={game.id} className='game'>
            <img src={game.background_image} alt={game.name} style={{ width: '200px' }}/>
            <h3 className='game-title'>{game.name}</h3>
            <p>Metacritic Rating: {game.metacritic}</p>
        </div>
        <Button label='details' onClick={() => handleGameDetailsModalVisible(game.id)}/>
        {loggedInUser &&
        <Button 
            icon="pi pi-heart" 
            rounded 
            text 
            // severity={isFavorited ? "danger" : "help"}
            aria-label="Favorite" 
            onClick={handleFavoriteClick}
            style={{
                backgroundColor: isFavorited ? '#f744c4' : 'lightgray', 
                color: isFavorited ? 'white' : 'black' 
            }}
        />} 
        </div>
    )
}

export default Game;