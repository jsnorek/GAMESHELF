import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import axios from "axios";

function LoginModal({ setLoginModalVisible, loginInfo, setLoginInfo, isLoggedIn, setIsLoggedIn }) {

    // const [loginInfo, setLoginInfo] = useState({
    //     username: "",
    //     password: ""
    // });

    // const clearLogin = () => {
    //     setLoginInfo({
    //         username: "",
    //         password: ""
    //     });
    // };

    const turnLoginModalOff = () => {
        setLoginModalVisible(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevLogin) => ({...prevLogin, [name]: value}));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/login/`, {
                username: loginInfo.username,
                password: loginInfo.password
            });
            
            if (response.status === 200) {
                const user = response.data;
                setIsLoggedIn(true);
                setLoginModalVisible(false);
                console.log("Login successful", user);
            } else {
                console.error("Login failed", response.data.message);
            }
        } catch (error) {
            console.error("error logging in:", error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            console.log("User is now logged in", isLoggedIn);
        }
    }, [isLoggedIn]);


    return(
        <div className="login-modal">
            <p>Login</p>
            <input 
                id="login-username"
                type="text"
                name="username"
                placeholder="username"
                maxLength={35}
                onChange={handleChange}
                value={loginInfo.username}
            />
            <input
                id="login-password"
                type="password"
                name="password"
                placeholder="password"
                maxLength={35}
                onChange={handleChange}
                value={loginInfo.password}
            />
            <Button label="Login" onClick={handleLoginSubmit}/>
            <Button label="Cancel" onClick={turnLoginModalOff}/>
            <p>New user?</p>
            <Button label="Sign Up"/>
        </div>
    )
}
export default LoginModal;