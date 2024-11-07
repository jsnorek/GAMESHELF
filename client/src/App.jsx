import { useEffect, useState } from "react";
import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import NavBar from "./components/NavBar";
import GameList from "./components/GameList";
import LoginModal from "./components/LoginModal";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyShelf from "./components/MyShelf";
import NewUserForm from "./components/NewUserForm";
import GameDetailsModal from "./components/GameDetailsModal";
import axios from "axios";

function App() {
  // State for managing game data and search results
  const [gameData, setGameData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isGameDataLoading, setIsGameDataLoading] = useState(false);
  // State for managing game data and search results
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newUserModalVisible, setNewUserModalVisible] = useState(false);
  const [gameDetailsModalVisible, setGameDetailsModalVisible] = useState(false);
  // State for selected game and its details
  const [selectedGameId, setSelectedGameId] = useState("");
  const [gameDetails, setGameDetails] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  // State for managing logged-in user information
  const [loggedInUser, setLoggedInUser] = useState();
  const [fullLoggedInUserData, setFullLoggedInUserData] = useState();
  const [newReviewSubmitted, setNewReviewSubmitted] = useState(false);
 // State for managing favorited games
  const [favoritedGames, setFavoritedGames] = useState([]);
  // State to capture reviewed game titles from API 
  const [reviewsWithGameTitles, setReviewsWithGameTitles] = useState([]);
  // State for handling login and new user forms
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  // State for handling new user registration information
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    city: "",
  });

  // For setting up production environment
  const baseURL = import.meta.env.VITE_API_URL;

  // On component mount to fetch initial game data from API
  const gameList = async () => {
    setIsGameDataLoading(true);
    const url = `${baseURL}/api`;
    const res = await fetch(url);
    const data = await res.json();
    setGameData(data);
    setIsGameDataLoading(false);
    setSearchResults(null);
  };

  // Fetches searched game data from API based on user input in the search bar
  const handleSearch = async (searchInput) => {
    if (!searchInput) {
      setSearchResults(null); // Resets search results if search bar is empty
      // console.log("search input was reset", searchResults);
      gameList();
      return;
    }
    try {
      const res = await fetch(`${baseURL}/search?query=${searchInput}`);
      const data = await res.json();
      // console.log("this is the search data", data);
      data.results === undefined || null
        ? alert("no games found")
        : setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching games on client", error);
    }
  };

  // Resets gameList back to initial rendering if search bar is cleared
  useEffect(() => {
    if (searchResults === null) {
      // setSearchResults(null);
      gameList();
      // console.log("Search input was reset", searchResults);
    }
  }, [searchResults]);

  // This is code I want to keep in case I need to use later - it searches only games that are currently
  // Rendered on the screen. I may need it to search through favorites game list
  //   const filteredGames = gameData.results.filter((game) =>
  //   game.name.toLowerCase().includes(searchInput.toLowerCase())
  // );
  // setSearchResults(filteredGames);

  // To check what the game data looks like when rendered
  // if (gameData && gameData.results) {
    // console.log("First game:", gameData.results[0]);
  // }

  // Function to make the login modal visible
  const handleLoginModalVisible = () => {
    setLoginModalVisible(true);
    console.log("login modal is visible", loginModalVisible);
  };

  // Function to toggle on newUserModalVisible to make it visible while also turning off loginModalVisible
  const handleNewUserModalVisible = () => {
    setNewUserModalVisible(true);
    setLoginModalVisible(false);
    // console.log("New user modal is visible", newUserModalVisible);
  };

  // Function to handle game details modal visibility based on selected game id
  const handleGameDetailsModalVisible = (gameId) => {
    setSelectedGameId(gameId);
    setGameDetailsModalVisible(true);
  };

  // Fetch game details based on game_id
  useEffect(() => {
    const fetchGameDetails = async () => {
      if (selectedGameId) {
        console.log("Fetching details for game id:", selectedGameId);
        try {
          const response = await axios.get(`${baseURL}/game/${selectedGameId}`);
          setGameDetails(response.data);
        } catch (error) {
          console.error("Error fetching game details:", error);
        }
      }
    };
    fetchGameDetails();
  }, [selectedGameId, newReviewSubmitted]);

  // Fetch game reviews based on selected game id
  useEffect(() => {
    const fetchGameReviews = async () => {
      if (selectedGameId) {
        try {
          const response = await axios.get(
            `${baseURL}/game-reviews/${selectedGameId}`
          );
          setGameReviews(response.data || "");
          setNewReviewSubmitted(false);
          console.log("these are the database game reviews", response.data);
        } catch (error) {
          console.error("Error fetching game reviews:", error);
        }
      }
    };
    fetchGameReviews();
  }, [selectedGameId, newReviewSubmitted]);

  // Extract fetchAllUserData into its own function
const fetchAllUserData = async () => {
  if (isLoggedIn && loggedInUser) {
    try {
      const response = await axios.get(
        `${baseURL}/user-info/${loggedInUser.user_id}`
      );
      setFullLoggedInUserData(response.data);
      await getFavoritedGames(loggedInUser.user_id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};

// Call fetchAllUserData initially in useEffect to load data when necessary
useEffect(() => {
  if (isLoggedIn && loggedInUser && favoritedGames.length === 0) {
    fetchAllUserData();
  }
}, [isLoggedIn, loggedInUser]);

   // Delete a user's review
   const deleteUserReview = async (reviewId) => {
    try {
        if (!loggedInUser?.user_id || !reviewId) {
            console.log("Missing user_id or review_id", loggedInUser.user_id, reviewId);
            return;
        }

        const response = await axios.delete(`${baseURL}/reviews/${loggedInUser.user_id}/${reviewId}`
        );
        if (response.status === 200) {
          // Update reviewsWithGameTitles by filtering out the deleted review
            setReviewsWithGameTitles((prevReviews) =>
            prevReviews.filter((review) => review.review_id !== reviewId)
        );
        console.log("Review deleted successfully");
         // Fetch the updated user data
      await fetchAllUserData();
        }
    } catch (error) {
        console.error("Error deleting review", error);
    }
  };

  // Post user's newly favorited game
  const userFavoritesGame = async (game_id) => {
    try {
      const response = await axios.post(`${baseURL}/favorites`, {
        user_id: loggedInUser.user_id,
        game_id: game_id,
      });
      if (response.status === 200) {
        await getFavoritedGames(loggedInUser.user_id);
        console.log("New favorited game successful", response.data);
      } else {
        console.error("Favorited game fail", response.data.message);
      }
    } catch (error) {
      console.error("error adding new favorite game:", error);
    }
  };

  // Delete a user's favorited game from the database
  const userUnfavoritesGame = async (game_id) => {
    try {
      const response = await axios.delete(
        `${baseURL}/favorites/${loggedInUser.user_id}/${game_id}`
      );
      if (response.status === 200) {
        await getFavoritedGames(loggedInUser.user_id);
        console.log("New unfavorited game successful", response.data);
      } else {
        console.error("Unfavoriting game fail", response.data.message);
      }
    } catch (error) {
      console.error("Error unfavoriting game", error);
    }
  };

  // Fetches game data for individual game id from the API
  const fetchGameData = async (gameId) => {
    const response = await axios.get(`${baseURL}/game/${gameId}`);
    return response.data;
  };

  // Fetches a specific user's list of favorited games from the database
  const getFavoritedGames = async (userId) => {
    try {
      const response = await axios.get(`${baseURL}/favorites/${userId}`);
      const user = response.data;
      const favoriteIds = response.data.map((fav) => fav.game_id);
      const favorites = await Promise.all(
        favoriteIds.map(async (id) => await fetchGameData(id))
      );
      setFavoritedGames(favorites);
    } catch (error) {
      console.error("Error fetching favorited games:", error);
    }
  };

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
          gameList={gameList}
        />
        <Routes>
          <Route
            path="/"
            element={
              <GameList
                gameData={searchResults || gameData?.results || []}
                isLoading={isGameDataLoading}
                handleGameDetailsModalVisible={handleGameDetailsModalVisible}
                loggedInUser={loggedInUser}
                favoritedGames={favoritedGames}
                userFavoritesGame={userFavoritesGame}
                userUnfavoritesGame={userUnfavoritesGame}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                fullLoggedInUserData={fullLoggedInUserData}
                setFullLoggedInUserData={setFullLoggedInUserData}
                loggedInUser={loggedInUser}
                baseURL={baseURL}
                deleteUserReview={deleteUserReview}
                reviewsWithGameTitles={reviewsWithGameTitles}
                setReviewsWithGameTitles={setReviewsWithGameTitles}
              />
            }
          />
          <Route
            path="/myshelf"
            element={
              <MyShelf
                handleGameDetailsModalVisible={handleGameDetailsModalVisible}
                loggedInUser={loggedInUser}
                favoritedGames={favoritedGames}
                userUnfavoritesGame={userUnfavoritesGame}
              />
            }
          />
        </Routes>
        {gameDetailsModalVisible && (
          <GameDetailsModal
            setGameDetailsModalVisible={setGameDetailsModalVisible}
            gameDetails={gameDetails}
            gameReviews={gameReviews}
            isLoggedIn={isLoggedIn}
            loggedInUser={loggedInUser}
            setNewReviewSubmitted={setNewReviewSubmitted}
            baseURL={baseURL}
            fetchAllUserData={fetchAllUserData}
          />
        )}
        {loginModalVisible && (
          <LoginModal
            setLoginModalVisible={setLoginModalVisible}
            loginInfo={loginInfo}
            setLoginInfo={setLoginInfo}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            handleNewUserModalVisible={handleNewUserModalVisible}
            setLoggedInUser={setLoggedInUser}
            baseURL={baseURL}
          />
        )}
        {newUserModalVisible && (
          <NewUserForm
            setLoginModalVisible={setLoginModalVisible}
            setNewUserModalVisible={setNewUserModalVisible}
            newUserInfo={newUserInfo}
            setNewUserInfo={setNewUserInfo}
            baseURL={baseURL}
            setIsLoggedIn={setIsLoggedIn}
            setLoggedInUser={setLoggedInUser}
          />
        )}
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
