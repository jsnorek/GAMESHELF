// This component creates a template for each individual game rendering from API.
// It displays the game's image, title, and rating, with buttons for viewing details and marking as favorite.

import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

function Game({ game, handleGameDetailsModalVisible, userFavoritesGame }) {
   
    // If no data in game prop then render "Loading game...", otherwise render the game data.
    if (!game) {
        return <p>Loading game...</p>
    }

    return (
        <div>
        <div key={game.id} className='game'>
            <img src={game.background_image} alt={game.name} style={{ width: '200px' }}/>
            <h3 className='game-title'>{game.name}</h3>
            <p>Metacritic Rating: {game.metacritic}</p>
        </div>
        <Button label='details' onClick={() => handleGameDetailsModalVisible(game.id)}/>
        <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" onClick={() => userFavoritesGame(game.id)}/> {/* Pass game.id here */}
        </div>
    )
}

export default Game;