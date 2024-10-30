// MyShelf component is responsible for rendering the user's "My Shelf" page,
// which displays a list of the user's favorite games with their details (e.g., name, Metacritic rating, and image).
// It uses the `fullLoggedInUserData` prop to retrieve the user's favorite games and fetches game details for each game from the server.

import Game from "./Game";

function MyShelf({
  fullLoggedInUserData,
  baseURL,
  handleGameDetailsModalVisible,
  loggedInUser,
  favoritedGames,
  userUnfavoritesGame,
  newFavoriteAdded,
}) {
  return (
    <div data-testid="myshelf">
      <h2>Welcome to Your MyShelf Page</h2>
      {favoritedGames.length > 0 ? (
        <div className="user-favorites-list">
          {favoritedGames.map((favorite) => (
            <Game
              key={favorite.id}
              game={favorite}
              handleGameDetailsModalVisible={handleGameDetailsModalVisible}
              loggedInUser={loggedInUser}
              isFavorited={true}
              userUnfavoritesGame={userUnfavoritesGame}
            />
          ))}
        </div>
      ) : (
        <div className="user-favorites-list">
          <p>No favorites available</p>
        </div>
      )}
    </div>
  );
}
export default MyShelf;
