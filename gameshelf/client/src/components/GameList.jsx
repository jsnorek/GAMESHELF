import Game from "./Game";

function GameList({ gameData }) {
    if (!gameData || !gameData.results) {
        return <p>Loading games...</p>
    }

    return (
        <div className="game-list">
            <h2>Highest Rated Games</h2>
            {gameData.results.map((game) => (
                <Game key={game.id} game={game} />
            ))}
        </div>
    )
};

export default GameList;