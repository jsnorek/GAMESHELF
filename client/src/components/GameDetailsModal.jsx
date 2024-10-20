import { Button } from "primereact/button";
import { Card } from "primereact/card";

function GameDetailsModal({ setGameDetailsModalVisible, gameDetails }) {

    const turnGameDetailsModalOff = () => {
        setGameDetailsModalVisible(false);
    }

    console.log('these are the game details in the modal', gameDetails)

    return (
        <div className="game-details-modal">
            <p>Game Details</p>
            <div className="game-details">
                <Card>
                    {gameDetails ? (
                        <>
                        <p>{gameDetails.name}</p>
                        <img src={gameDetails.background_image} alt={gameDetails.name} style={{ width: '200px' }}/>
                        {/* <p>{gameDetails.description_raw}</p> */}
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