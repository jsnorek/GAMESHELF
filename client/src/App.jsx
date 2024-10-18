
import { useEffect, useState } from 'react'
import './App.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { DeferredContent } from 'primereact/deferredcontent';
import NavBar from './components/NavBar';     
import GameList from './components/GameList';
import LoginModal from './components/LoginModal';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyShelf from './components/MyShelf';
import NewUserForm from './components/NewUserForm';

function App() {
  const [gameData, setGameData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ newUserModalVisible,setNewUserModalVisible, ] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
});
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    city: ""
  });

  // on component mount fetch game data from API
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

  // Fetches searched game data from API based on user input in the search bar
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
  // This is code I want to keep in case I need to use later - it searches only games that are currently
  // Rendered on the screen. I may need it to search through favorites game list
  //   const filteredGames = gameData.results.filter((game) =>
  //   game.name.toLowerCase().includes(searchInput.toLowerCase())
  // );
  // setSearchResults(filteredGames);
  };
  
// To check what the game data looks like when rendered
console.log(gameData, "State");
if (gameData && gameData.results) {
  console.log("First game:", gameData.results[0]);
}

// Function to make the login modal visible 
const handleLoginModalVisible = () => {
  setLoginModalVisible(true);
  console.log('login modal is visible', loginModalVisible);
}

const handleNewUserModalVisible = () => {
  setNewUserModalVisible(true);
  setLoginModalVisible(false);
  console.log('New user modal is visible', newUserModalVisible);
}

  return (
    <PrimeReactProvider>
      <Router>
        <NavBar 
          onSearch={handleSearch} 
          handleLoginModalVisible={handleLoginModalVisible} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          loginInfo={loginInfo} 
          setLoginInfo={setLoginInfo}
        />
        <Routes>
          <Route
            path='/'
            element={searchResults ? (
          <GameList gameData={searchResults} />
        ) : (
          <GameList gameData={gameData?.results || []} />
        )}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route 
            path='/myshelf'
            element={<MyShelf />}
          />
        </Routes>
        {loginModalVisible &&
        <LoginModal 
          setLoginModalVisible={setLoginModalVisible} 
          loginInfo={loginInfo} 
          setLoginInfo={setLoginInfo} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          handleNewUserModalVisible={handleNewUserModalVisible}
        />}
        {newUserModalVisible &&
            <NewUserForm 
              setLoginModalVisible={setLoginModalVisible} 
              setNewUserModalVisible={setNewUserModalVisible} 
              newUserInfo={newUserInfo} 
              setNewUserInfo={setNewUserInfo}
            />}
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
