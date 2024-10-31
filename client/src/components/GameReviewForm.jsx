// Allows logged in user to write a game review for a specific game.
// It includes inputs for rating and review text, and submits the data to the server when submitted.

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import axios from "axios";
import { Rating } from "primereact/rating";

function GameReviewForm({ setGameReviewFormVisible, gameDetails, loggedInUser, setNewReviewSubmitted, baseURL }) {
    
    // Initialize the review state with user_id, game_id, rating, and review_text
    const [review, setReview] = useState({
        user_id: loggedInUser.user_id,
        game_id: gameDetails.id,
        rating: "",
        review_text: "",
    });

    // Close the review form modal by setting visibility state to false.
    const turnOffGameReviewFormVisible= () => {
        setGameReviewFormVisible(false);
    }

    // Update the review state when form input fields are changed.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({...prevReview, [name]: value}));
    };

    // To handle form submit on submit button click.
    // It prevents the default form behavior (page refresh).
    // The review data is passed in the request body.
    // On submit, it notifies the parent component about the submission.
    // After submitting, it hides the form by calling turnOffGameReviewFormVisible.
    const handleNewUserSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(`http://localhost:8080/reviews`, {
                const response = await axios.post(`${baseURL}/reviews`, {
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
            <h2>Write a Review for {gameDetails.name}</h2>
            <form onSubmit={handleNewUserSubmit}>
                {/* <p>Rate on a scale of 1-5</p> */}
                {/* <InputNumber
                    id="rating"
                    name="rating"
                    placeholder="Rating"
                    min={1}
                    max={5}
                    showButtons
                    aria-label="rating numbers"
                    aria-valuemin="1" 
                    aria-valuemax="5"
                    onChange={(e) => setReview({ ...review, rating: e.value })}
                    value={review.rating}
                /> */}
                <Rating 
                    className="review-rating"
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: e.value })}
                    stars={5}
                    cancel={false}
                />
                <textarea
                    id="review_text"
                    name="review_text"
                    placeholder="Review Text"
                    rows={4}
                    onChange={handleChange}
                    value={review.review_text}
                />
            <Button icon="pi pi-check" aria-label="Submit" type="submit"/>
            <Button className="cancel-button" icon="pi pi-times" aria-label="Cancel" onClick={turnOffGameReviewFormVisible}/>
            </form>
        </div>
    )
};

export default GameReviewForm;