// This component passes a list of game props to individual Game components.
// Takes the Game component and renders the list of games displayed on the homepage.

import Game from "./Game";

function GameList({
  gameData,
  isLoading,
  handleGameDetailsModalVisible,
  loggedInUser,
  favoritedGames,
  userFavoritesGame,
  userUnfavoritesGame,
}) {
  // If no data in gameData prop then render "Loading game...", otherwise render the game data via Game.jsx template.
  if (isLoading) {
    return <p>Loading games...</p>;
  }

  // Map through gameData and assign key value pair for each.
  return (
    <div className="game-list">
      <h2 className="header-text">Highest Rated Games</h2>
      {gameData.map((game) => {
        const isFavorited = favoritedGames.find((fav) => fav.id === game.id); // Find game ID in favorites list
        return (
          <Game
            key={game.id}
            game={game}
            handleGameDetailsModalVisible={handleGameDetailsModalVisible}
            userFavoritesGame={userFavoritesGame}
            loggedInUser={loggedInUser}
            isFavorited={isFavorited}
            userUnfavoritesGame={userUnfavoritesGame}
          />
        );
      })}
    </div>
  );
}

export default GameList;
