// Appears at the top of the screen to hold homepage button, search bar, and login button.
// It also renders MyShelf and Profile button after login
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import logo from '../assets/logo.png';
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";

function NavBar({ onSearch, handleLoginModalVisible, isLoggedIn, setIsLoggedIn, loginInfo, setLoginInfo }) {
    const [searchInput, setSearchInput] = useState('');

    const menuRight = useRef(null);
    
    // To navigate to different pages
    const navigate = useNavigate();

    // Navigates to Profile page for the Profile button
    const handleProfileClick = () => {
        navigate('/profile');
    };

    // Navigates to the Home page for the icon logo button
    const handleHomeClick = () => {
        navigate('/');
    };

    // Navigates to the MyShelf page for the MyShelf button
    const handleMyShelfClick = () => {
        navigate('/myshelf');
    }

    // Clears login info and sets isLoggedIn to false
     const clearLogin = () => {
        setLoginInfo({
            username: "",
            password: ""
        });
        setIsLoggedIn(false)
        handleHomeClick();
        console.log('User has been logged out', loginInfo);
    };
    
    // Sets user search input value to searchInput prop
    const handleSearch = (e) => {
        const value = e.target.value;
        console.log('this is the search input value', value);
        setSearchInput(value);
        onSearch(value);
    }

    // Sets logo and text to one side of the navbar
    const start = (
        <div className="logo-headers" onClick={handleHomeClick}>
            <img alt="logo" src={logo} height={"40"} className="logo"></img>
            <p className="logo-text">GAMESHELF</p>
        </div>
    );

    // const items = [
    //     { label: 'Profile', icon: 'pi pi-user', command: handleProfileClick },
    //     { label: 'MyShelf', icon: 'pi pi-book', command: handleMyShelfClick },
    //     { label: 'Log Out', icon: 'pi pi-sign-out', command: clearLogin }
    // ];
    

    // Sets search bar and buttons to end of the navbar
    const end = (
        <div className="search">
            <InputText
                className="search-bar" 
                placeholder="Search games" 
                type="text" 
                value={searchInput}
                onChange={handleSearch}
            />
            {isLoggedIn ? 
            <div className="loggedIn-buttons">
                <Button label="Profile" onClick={handleProfileClick}/> 
                <Button label="MyShelf" onClick={handleMyShelfClick}/>
                <Button label="Log Out" onClick={clearLogin}/>
                {/* <Button icon="pi pi-align-right" className="mr-2" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup /> */}
            </div> : 
            <Button label="login" className="login-button" onClick={handleLoginModalVisible}/>}
        </div>
    );
    return(
        <div className="nav-bar" data-testid="navbar">
            <Menubar start={start} end={end} />
            {/* <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" /> */}

        </div>
    )
};

export default NavBar;