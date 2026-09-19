import ReviewCard from "./ReviewCard";
import "../../App.css";

function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet.</p>;
    }

    return (
        <div className="review-list">
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    );
}

export default ReviewList;
