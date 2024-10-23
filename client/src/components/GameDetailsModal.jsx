import { Button } from "primereact/button";
import { Card } from "primereact/card";
import GameReviewForm from "./GameReviewForm";
import { useState } from "react";

function GameDetailsModal({ setGameDetailsModalVisible, gameDetails, gameReviews, isLoggedIn, loggedInUser }) {

    const [gameReviewFormVisible, setGameReviewFormVisible] = useState(false)

    if (!gameDetails) {
        return <p>Loading game details...</p>
    }
    const turnGameDetailsModalOff = () => {
        setGameDetailsModalVisible(false);
    }

    console.log('these are the game details in the modal', gameDetails)

    // const platformsList = gameDetails?.platforms?.map((platform, index) => (
    //     <li key={index}>{platform.platform.name}</li>
    // ));

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
                            {gameReviewFormVisible && <GameReviewForm setGameReviewFormVisible={setGameReviewFormVisible} gameDetails={gameDetails}/>}
                            {gameReviews && gameReviews.length > 0 ? (
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
                            )}
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