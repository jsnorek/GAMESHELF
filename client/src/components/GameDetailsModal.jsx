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
    const [gameReviewFormVisible, setGameReviewFormVisible] = useState(false);
    
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
        console.log("game review form is visible", gameReviewFormVisible);
    }


    // return (
    //     <div className="game-details-modal">
    //         <h2 className="modal-header">Game Details</h2>
    //         <div className="game-details">
    //             <Card>
    //                 {gameDetails ? (
    //                     <>
    //                     <h3>{gameDetails.name}</h3>
    //                     <img className="game-image" src={gameDetails.background_image} alt={gameDetails.name} style={{ width: '200px' }}/>
    //                     <p>{gameDetails.description_raw}</p>
    //                     <h4>Platform(s): {gameDetails.platforms.map((platform, index) => (
    //                         <li key={index}>{platform.platform.name}</li>
    //                     ))}</h4>
    //                     <h4>Genre: {gameDetails.genres.map((genre, index) => (
    //                         <li key={index}>{genre.name}</li>
    //                     ))}</h4>
    //                     <h4>Publisher(s): {gameDetails.publishers.map((publisher, index) => (
    //                         <li key={index}>{publisher.name}</li>
    //                     ))}</h4>
    //                         {isLoggedIn && <Button label="Write a Review" onClick={handleGameReviewFormVisible}/>}
    //                         {gameReviewFormVisible && <GameReviewForm setGameReviewFormVisible={setGameReviewFormVisible} gameDetails={gameDetails} loggedInUser={loggedInUser} setNewReviewSubmitted={setNewReviewSubmitted} baseURL={baseURL}/>}
    //                         {gameReviews && gameReviews.length > 0 &&
    //                         <GameReviewList reviews={gameReviews}/>}
    //                     </>
    //                 ) : (
    //                     <p>No game details available</p>
    //                 )}
    //             </Card>
    //         </div>
    //         <Button className="back-button" label="Back" onClick={turnGameDetailsModalOff}/>
    //     </div>
    // )

    return (
        <>
            <div className="game-details-modal">
                <h2 className="modal-header">Game Details</h2>
                <div className="game-details">
                    <Card>
                        {gameDetails ? (
                            <>
                                <h3>{gameDetails.name}</h3>
                                <img className="game-image" src={gameDetails.background_image} alt={gameDetails.name} style={{ width: '200px' }}/>
                                <p>{gameDetails.description_raw}</p>
                                <h4>Platform(s):</h4>
                            <ul>
                                {gameDetails.platforms.map((platform, index) => (
                                    <li key={index}>{platform.platform.name}</li>
                                ))}
                            </ul>

                            <h4>Genre(s):</h4>
                            <ul>
                                {gameDetails.genres.map((genre, index) => (
                                    <li key={index}>{genre.name}</li>
                                ))}
                            </ul>

                            <h4>Publisher(s):</h4>
                            <ul>
                                {gameDetails.publishers.map((publisher, index) => (
                                    <li key={index}>{publisher.name}</li>
                                ))}
                            </ul>
                                {isLoggedIn && <Button label="Write a Review" onClick={handleGameReviewFormVisible} />}
                                {gameReviews && gameReviews.length > 0 && <GameReviewList reviews={gameReviews} />}
                            </>
                        ) : (
                            <p>No game details available</p>
                        )}
                    </Card>
                </div>
                <Button className="back-button" icon="pi pi-times" aria-label="Cancel" onClick={turnGameDetailsModalOff} />
            </div>
            {gameReviewFormVisible && (
                <div className="game-review-form-overlay">
                    <GameReviewForm 
                        setGameReviewFormVisible={setGameReviewFormVisible} 
                        gameDetails={gameDetails} 
                        loggedInUser={loggedInUser} 
                        setNewReviewSubmitted={setNewReviewSubmitted} 
                        baseURL={baseURL} 
                    />
                </div>
            )}
        </>
    );
};

export default GameDetailsModal;