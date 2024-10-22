import { Button } from "primereact/button";
import { useState } from "react";

function EditProfile({ fullLoggedInUserData, setEditProfileVisible, updateUserProfile, loggedInUser }) {

    const [updatedUserData, setUpdatedUserData] = useState({
        name: fullLoggedInUserData[0].name,
        username: fullLoggedInUserData[0].username,
        email: fullLoggedInUserData[0].email,
        city: fullLoggedInUserData[0].city
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedUserData({...updatedUserData, [name]: value });
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
            </form>
        </div>
    )
}

export default EditProfile;