import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

function GameReviewForm({ setGameReviewFormVisible, gameDetails }) {
    const [review, setReview] = useState({
        user_id: "",
        game_id: "",
        rating: "",
        review_text: "",
    });

    const clearForm = () => {
        setReview({
            user_id: "",
            game_id: "",
            rating: "",
            review_text: "" ,
        });
    };

    const turnOffGameReviewFormVisible= () => {
        setGameReviewFormVisible(false);
    }


    return (
        <div className="game-review-form">
            <p>Write a Review for {gameDetails.name}</p>
            <form>
                <InputNumber
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    min={1}
                    max={5}
                    showButtons
                />
                <textarea
                    id="review_text"
                    name="rating"
                    placeholder="Review Text"
                    rows={4}
                />
            <Button label="Submit"/>
            <Button label="Cancel" onClick={turnOffGameReviewFormVisible}/>
            </form>
        </div>
    )
};

export default GameReviewForm;