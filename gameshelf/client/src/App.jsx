import { useEffect, useState } from "react";
import "./App.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { DeferredContent } from "primereact/deferredcontent";

function App() {
  const [gameData, setGameData] = useState(null);
  // on component mount fetch data

  // https://api.example.com/users?metacritic=80,100

  const gameList = async () => {
    const url = `https://api.rawg.io/api/games?key=API_KEY&metacritic=80,100`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("game data list", data);
    setGameData(data);
  };

  useEffect(() => {
    gameList();
  }, []);

  console.log(gameData, "State");
  if (gameData && gameData.results) {
    console.log("First game:", gameData.results[0]);
  }

  const renderGame = (game) => {
    return (
      <div key={game.id} className="game">
        <img
          src={game.background_image}
          alt={game.name}
          style={{ width: "200px" }}
        />
        <h3>{game.name}</h3>
        <p>Metacritic Rating: {game.metacritic}</p>
      </div>
    );
  };

  const onGameLoad = () => {
    console.log("Games list is loaded");
  };

  return (
    <PrimeReactProvider>
      <div className="game-data">
        {gameData && gameData.results ? (
          <>
            <h2>Games</h2>
            {/* <p>{gameData.results[0].name}</p> */}
            <DeferredContent onLoad={onGameLoad}>
              <div className="game-list">
                {gameData.results.map((game) => renderGame(game))}
              </div>
            </DeferredContent>
          </>
        ) : (
          <p>Loading games...</p>
        )}
      </div>
    </PrimeReactProvider>
  );
}

export default App;
