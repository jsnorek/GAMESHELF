// This component creates a template for each individual game review from the database.
// It displays the game's rating, review, the creation data and username, if given.

function GameReview({ review }) {
    return (
        <div data-testid="game-review" className="game-review">
            <li>
                <h4 data-testid="review-rating">Rating: </h4> {review.rating} <br />
                <h4>Review: </h4> {review.review_text}
                {review.username && <p>- {review.username}</p>}
                {/* <p>- {review.username}</p> */}
                <p>{new Date(review.created_at).toLocaleDateString()}</p>
            </li>
        </div>
    );
}

export default GameReview;