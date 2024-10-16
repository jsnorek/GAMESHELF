import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import logo from '../assets/logo.png';
import { Button } from "primereact/button";
import { useState } from "react";

function NavBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');
    
    const handleSearch = (e) => {
        const value = e.target.value;
        console.log('this is the search input value', value);
        setSearchInput(value);
        onSearch(value);
    }

    const start = <img alt="logo" src={logo} height={"40"} className="logo"></img>;
    const end = (
        <div className="test">
            <InputText 
                placeholder="Search games" 
                type="text" 
                value={searchInput}
                onChange={handleSearch}
            />
            <Button label="login"/>
        </div>
    )
    return(
        <div>
            <Menubar start={start} end={end} />
            <p>Navbar</p>
        </div>
    )
};

export default NavBar;