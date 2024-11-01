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
    if (
      !newUserInfo.username ||
      !newUserInfo.email ||
      !newUserInfo.password ||
      !newUserInfo.name
    ) {
      setNewUserSubmitErrorMessage("Please fill out all of the required inputs.");
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
        const user = response.data;
        handleNewUserModalVisible();
        console.log("New user creation successful", user);
      } else {
        console.error("Login failed", response.data.message);
      }
    } catch (error) {
      console.error("error creating new user:", error);
      setNewUserSubmitErrorMessage("Please fill out all of the required inputs.");
    }
  };

  return (
    <div className="new-user-modal" data-testid="new-user-form">
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
      <Button label="Register" onClick={handleNewUserSubmit} />
      <Button label="Sign In" onClick={handleLoginModalVisible} />
      <Button label="Cancel" onClick={handleNewUserModalVisible} />
      {newUserSubmitErrorMessage && (
        <p className="new-user-message" style={{ color: "red" }}>
          {newUserSubmitErrorMessage}
        </p>
      )}
    </div>
  );
}

export default NewUserForm;
