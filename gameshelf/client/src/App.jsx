
import { useEffect, useState } from 'react'
import './App.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { DeferredContent } from 'primereact/deferredcontent';
import Game from './components/Game';        
import GameList from './components/GameList';

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

  return (
    <PrimeReactProvider>
      <GameList gameData={gameData}/>
    </PrimeReactProvider>
  );
}

export default App;
