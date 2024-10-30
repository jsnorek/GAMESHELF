// This component renders a list of game reviews passed to it as props.
// It checks if reviews exist, and if they do, renders them using the GameReview component.
// If no reviews are available, it displays a message.
import GameReview from "./GameReview";

function GameReviewList({ reviews }) {
    console.log("these are the game reviews that should be listed:", reviews);
    return (
        <div data-testid="game-review-list">
            {reviews && reviews.length > 0 ? (
                <div>
                <h2>My Reviews</h2>
                <ul>
                    {reviews.map((review, index) => (
                        <GameReview key={index} review={review} />
                    ))}
                </ul>
                </div>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    );
}

export default GameReviewList;