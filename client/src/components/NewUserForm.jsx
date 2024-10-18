// Will eventually render the NewUserForm modal so users can create an account 

import { Button } from "primereact/button";
import axios from "axios";

function NewUserForm({ setLoginModalVisible, setNewUserModalVisible, newUserInfo, setNewUserInfo }) {

    const handleLoginModalVisible = () => {
        setLoginModalVisible(true);
        setNewUserModalVisible(false);
    };

    const handleNewUserModalVisible = () => {
        setNewUserModalVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserInfo((prevLogin) => ({...prevLogin, [name]: value}));
    };

    const handleNewUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/users`, {
                username: newUserInfo.username,
                email: newUserInfo.email,
                password: newUserInfo.password,
                name: newUserInfo.name,
                city: newUserInfo.city
            });
            
            if (response.status === 200) {
                const user = response.data;
                // setIsLoggedIn(true);
                handleNewUserModalVisible();
                console.log("New user creation successful", user);
            } else {
                console.error("Login failed", response.data.message);
            }
        } catch (error) {
            console.error("error creating new user:", error);
        }
    };

    return (
        <div className="new-user-modal">
            <p>Please enter in your information to register</p>
            <input 
                id="register-username"
                type="text"
                name="username"
                placeholder="username"
                maxLength={35}
                onChange={handleChange}
                value={newUserInfo.username}
            />
            <input 
                id="register-password"
                type="password"
                name="password"
                placeholder="password"
                maxLength={35}
                onChange={handleChange}
                value={newUserInfo.password}
            />
            <input 
                id="register-email"
                type="email"
                name="email"
                placeholder="email"
                maxLength={100}
                onChange={handleChange}
                value={newUserInfo.email}
            />
            <input 
                id="register-name"
                type="text"
                name="name"
                placeholder="name"
                maxLength={55}
                onChange={handleChange}
                value={newUserInfo.name}
            />
            <input 
                id="register-city"
                type="text"
                name="city"
                placeholder="city"
                maxLength={55}
                onChange={handleChange}
                value={newUserInfo.city}
            />
            <Button label="Register" onClick={handleNewUserSubmit}/>
            <Button label="Sign In" onClick={handleLoginModalVisible}/>
            <Button label="Cancel" onClick={handleNewUserModalVisible}/>
        </div>
    )
};

export default NewUserForm;