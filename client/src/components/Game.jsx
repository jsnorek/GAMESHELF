import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';

function Game({ game }) {
    // If no data in game prop then render "Loading game...", otherwise render the game data
    if (!game) {
        return <p>Loading game...</p>
    }
    return (
        <div>
        <div key={game.id} className='game'>
            <img src={game.background_image} alt={game.name} style={{ width: '200px' }}/>
            <h3>{game.name}</h3>
            <p>Metacritic Rating: {game.metacritic}</p>
        </div>
        <Button label='details'/>
        <Button icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />
        </div>
    )
}

export default Game;