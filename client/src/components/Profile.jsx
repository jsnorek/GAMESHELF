// Will eventually render the Profile page with list of user's information from the database

import { Button } from "primereact/button";
import { useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import GameReviewList from "./GameReviewList";
import { useNavigate } from "react-router-dom";

function Profile({ fullLoggedInUserData, setFullLoggedInUserData, loggedInUser }) {
    const [userReviewsListVisible, setUserReviewsListVisible] = useState(false);
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    // Add a condition to check if the data exists
    const userData = fullLoggedInUserData && fullLoggedInUserData.length > 0 ? fullLoggedInUserData[0] : null;

    const handleUserReviewsVisible = () => {
        setUserReviewsListVisible(true)
        console.log('user review list is visible', userReviewsListVisible);
      };

    const closeUserReviewModal = () => {
        setUserReviewsListVisible(false)
    };

    const handleEditProfileVisible = () => {
        setEditProfileVisible(true)
    };

    const closeEditProfile = () => {
        setEditProfileVisible(false)
    };

     // To navigate to different pages
     const navigate = useNavigate();
    // Navigates to the MyShelf page for the MyShelf button
    const handleMyShelfClick = () => {
        navigate('/myshelf');
    }

    console.log('is user reviews list visible?', userReviewsListVisible);

    // async function updateUserProfile(userId, updatedUserData) {
    //     try {
    //         const response = await axios.patch(`http://localhost:8080/users/${userId}`, updatedUserData);
    //         console.log('User profile updated', response.data);
    //         setFullLoggedInUserData((prevUserData) =>
    //             prevUserData.map((user) =>
    //             user.user_id === userId
    //     ? {...user, ...updatedUserData } : user ))
    //     } catch (error) {
    //         console.error('Error updating profile', error);
    //     }  
    // };

    async function updateUserProfile(userId, updatedUserData) {
        try {
            const response = await axios.patch(`http://localhost:8080/users/${userId}`, updatedUserData);
            console.log('User profile updated', response.data);
            // Update the fullLoggedInUserData state immediately after successful patch
            setFullLoggedInUserData([{ ...userData, ...updatedUserData }]);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    }

    //   {gameReviews && gameReviews.length > 0 ? (
    //     <ul>
    //         {gameReviews.map((review, index) => (
    //             <li key={index}>
    //                 <strong>Rating: </strong> {review.rating} <br />
    //                 <strong>Review: </strong> {review.review_text}
    //                 <p>- {review.username}</p>
    //                 <p>{new Date(review.created_at).toLocaleDateString()}</p>
    //             </li>
    //         ))}
    //     </ul>
    //     ) : (
    //     <p>No reviews available</p>
    // )}

    // Render only if userData exists
    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div>
            <h1>Hello, {userData.name}</h1>
            <h3>Details</h3>
            <p>Username: {userData.username}</p>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>City: {userData.city}</p>
            <Button label="Edit" onClick={handleEditProfileVisible}/>
            {editProfileVisible && 
            <EditProfile 
                fullLoggedInUserData={fullLoggedInUserData} 
                setEditProfileVisible={setEditProfileVisible} 
                updateUserProfile={updateUserProfile} 
                loggedInUser={loggedInUser}
                closeEditProfile={closeEditProfile}
            />}
            {/* {editProfileVisible && <EditProfile fullLoggedInUserData={fullLoggedInUserData} setEditProfileVisible={setEditProfileVisible}/>} */}
            <Button label="My Reviews" onClick={handleUserReviewsVisible}/>
            <Button label="MyShelf" onClick={handleMyShelfClick}/>
             {/* CORRECT ONE */}
                {/* {userReviewsListVisible && userData.reviews && userData.reviews.length > 0 && 
                <div className="user-reviews-list">
                <GameReviewList reviews={userData.reviews}/>
                <Button label="Back" onClick={closeUserReviewModal}/>
                </div>} */}
                 {userReviewsListVisible && (
                <div className="user-reviews-list">
                    {userData.reviews && userData.reviews.length > 0 ? (
                        <GameReviewList reviews={userData.reviews}/>
                    ) : (
                        <p>No reviews available</p>
                    )}
                    <Button label="Back" onClick={closeUserReviewModal}/>
                </div>
            )}
            {/* {userReviewsListVisible && (userData.reviews && userData.reviews.length > 0 ? (
                <div className="user-reviews-list">
                    <ul>
                        {userData.reviews.map((review, index) => (
                            <>
                                <li key={index}>
                                    <p>Rating: {review.rating}</p>
                                    <p>Review: {review.review_text}</p>
                                    <p>Date: {new Date(review.created_at).toLocaleDateString()}</p>
                                </li>
                                <Button label="Back" onClick={closeUserReviewModal}/>
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="user-reviews-list">
                    <p>No reviews available</p>
                    <Button label="Back" onClick={closeUserReviewModal}/>
                </div>
            )
            )} */}
        </div>
    )
}

export default Profile;