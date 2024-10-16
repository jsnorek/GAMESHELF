import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import logo from '../assets/logo.png';
import { Button } from "primereact/button";

function NavBar() {

    const start = <img alt="logo" src={logo} height={"40"} className="logo"></img>;
    const end = (
        <div className="test">
            <InputText placeholder="Search" type="text" />
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