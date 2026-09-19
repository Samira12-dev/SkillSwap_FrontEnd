import { useState } from "react";
import { Star } from "lucide-react";
import "../../App.css";

function ReviewForm({ revieweeName, onSubmit, onCancel }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating: Number(rating), comment });
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Leave a review{revieweeName ? ` for ${revieweeName}` : ""}</h3>

            <div className="form-group">
                <label>Rating</label>

                <div className="review-star-select">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            type="button"
                            key={value}
                            onClick={() => setRating(value)}
                            className={value <= rating ? "star-btn active" : "star-btn"}
                        >
                            <Star size={22} fill={value <= rating ? "currentColor" : "none"} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Comment</label>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={1000}
                    placeholder="Share how the session went..."
                />
            </div>

            <div className="review-form-actions">
                <button type="button" onClick={onCancel} className="cancel-btn">
                    Cancel
                </button>

                <button type="submit" className="add-skill-submit">
                    Submit Review
                </button>
            </div>
        </form>
    );
}

export default ReviewForm;
