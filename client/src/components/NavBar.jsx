// Appears at the top of the screen to hold homepage button, search bar, and login button.
// It also renders MyShelf and Profile button after login

import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import logo from "../assets/logo.png";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({
  onSearch,
  handleLoginModalVisible,
  isLoggedIn,
  setIsLoggedIn,
  loginInfo,
  setLoginInfo,
  gameList,
}) {
    // Handles search input
  const [searchInput, setSearchInput] = useState("");

  // To navigate to different pages
  const navigate = useNavigate();

  // Navigates to Profile page for the Profile button
  const handleProfileClick = () => {
    navigate(isLoggedIn ? "/profile" : "/");
  };

  // Navigates to the Home page for the icon logo button
  const handleHomeClick = () => {
    navigate("/");
    gameList();
  };

  // Navigates to the MyShelf page for the MyShelf button
  const handleMyShelfClick = () => {
    navigate(isLoggedIn ? "/myshelf" : "/");
  };

  // Clears login info and sets isLoggedIn to false
  const clearLogin = () => {
    setLoginInfo({
      username: "",
      password: "",
    });
    setIsLoggedIn(false);
    handleHomeClick();
    console.log("User has been logged out", loginInfo);
  };

  // Sets user search input value to searchInput prop
  const handleSearch = (e) => {
    const value = e.target.value;
    console.log("this is the search input value", value);
    setSearchInput(value);
    onSearch(value);
  };

  // Sets logo and text to one side of the navbar
  const start = (
    <div className="logo-headers" onClick={handleHomeClick}>
      <img alt="GAMESHELF logo, a neon-outlined game controller" src={logo} height={"40"} className="logo"></img>
      <h1 className="logo-text" onClick={handleHomeClick}>GAMESHELF</h1>
    </div>
  );

  // Sets search bar and buttons to end of the navbar
  const end = (
    <div className="search">
      <InputText
        className="search-bar"
        aria-label="search-bar"
        placeholder="Search games"
        type="text"
        value={searchInput}
        onChange={handleSearch}
      />
      {isLoggedIn ? (
        <div className="loggedIn-buttons">
          <Button
            className="pi pi-user"
            aria-label="user"
            onClick={handleProfileClick}
          />
          <Button
            className="pi pi-book"
            aria-label="MyShelf"
            onClick={handleMyShelfClick}
          />
          <Button
            className="pi pi-sign-out"
            aria-label="sign-out"
            onClick={clearLogin}
          />
        </div>
      ) : (
        <Button
          className="pi pi-sign-in"
          aria-label="sign-in"
          id="login-button"
          onClick={handleLoginModalVisible}
        />
      )}
    </div>
  );
  return (
    <nav className="nav-bar" data-testid="navbar">
      <Menubar start={start} end={end}/>
    </nav>
  );
}

export default NavBar;
