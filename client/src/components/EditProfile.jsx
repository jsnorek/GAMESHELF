import { Button } from "primereact/button";
import { useEffect, useState } from "react";

function EditProfile({ fullLoggedInUserData, setEditProfileVisible, updateUserProfile, loggedInUser, closeEditProfile }) {
    // Add a condition to check if the data exists
    const userData = fullLoggedInUserData && fullLoggedInUserData.length > 0 ? fullLoggedInUserData[0] : null;
    const [updatedUserData, setUpdatedUserData] = useState({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        city: userData.city
    });

    useEffect(() => {
        if (userData) {
            setUpdatedUserData({
                name: userData.name || "",
                username: userData.username || "",
                email: userData.email || "",
                city: userData.city || ""
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(loggedInUser.user_id, updatedUserData);
        setEditProfileVisible(false)
    };


    return (
        <div>
            <p>Edit Profile</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text"
                        name="name"
                        value={updatedUserData.name}
                        onChange={handleInputChange}
                    /> 
                    <br />
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={updatedUserData.username}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>Email:</label>
                    <input 
                        type="email"
                        name="email"
                        value={updatedUserData.email}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label>City</label>
                    <input 
                        type="text"
                        name="city"
                        value={updatedUserData.city}
                        onChange={handleInputChange}
                    />
                </div>
                <Button label="Submit"/>
                <Button label="Cancel" onClick={closeEditProfile}/>
            </form>
        </div>
    )
}

export default EditProfile;