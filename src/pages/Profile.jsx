
import { Link } from "react-router-dom";
import "../App.css";

function MyProfile() {
    return (
        <div className="profile-page">

            <div className="profile-header">
                <div>
                    <h2>My Profile</h2>
                    <p>Manage your public profile and personal information</p>
                </div>

                <Link to="/profile/edit" className="btn-edit-profile">
                    ✎ Edit Profile
                </Link>
            </div>

            <div className="profile-grid">

                <div className="left-col">

                    <div className="card user-summary-card">

                        <div className="profile-img-box">
                            <img
                                src="https://i.pravatar.cc/120?img=12"
                                alt="Alex Johnson"
                            />
                        </div>

                        <h3>Alex Johnson</h3>

                        <p className="location">
                            📍 San Francisco, CA
                        </p>

                        <div className="rating-stars">
                            <span className="stars">★★★★★</span>
                            <span className="rating-num">
                                4.8 <span>(12)</span>
                            </span>
                        </div>

                        <div className="stats-counter-box">

                            <div className="stat-item">
                                <span className="num">5</span>
                                <span className="lbl">Skills</span>
                            </div>

                            <div className="stat-item">
                                <span className="num">9</span>
                                <span className="lbl">Sessions</span>
                            </div>

                            <div className="stat-item">
                                <span className="num">7</span>
                                <span className="lbl">Swaps</span>
                            </div>

                        </div>

                        <div className="member-since">
                            📅 Member since March 2024
                        </div>

                    </div>

                    <div className="card">

                        <div className="card-header">
                            <h3>My Skills</h3>

                            <Link to="/skills" className="link-btn">
                                Manage
                            </Link>
                        </div>

                        <div className="skill-group">

                            <span className="skill-label">
                                I CAN OFFER
                            </span>

                            <div className="skill-row">
                                <div className="skill-info">
                                    <span className="skill-name">
                                        React Development
                                    </span>

                                    <span className="category">
                                        Technology
                                    </span>
                                </div>

                                <span className="tag green">
                                    Advanced
                                </span>
                            </div>

                            <div className="skill-row">
                                <div className="skill-info">
                                    <span className="skill-name">
                                        Node.js & APIs
                                    </span>

                                    <span className="category">
                                        Technology
                                    </span>
                                </div>

                                <span className="tag green">
                                    Advanced
                                </span>
                            </div>

                            <div className="skill-row">
                                <div className="skill-info">
                                    <span className="skill-name">
                                        TypeScript
                                    </span>

                                    <span className="category">
                                        Technology
                                    </span>
                                </div>

                                <span className="tag yellow">
                                    Intermediate
                                </span>
                            </div>

                        </div>

                        <div className="skill-group">

                            <span className="skill-label">
                                I WANT TO LEARN
                            </span>

                            <div className="tags-flex">
                                <span className="tag blue">
                                    Photography
                                </span>

                                <span className="tag blue">
                                    Spanish
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="right-col">

                    <div className="card">

                        <h3>Personal Information</h3>

                        <div className="info-grid">

                            <div className="info-item">
                                <label>FIRST NAME</label>
                                <p>Alex</p>
                            </div>

                            <div className="info-item">
                                <label>LAST NAME</label>
                                <p>Johnson</p>
                            </div>

                            <div className="info-item full-width">
                                <label>EMAIL</label>
                                <p>alex@skillswap.com</p>
                            </div>

                            <div className="info-item full-width">
                                <label>CITY</label>
                                <p>📍 San Francisco, CA</p>
                            </div>

                            <div className="info-item full-width">
                                <label>BIO</label>

                                <p className="bio-text">
                                    Full-stack developer with a passion for
                                    building products. I love learning new
                                    creative skills and meeting people from
                                    different backgrounds.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="card">

                        <h3>Reviews (3)</h3>

                        <div className="reviews-list">

                            <div className="review-item">

                                <div className="review-header">

                                    <div className="reviewer-info">

                                        <img
                                            src="https://i.pravatar.cc/100?img=5"
                                            alt="Aisha Patel"
                                        />

                                        <div>
                                            <h4>Aisha Patel</h4>
                                            <span className="location">
                                                Seattle, WA
                                            </span>
                                        </div>

                                    </div>

                                    <div className="review-meta">
                                        <span className="stars">
                                            ★★★★★
                                        </span>

                                        <span className="date">
                                            Jul 21, 2025
                                        </span>
                                    </div>

                                </div>

                                <p className="review-comment">
                                    "Alex is an exceptional teacher! He explained
                                    React concepts so clearly and was very
                                    patient. I went from zero to building my
                                    first component in just one session."
                                </p>

                            </div>

                            <div className="review-item">

                                <div className="review-header">

                                    <div className="reviewer-info">

                                        <img
                                            src="https://i.pravatar.cc/100?img=11"
                                            alt="Marcus Rivera"
                                        />

                                        <div>
                                            <h4>Marcus Rivera</h4>

                                            <span className="location">
                                                Austin, TX
                                            </span>
                                        </div>

                                    </div>

                                    <div className="review-meta">
                                        <span className="stars">
                                            ★★★★★
                                        </span>

                                        <span className="date">
                                            Aug 18, 2025
                                        </span>
                                    </div>

                                </div>

                                <p className="review-comment">
                                    "Had a great session with Alex on Node.js
                                    and REST APIs. He knows his stuff and makes
                                    it easy to understand."
                                </p>

                            </div>

                            <div className="review-item">

                                <div className="review-header">

                                    <div className="reviewer-info">

                                        <img
                                            src="https://i.pravatar.cc/100?img=9"
                                            alt="James Wilson"
                                        />

                                        <div>
                                            <h4>James Wilson</h4>

                                            <span className="location">
                                                Los Angeles, CA
                                            </span>
                                        </div>

                                    </div>

                                    <div className="review-meta">
                                        <span className="stars">
                                            ★★★★☆
                                        </span>

                                        <span className="date">
                                            Aug 5, 2025
                                        </span>
                                    </div>

                                </div>

                                <p className="review-comment">
                                    "Alex helped me understand TypeScript which
                                    was something I had been avoiding for years.
                                    Very knowledgeable and accommodating."
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MyProfile;
