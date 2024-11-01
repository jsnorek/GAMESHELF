// NewUserForm component renders a form that allows a new user to create an account.
// It includes inputs for username, email, password, name, and city,
// and sends the data to the server to create a new user in the database.
// It also includes buttons to cancel registration or switch to the login modal.

import { Button } from "primereact/button";
import axios from "axios";
import { useEffect, useState } from "react";

function NewUserForm({
  setLoginModalVisible,
  setNewUserModalVisible,
  newUserInfo,
  setNewUserInfo,
  baseURL,
  setLoginInfo,
  setIsLoggedIn,
  setLoggedInUser
}) {
    // Handles user registration message
  const [newUserSubmitErrorMessage, setNewUserSubmitErrorMessage] = useState("");

  // Timer for error message
  useEffect(() => {
    setTimeout(() => {
      setNewUserSubmitErrorMessage("");
    }, 5000);
  }, [newUserSubmitErrorMessage]);

  // Clears login inputs
  const clearForm = () => {
    setNewUserInfo({
      username: "",
      password: "",
      email: "",
      name: "",
      city: "",
    });
    setNewUserSubmitErrorMessage("");
  };

  // Switches the view to the login modal when the 'Sign In' button is clicked
  const handleLoginModalVisible = () => {
    setLoginModalVisible(true);
    setNewUserModalVisible(false);
  };

  // Closes the new user modal when the 'Cancel' button is clicked
  const handleNewUserModalVisible = () => {
    setNewUserModalVisible(false);
    clearForm();
  };

  // Handles input change events and updates the newUserInfo state with the current input field value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prevLogin) => ({ ...prevLogin, [name]: value }));
  };

  // Submits the new user data to the server to create an account
  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    // Username and password validation regex
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegex.test(newUserInfo.username)) {
      setNewUserSubmitErrorMessage("Username must be 3-20 alphanumeric characters.");
      return;
    }

    if (!passwordRegex.test(newUserInfo.password)) {
      setNewUserSubmitErrorMessage(
        "Password must be at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    if (!newUserInfo.email || !newUserInfo.name) {
      setNewUserSubmitErrorMessage("Please fill out all required fields.");
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/users`, {
        username: newUserInfo.username,
        email: newUserInfo.email,
        password: newUserInfo.password,
        name: newUserInfo.name,
        city: newUserInfo.city,
      });
      if (response.status === 200) {
        // Auto-login after successful registration
        const loginResponse = await axios.post(`${baseURL}/login/`, {
          username: newUserInfo.username,
          password: newUserInfo.password,
        });

        if (loginResponse.status === 200) {
          const user = loginResponse.data;
          setIsLoggedIn(true);
          setLoggedInUser(user);
          console.log("New user creation successful and logged in");
          alert(`New user creation successful, welcome ${newUserInfo.name}`);
        } else {
          console.error("Auto-login failed", loginResponse.data.message);
        }

        handleNewUserModalVisible();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Set the error message from the server response
        setNewUserSubmitErrorMessage(error.response.data.message);
      } else {
        setNewUserSubmitErrorMessage("Error creating account. Please try again.");
      }
      console.error("Error creating new user:", error);
    }
  };

  return (
    <div className="new-user-modal" data-testid="new-user-form">
      <h2>Please Enter Your Information To Register</h2>
      <div className="new-user-modal-inputs">
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
      </div>
      <div className="new-user-modal-buttons">
      <Button className="register-button" label="Register" onClick={handleNewUserSubmit} />
      <Button label="Cancel" onClick={handleNewUserModalVisible} />
      <Button label="Login" className="new-user-sign-in-button" onClick={handleLoginModalVisible} />
      </div>
      {newUserSubmitErrorMessage && (
        <p className="error-message" style={{ color: "red" }}>
          {newUserSubmitErrorMessage}
        </p>
      )}
    </div>
  );
}

export default NewUserForm;
