// This component renders a modal that displays detailed information about a selected game.
// It includes game descriptions, platforms, genres, publishers, and reviews.
// If the user is logged in, they can also write a review.

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import GameReviewForm from "./GameReviewForm";
import { useState } from "react";
import GameReviewList from "./GameReviewList";

function GameDetailsModal({ setGameDetailsModalVisible, gameDetails, gameReviews, isLoggedIn, loggedInUser, setNewReviewSubmitted, baseURL }) {
    
    // State to control the visibility of the GameReviewForm component.
    const [gameReviewFormVisible, setGameReviewFormVisible] = useState(false)
    
    // If no game details are provided, display a loading message until the data is available.
    if (!gameDetails) {
        return <p>Loading game details...</p>
    }

    // Function to close the GameDetailsModal by setting its visibility to false.
    const turnGameDetailsModalOff = () => {
        setGameDetailsModalVisible(false);
    }

    console.log('these are the game details in the modal', gameDetails)

    // Function to make the review form visible when the user clicks "Write a Review".
    const handleGameReviewFormVisible = () => {
        setGameReviewFormVisible(true);
    }


    return (
        <div className="game-details-modal">
            <p>Game Details</p>
            <div className="game-details">
                <Card>
                    {gameDetails ? (
                        <>
                        <p>{gameDetails.name}</p>
                        <img src={gameDetails.background_image} alt={gameDetails.name} style={{ width: '200px' }}/>
                        <p>{gameDetails.description_raw}</p>
                        <p>Platform(s): {gameDetails.platforms.map((platform, index) => (
                            <li key={index}>{platform.platform.name}</li>
                        ))}</p>
                        <p>Genre: {gameDetails.genres.map((genre, index) => (
                            <li key={index}>{genre.name}</li>
                        ))}</p>
                        <p>Publisher(s): {gameDetails.publishers.map((publisher, index) => (
                            <li key={index}>{publisher.name}</li>
                        ))}</p>
                        {/* {gameReviews && gameReviews.length > 0 ? (
                                <p>Reviews: {gameReviews.map((review, index) => (
                                    <li key={index}>{review.review_text}</li>
                                ))}</p>
                            ) : (
                                <p>No reviews available</p>
                            )} */}
                            {isLoggedIn && <Button label="Write a Review" onClick={handleGameReviewFormVisible}/>}
                            {gameReviewFormVisible && <GameReviewForm setGameReviewFormVisible={setGameReviewFormVisible} gameDetails={gameDetails} loggedInUser={loggedInUser} setNewReviewSubmitted={setNewReviewSubmitted} baseURL={baseURL}/>}
                            {gameReviews && gameReviews.length > 0 &&
                            <GameReviewList reviews={gameReviews}/>}
                            {/* {gameReviews && gameReviews.length > 0 ? (
                                <ul>
                                    {gameReviews.map((review, index) => (
                                        <li key={index}>
                                            <strong>Rating: </strong> {review.rating} <br />
                                            <strong>Review: </strong> {review.review_text}
                                            <p>- {review.username}</p>
                                            <p>{new Date(review.created_at).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                                ) : (
                                <p>No reviews available</p>
                            )} */}
                        </>
                    ) : (
                        <p>No game details available</p>
                    )}
                </Card>
            </div>
            <Button label="Back" onClick={turnGameDetailsModalOff}/>
        </div>
    )
};

export default GameDetailsModal;