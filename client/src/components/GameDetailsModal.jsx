import { Button } from "primereact/button";
import { Card } from "primereact/card";

function GameDetailsModal({ setGameDetailsModalVisible, gameDetails, gameReviews }) {

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
                        <p>Reviews: {gameReviews.map((reviews, index) => (
                            <li key={index}>{reviews.review_text}</li>
                        ))}</p>
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