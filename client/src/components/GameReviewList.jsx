// This component renders a list of game reviews passed to it as props.
// It checks if reviews exist, and if they do, renders them using the GameReview component.
// If no reviews are available, it displays a message.
import GameReview from "./GameReview";

function GameReviewList({ reviews, deleteUserReview,reviewDeleteButtonVisible }) {
  return (
    <div data-testid="game-review-list">
      {reviews && reviews.length > 0 ? (
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review, index) => (
              <GameReview key={index} review={review} deleteUserReview={deleteUserReview} reviewDeleteButtonVisible={reviewDeleteButtonVisible}/>
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
