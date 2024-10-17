
import { useEffect, useState } from 'react'
import './App.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { DeferredContent } from 'primereact/deferredcontent';
import NavBar from './components/NavBar';     
import GameList from './components/GameList';
import NewUserForm from './components/NewUserForm';
import LoginModal from './components/LoginModal';

function App() {
  const [gameData, setGameData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
});

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

  const handleSearch = async (searchInput) => {
    if (!searchInput) {
      setSearchResults(null); // Resets search results if search bar is empty
      console.log('search input was reset', searchResults);
      gameList();
      return;
    }
    try { 
      const res = await fetch(`http://localhost:8080/search?query=${searchInput}`);
      const data = await res.json();
      console.log('this is the search data', data);
      data.results === undefined || null ? alert('no games found') : setSearchResults(data.results);
    } catch (error)  {
      console.error('Error searching games on client', error);
    }
  //   const filteredGames = gameData.results.filter((game) =>
  //   game.name.toLowerCase().includes(searchInput.toLowerCase())
  // );
  // setSearchResults(filteredGames);
  };
  
console.log(gameData, "State");
if (gameData && gameData.results) {
  console.log("First game:", gameData.results[0]);
}

const handleLoginModalVisible = () => {
  setLoginModalVisible(true);
  console.log('login modal is visible', loginModalVisible);
}

  return (
    <PrimeReactProvider>
      <NavBar onSearch={handleSearch} handleLoginModalVisible={handleLoginModalVisible} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>
      {searchResults ? (
        <GameList gameData={searchResults} />
      ) : (
        <GameList gameData={gameData?.results || []} />
      )}
      {/* <GameList gameData={gameData}/> */}
      <NewUserForm />
      {loginModalVisible &&
      <LoginModal setLoginModalVisible={setLoginModalVisible} loginInfo={loginInfo} setLoginInfo={setLoginInfo} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
    </PrimeReactProvider>
  );
}

export default App;
