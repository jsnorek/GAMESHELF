// This component renders a login modal where users can enter their username and password to log in.
// It also provides a button to switch to a registration form for new users.
// On successful login, it updates the parent component's state and closes the modal.

import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import axios from "axios";

function LoginModal({
  setLoginModalVisible,
  loginInfo,
  setLoginInfo,
  isLoggedIn,
  setIsLoggedIn,
  handleNewUserModalVisible,
  setLoggedInUser,
  baseURL,
}) {
    // Handles message display when logging in
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // Timer for error message
  useEffect(() => {
    setTimeout(() => {
      setLoginErrorMessage("");
    }, 5000);
  }, [loginErrorMessage]);

  // Clears login inputs
  const clearForm = () => {
    setLoginInfo({
      username: "",
      password: "",
    });
    setLoginErrorMessage("");
  };

  // Close the login modal by setting its visibility to false.
  const turnLoginModalOff = () => {
    setLoginModalVisible(false);
    clearForm();
  };

  // Handles input changes for username and password input for login
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLogin) => ({ ...prevLogin, [name]: value }));
  };

  // Handles submit button for login modal. On click, it compares user input to database and upon
  // Confirming the match, the rest of user information will be pulled from database
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginInfo.username || !loginInfo.password) {
      setLoginErrorMessage("Username or password is incorrect");
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/login/`, {
        username: loginInfo.username,
        password: loginInfo.password,
      });

      if (response.status === 200) {
        const user = response.data;
        setIsLoggedIn(true);
        setLoggedInUser(user);
        setLoginModalVisible(false);
        console.log("Login successful", user);
      } else {
        setLoginErrorMessage("username or password is incorrect");
        console.error("Login failed", response.data.message);
      }
    } catch (error) {
      setLoginErrorMessage("Username or password is incorrect");
      clearForm();
      console.error("error logging in:", error);
    }
  };

  // To test/print a console log if user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is now logged in", isLoggedIn);
    }
  }, [isLoggedIn]);

  return (
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
      <Button
        data-testid="login-button"
        label="Login"
        onClick={handleLoginSubmit}
      />
      <Button label="Cancel" onClick={turnLoginModalOff} />
      <p>New user?</p>
      <Button label="Register" onClick={handleNewUserModalVisible} />
      {loginErrorMessage && (
        <p className="error-message" style={{ color: "red" }}>
          {loginErrorMessage}
        </p>
      )}
    </div>
  );
}
export default LoginModal;
