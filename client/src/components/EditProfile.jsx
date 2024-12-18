// Allows user to edit their profile information after login. Results are sent to the database.

import { Button } from "primereact/button";
import { useState } from "react";

function EditProfile({
  fullLoggedInUserData,
  setEditProfileVisible,
  updateUserProfile,
  loggedInUser,
  closeEditProfile,
}) {
  // Checks if fullLoggedInUserData exists and has data. If so, extradct the first user data object.
  const userData =
    fullLoggedInUserData && fullLoggedInUserData.length > 0
      ? fullLoggedInUserData[0]
      : null;

  // Initialize the local state updatedUserData to store the user's profile information (name, username, email, and city).
  // If userData is available, populate the state with its values. This state is what the user will be able to edit.
  const [updatedUserData, setUpdatedUserData] = useState({
    name: userData?.name,
    username: userData?.username,
    email: userData?.email,
    city: userData?.city,
  });

  // To handle input changes in the form.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Spread the previous state and update only the changed field.
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // To handle form submit on submit button click.
  // It prevents the default form behavior (page refresh) and calls the updatedUserProfile function.
  // This function sends the updatedUserData to the server to update the user's profile in the database.
  // After submitting, it hides the edit profile form by setting setEditProfileVisible to false.
  const handleSubmit = (e) => {
    e.preventDefault();
    //passes user's id and the updatedUserData.
    updateUserProfile(loggedInUser.user_id, updatedUserData);
    setEditProfileVisible(false);
  };

  return (
    <div>
      <p>Edit Profile</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            data-testid="name-input"
            type="text"
            name="name"
            value={updatedUserData.name}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            data-testid="username-input"
            type="text"
            name="username"
            value={updatedUserData.username}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={updatedUserData.email}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            name="city"
            value={updatedUserData.city}
            onChange={handleInputChange}
          />
        </div>
        <Button
          data-testid="submit-button" 
          icon="pi pi-check" 
          aria-label="Submit" 
        />
        <Button
          data-testid="cancel-button"
          className="cancel-button"
          icon="pi pi-times"
          aria-label="Cancel"
          onClick={closeEditProfile}
        />
      </form>
    </div>
  );
}

export default EditProfile;
