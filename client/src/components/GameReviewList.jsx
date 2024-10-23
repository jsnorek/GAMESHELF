import GameReview from "./GameReview";

function GameReviewList({ reviews }) {
    console.log("these are the game reviews that should be listed:", reviews);
    return (
        <>
            {reviews && reviews.length > 0 ? (
                <ul>
                    {reviews.map((review, index) => (
                        <GameReview key={index} review={review} />
                    ))}
                </ul>
            ) : (
                <p>No reviews available</p>
            )}
        </>
    );
}

export default GameReviewList;