// This component creates a template for each individual game review from the database.
// It displays the game's rating, review, the creation data and username, if given.

import { Button } from "primereact/button";
import { Rating } from "primereact/rating";

function GameReview({ review, deleteUserReview, reviewDeleteButtonVisible = false }) {

  const handleDeleteClick = () => {
    deleteUserReview(review.review_id);
    console.log("delete review id", review.review_id);
  };

  console.log("REVIEW info", review)

  return (
    <li data-testid="game-review" className="game-review">
        {review.gameTitle && <h3>{review.gameTitle}</h3>}
      <h4 data-testid="review-rating">Rating: </h4>
      <Rating
        className="review-rating"
        value={review.rating}
        readOnly
        stars={5}
        cancel={false}
      />
      <br />
      <h4>Review: </h4> {review.review_text}
      {review.username && <p>- {review.username}</p>}
      <p>{new Date(review.created_at).toLocaleDateString()}</p>
      {reviewDeleteButtonVisible && (
        <Button
          icon="pi pi-trash"
          className="delete-review-button"
          onClick={() => handleDeleteClick(review.review_id)}
        />
      )}
    </li>
  );
}

export default GameReview;
