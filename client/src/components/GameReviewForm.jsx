import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import axios from "axios";

function GameReviewForm({ setGameReviewFormVisible, gameDetails, loggedInUser, setNewReviewSubmitted }) {
    const [review, setReview] = useState({
        user_id: loggedInUser.user_id,
        game_id: gameDetails.id,
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({...prevReview, [name]: value}));
    };

    const handleNewUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/reviews`, {
                user_id: review.user_id,
                game_id: review.game_id,
                rating: review.rating,
                review_text: review.review_text,
            });
            
            if (response.status === 200) {
                const user = response.data;
                setNewReviewSubmitted(true);
                turnOffGameReviewFormVisible();
                console.log("New review creation successful", user);
            } else {
                console.error("Review creation fail", response.data.message);
            }
        } catch (error) {
            console.error("error creating new review:", error);
        }
    };


    return (
        <div className="game-review-form">
            <p>Write a Review for {gameDetails.name}</p>
            <form onSubmit={handleNewUserSubmit}>
                <InputNumber
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    min={1}
                    max={5}
                    showButtons
                    onChange={(e) => setReview({ ...review, rating: e.value })}
                    value={review.rating}
                />
                <textarea
                    id="review_text"
                    name="review_text"
                    placeholder="Review Text"
                    rows={4}
                    onChange={handleChange}
                    value={review.review_text}
                />
            <Button label="Submit"/>
            <Button label="Cancel" onClick={turnOffGameReviewFormVisible}/>
            </form>
        </div>
    )
};

export default GameReviewForm;