
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
import GameDetailsModal from './components/GameDetailsModal';
import axios from 'axios';
// import dotenv from 'dotenv';

function App() {
  const [gameData, setGameData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newUserModalVisible,setNewUserModalVisible,] = useState(false);
  const [gameDetailsModalVisible, setGameDetailsModalVisible] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [gameDetails, setGameDetails] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const [fullLoggedInUserData, setFullLoggedInUserData] = useState();
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

//   const gameList = async () => {
//     // Determine the base URL
//     const baseUrl = process.env.NODE_ENV === "development"
//         ? "http://localhost:8080"
//         : "https://server-g79j.onrender.com";
    
//     // Fetch the data from the backend
//     const url = `${baseUrl}/api`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log("game data list", data);
//     setGameData(data);
// };

  // on component mount fetch game data from API
  const gameList = async () => {
    const url = `http://localhost:8080/api`;
    // const url = `https://server-g79j.onrender.com/api`;
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
  };

  useEffect(() => {
    if (searchResults === '') {
      setSearchResults(null);
      console.log('Search input was reset', searchResults);
    }
  }, [searchResults]);

  // This is code I want to keep in case I need to use later - it searches only games that are currently
  // Rendered on the screen. I may need it to search through favorites game list
  //   const filteredGames = gameData.results.filter((game) =>
  //   game.name.toLowerCase().includes(searchInput.toLowerCase())
  // );
  // setSearchResults(filteredGames);
  
// To check what the game data looks like when rendered
console.log(gameData, "State");
if (gameData && gameData.results) {
  console.log("First game:", gameData.results[0]);
}

// Function to make the login modal visible 
const handleLoginModalVisible = () => {
  setLoginModalVisible(true);
  console.log('login modal is visible', loginModalVisible);
};

const handleNewUserModalVisible = () => {
  setNewUserModalVisible(true);
  setLoginModalVisible(false);
  console.log('New user modal is visible', newUserModalVisible);
};

const handleGameDetailsModalVisible = (gameId) => {
  setSelectedGameId(gameId);
  setGameDetailsModalVisible(true);
  console.log('Game details modal is visible', gameDetailsModalVisible);
  console.log('game details id:', selectedGameId)
};

// Fetch game details based on game_id
useEffect(() => {
  const fetchGameDetails = async () => {
    if(selectedGameId) {
      console.log('Fetching details for game id:', selectedGameId);
      try {
        const response = await axios.get(`http://localhost:8080/game/${selectedGameId}`);
        console.log('Game details fetched for:', response.data);
        setGameDetails(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    }
  };
  fetchGameDetails();
}, [selectedGameId]);

console.log('game details from the app', gameDetails);

useEffect(() => {
  const fetchGameReviews = async () => {
    if(selectedGameId) {
      console.log('Fetching game reviews for game id;', selectedGameId);
      try {
        const response = await axios.get(`http://localhost:8080/game-reviews/${selectedGameId}`);
        console.log('Game reviews fetched for:', response.data);
        setGameReviews(response.data || '');
      } catch (error) {
        console.error('Error fetching game reviews:', error);
      }
    }
  };
  fetchGameReviews();
}, [selectedGameId]);

console.log('game reviews from the app', gameReviews);

useEffect(() => {
  console.log('TESTER game reviews from the app:', gameReviews);
}, [gameReviews]);

useEffect(() => {
  const fetchAllUserData = async () => {
    // if(isLoggedIn && loggedInUser.user_id) {
      if(isLoggedIn, loggedInUser) {
      console.log('Fetching all logged in user data', loggedInUser.user_id);
      try {
        const response = await axios.get(`http://localhost:8080/user-info/${loggedInUser.user_id}`);
        console.log('User data fetched for:', response.data);
        setFullLoggedInUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  fetchAllUserData();
// }, [isLoggedIn, loggedInUser.user_id]);
}, [isLoggedIn, loggedInUser]);

console.log('THIS is the logged in user info', loggedInUser);
console.log('This is the FULL logged in user data', fullLoggedInUserData);

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
          <GameList gameData={searchResults} handleGameDetailsModalVisible={handleGameDetailsModalVisible}/>
        ) : (
          <GameList gameData={gameData?.results || []} handleGameDetailsModalVisible={handleGameDetailsModalVisible} />
        )}
          />
          <Route
            path='/profile'
            element={<Profile 
              fullLoggedInUserData={fullLoggedInUserData} 
              setFullLoggedInUserData={setFullLoggedInUserData}
              loggedInUser={loggedInUser}
            />}
          />
          <Route 
            path='/myshelf'
            element={<MyShelf />}
          />
        </Routes>
        {gameDetailsModalVisible &&
          <GameDetailsModal 
            setGameDetailsModalVisible={setGameDetailsModalVisible} 
            gameDetails={gameDetails}
            gameReviews={gameReviews}
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
          />}
        {loginModalVisible &&
        <LoginModal 
          setLoginModalVisible={setLoginModalVisible} 
          loginInfo={loginInfo} 
          setLoginInfo={setLoginInfo} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          handleNewUserModalVisible={handleNewUserModalVisible}
          setLoggedInUser={setLoggedInUser}
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
