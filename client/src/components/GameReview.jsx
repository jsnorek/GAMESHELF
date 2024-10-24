// This component creates a template for each individual game review from the database.
// It displays the game's rating, review, the creation data and username, if given.

function GameReview({ review }) {
    return (
        <li>
            <strong>Rating: </strong> {review.rating} <br />
            <strong>Review: </strong> {review.review_text}
            {review.username && <p>{review.username}</p>}
            {/* <p>- {review.username}</p> */}
            <p>{new Date(review.created_at).toLocaleDateString()}</p>
        </li>
    );
}

export default GameReview;