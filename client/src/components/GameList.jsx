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