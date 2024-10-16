import { useEffect, useState } from "react";
import "./App.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { DeferredContent } from "primereact/deferredcontent";
import Game from "./components/Game";

function App() {
  const [gameData, setGameData] = useState(null);

  // on component mount fetch data
  const gameList = async () => {
    const url = `http://localhost:8080/`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("game data list", data);
    setGameData(data);
  };

  useEffect(() => {
    gameList();
  }, []);

  // const renderGame = (game) => {
  //   return (
  //     <div key={game.id} className='game'>
  //       <img src={game.background_image} alt={game.name} style={{ width: '200px'}} />
  //       <h3>{game.name}</h3>
  //       <p>Metacritic Rating: {game.metacritic}</p>
  //     </div>
  //   );
  // };

  // const onGameLoad = () => {
  //   console.log('Games list is loaded');
  // };

  // console.log(gameData, "State");
  // if (gameData && gameData.results) {
  //   console.log("First game:", gameData.results[0]);
  // }
  return (
    <PrimeReactProvider>
      {/* <div className='game-data'>
        {gameData && gameData.results ? (
          <>
          <h2>Games</h2>
            <DeferredContent onLoad={onGameLoad}>
              <div className="game-list">
                {gameData.results.map((game) => renderGame(game))}
              </div>
            </DeferredContent>
          </>
        ) : (
          <p>Loading games...</p>
        )}  
      </div> */}
      <Game gameData={gameData} />
    </PrimeReactProvider>
  );
}

export default App;
