import { Star } from "lucide-react";
import "../../App.css";

function ReviewCard({ review }) {
    return (
        <div className="review-card">
            <div className="review-card-header">
                <strong>{review.reviewerName}</strong>

                <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                            key={value}
                            size={16}
                            fill={value <= review.rating ? "currentColor" : "none"}
                        />
                    ))}
                </div>
            </div>

            {review.comment && <p>{review.comment}</p>}
        </div>
    );
}

export default ReviewCard;
