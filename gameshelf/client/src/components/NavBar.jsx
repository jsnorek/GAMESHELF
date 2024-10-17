import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import logo from '../assets/logo.png';
import { Button } from "primereact/button";
import { useState } from "react";

function NavBar({ onSearch, handleLoginModalVisible, isLoggedIn, setIsLoggedIn, loginInfo, setLoginInfo }) {
    const [searchInput, setSearchInput] = useState('');

     const clearLogin = () => {
        setLoginInfo({
            username: "",
            password: ""
        });
        setIsLoggedIn(false)
        console.log('User has been logged out', loginInfo);
    };
    
    const handleSearch = (e) => {
        const value = e.target.value;
        console.log('this is the search input value', value);
        setSearchInput(value);
        onSearch(value);
    }

    const start = (
        <div className="logo-headers">
            <img alt="logo" src={logo} height={"40"} className="logo"></img>
            <p className="logo-text">GAMESHELF</p>
        </div>
    );
    const end = (
        <div className="search">
            <InputText 
                placeholder="Search games" 
                type="text" 
                value={searchInput}
                onChange={handleSearch}
            />
            {isLoggedIn ? 
            <div className="loggedIn-buttons">
                <Button label="Profile"/>
                <Button label="MyShelf"/>
                <Button label="Log Out" onClick={clearLogin}/>
            </div> : 
            <Button label="login" onClick={handleLoginModalVisible}/>}
        </div>
    );
    return(
        <div className="nav-bar">
            <Menubar start={start} end={end} />
        </div>
    )
};

export default NavBar;