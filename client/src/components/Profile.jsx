// Will eventually render the Profile page with list of user's information from the database

import { Button } from "primereact/button";
import { useState } from "react";

function Profile({ fullLoggedInUserData }) {
    const [userReviewsListVisible, setUserReviewsListVisible] = useState(false);

    const userData = fullLoggedInUserData[0];

    const handleUserReviewsVisible = () => {
        setUserReviewsListVisible(true)
        console.log('user review list is visible', userReviewsListVisible);
      };

    const closeUserReviewModal = () => {
        setUserReviewsListVisible(false)
    };

    console.log('is user reviews list visible?', userReviewsListVisible);

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
            <p>Email: {userData.email}</p>
            <p>City: {userData.city}</p>
            <Button label="My Reviews" onClick={handleUserReviewsVisible}/>
            {userReviewsListVisible && (userData.reviews && userData.reviews.length > 0 ? (
                <div className="user-reviews-list">
                    <ul>
                        {userData.reviews.map((review, index) => (
                            <>
                                <li key={index}>
                                    <p>Rating: </p> {review.rating}
                                    <p>Review: </p> {review.review_text}
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