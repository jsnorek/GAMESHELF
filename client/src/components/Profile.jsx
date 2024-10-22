// Will eventually render the Profile page with list of user's information from the database

import { Button } from "primereact/button";
import { useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";

function Profile({ fullLoggedInUserData, setFullLoggedInUserData, loggedInUser }) {
    const [userReviewsListVisible, setUserReviewsListVisible] = useState(false);
    const [editProfileVisible, setEditProfileVisible] = useState(false);

    const userData = fullLoggedInUserData[0];

    const handleUserReviewsVisible = () => {
        setUserReviewsListVisible(true)
        console.log('user review list is visible', userReviewsListVisible);
      };

    const closeUserReviewModal = () => {
        setUserReviewsListVisible(false)
    };

    const handleEditProfileVisible = () => {
        setEditProfileVisible(true);
    };

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

    return (
        <div>
            <h1>Hello, {userData.name}</h1>
            <p>Username: {userData.username}</p>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>City: {userData.city}</p>
            <Button label="Edit" onClick={handleEditProfileVisible}/>
            {editProfileVisible && <EditProfile fullLoggedInUserData={fullLoggedInUserData} setEditProfileVisible={setEditProfileVisible} updateUserProfile={updateUserProfile} loggedInUser={loggedInUser}/>}
            {/* {editProfileVisible && <EditProfile fullLoggedInUserData={fullLoggedInUserData} setEditProfileVisible={setEditProfileVisible}/>} */}
            <Button label="My Reviews" onClick={handleUserReviewsVisible}/>
            {userReviewsListVisible && (userData.reviews && userData.reviews.length > 0 ? (
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
            )}
        </div>
    )
}

export default Profile;