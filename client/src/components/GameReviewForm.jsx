import { Button } from "primereact/button";

function GameReviewForm({ turnGameDetailsModalOff, setGameReviewFormVisible }) {

    const turnOffGameReviewFormVisible= () => {
        setGameReviewFormVisible(false);
    }


    return (
        <div className="game-review-form">
            <p>Write a Review</p>
            <Button label="Cancel" onClick={turnOffGameReviewFormVisible}/>
        </div>
    )
};

export default GameReviewForm;