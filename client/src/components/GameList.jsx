// This component passes a list of game props to individual Game components. 
// Takes the Game component and renders the list of games displayed on the homepage
import Game from "./Game";

function GameList({ gameData }) {
// If no data in gameData prop then render "Loading game...", otherwise render the game data via Game.jsx template
    if (!gameData ) {
        return <p>Loading games...</p>
    }
    console.log('game data from gamelist', gameData);
    // Map through gameData and assign key value pair for each
    return (
        <div className="game-list">
            <h2>Highest Rated Games</h2>
            {gameData.map((game) => (
                <Game key={game.id} game={game} />
            ))}
        </div>
    )
};

export default GameList;