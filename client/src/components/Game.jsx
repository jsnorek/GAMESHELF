// This component creates a template for each individual game rendering from API.
// It displays the game's image, title, and rating, with buttons for viewing details and marking as favorite.

import { Button } from "primereact/button";
import "primeicons/primeicons.css";

function Game({
  game,
  handleGameDetailsModalVisible,
  userFavoritesGame,
  loggedInUser,
  isFavorited,
  userUnfavoritesGame,
}) {
  // Toggles favorite game on and off
  const handleFavoriteClick = async () => {
    if (isFavorited) {
      await userUnfavoritesGame(game.id); // Call unfavorite function
    } else {
      await userFavoritesGame(game.id); // Call favorite function
    }
  };

  return (
    <div data-testid="game" className="individual-game">
      <div key={game.id} className="game">
        <img
          className="game-image"
          src={game.background_image}
          alt={game.name}
          style={{ width: "200px" }}
        />
        <h3 className="game-title">{game.name}</h3>
        <p>Metacritic Rating: {game.metacritic}</p>
      </div>
      <Button
        className="details-button"
        label="details"
        onClick={() => handleGameDetailsModalVisible(game.id)} // Sends clicked game_id back to function
      />
      {loggedInUser && (
        <Button
          className="favorites-button"
          icon="pi pi-heart"
          rounded
          text
          aria-label="Favorite"
          onClick={handleFavoriteClick}
          style={{
            backgroundColor: isFavorited ? "#f744c4" : "lightgray", // Pink if favorited, gray if not
            color: isFavorited ? "white" : "black",
          }}
        />
      )}
    </div>
  );
}

export default Game;
