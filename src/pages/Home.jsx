import "../App.css";
function Home() {
    return (
        <div className="home">
            <nav className="navbar">
                <div className="logo">
                    <span className="logo-icon">↔</span>
                    SkillSwap
                </div>
                <div className="nav-links">
                    <a href="#how-it-works">How it works</a>
                    <a href="#features">Features</a>
                    <a href="#stories">Stories</a>
                </div>
                <div className="nav-buttons">
                    <a href="/login" className="login-link">Login</a>
                    <a href="/register" className="start-btn">Get Started</a>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <p className="small-text">The skill economy for curious minds</p>
                    <h1>
                        Learn what
                        <br />
                        you love.
                    </h1>
                    <p className="hero-description">
                        SkillSwap connects people who want to exchange
                        skills — no money involved, just genuine knowledge
                        shared between real people.
                    </p>
                    <a href="/register" className="hero-btn">Start swapping</a>
                    <div className="trust">
                        <div className="avatars">
                            <span>👩</span>
                            <span>👨</span>
                            <span>👩</span>
                            <span>👨</span>
                        </div>
                        <div>
                            <div className="stars">★★★★★</div>
                            <span>Trusted by skill swappers</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="profile-card card-one">
                        <div className="profile-avatar">👩</div>
                        <div>
                            <strong>Sarah</strong>
                            <small>San Francisco</small>
                        </div>
                        <span className="skill-tag">Guitar</span>
                    </div>

                    <div className="profile-card card-two">
                        <div className="profile-avatar">👨</div>
                        <div>
                            <strong>Alex</strong>
                            <small>New York</small>
                        </div>
                        <span className="skill-tag">French</span>
                    </div>

                    <div className="request-card">
                        <div className="check">✓</div>
                        <div>
                            <strong>Swap Request Accepted!</strong>
                            <small>Conversation created</small>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats">
                <div>
                    <strong>12,400+</strong>
                    <span>Active members</span>
                </div>
                <div>
                    <strong>48</strong>
                    <span>Skill categories</span>
                </div>
                <div>
                    <strong>89K+</strong>
                    <span>Sessions completed</span>
                </div>
                <div>
                    <strong>4.8★</strong>
                    <span>Avg. rating</span>
                </div>
            </section>

            <section className="skills">
                <span>React Development</span>
                <span>Photography</span>
                <span>Guitar</span>
                <span>French</span>
                <span>Yoga</span>
                <span>Machine Learning</span>
                <span>UI/UX Design</span>
                <span>Spanish</span>
                <span>Piano</span>
            </section>

            <section className="features" id="features">
                <p className="section-label">WHY SKILLSWAP</p>
                <h2>Built for real skill exchange</h2>
                <p className="section-description">
                    Everything you need to connect, learn, and grow
                    with people who share your curiosity.
                </p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">↔</div>
                        <h3>Pure Skill Exchange</h3>
                        <p>
                            No money, no algorithms. Just two people
                            agreeing to teach each other something they love.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">✓</div>
                        <h3>Verified Community</h3>
                        <p>
                            Every member is reviewed by real peers.
                            Browse profiles with ratings and reviews.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">◉</div>
                        <h3>Online & In-Person</h3>
                        <p>
                            Schedule sessions online or meet locally
                            depending on what works for you.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">□</div>
                        <h3>Structured Sessions</h3>
                        <p>
                            Propose sessions, confirm times and
                            keep everything organized.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">▢</div>
                        <h3>Built-in Messaging</h3>
                        <p>
                            Communicate directly with your swap partners
                            once a request is accepted.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">☆</div>
                        <h3>Honest Reviews</h3>
                        <p>
                            After each completed session, both partners
                            can leave a review.
                        </p>
                    </div>
                </div>
            </section>

            <section className="how-it-works" id="how-it-works">
                <p className="section-label">HOW IT WORKS</p>
                <h2>From hello to skill swap</h2>
                <p className="section-description">
                    Four simple steps stand between you and your first
                    skill exchange.
                </p>

                <div className="steps">
                    <div className="step">
                        <div className="step-number">01</div>
                        <h3>Build your profile</h3>
                        <p>
                            Add the skills you can teach and the ones
                            you want to learn.
                        </p>
                    </div>

                    <div className="step">
                        <div className="step-number">02</div>
                        <h3>Discover & match</h3>
                        <p>
                            Browse users offering what you want and
                            discover your best matches.
                        </p>
                    </div>

                    <div className="step">
                        <div className="step-number">03</div>
                        <h3>Send a swap request</h3>
                        <p>
                            Propose a skill exchange and wait for
                            your partner to accept.
                        </p>
                    </div>

                    <div className="step">
                        <div className="step-number">04</div>
                        <h3>Learn together</h3>
                        <p>
                            Chat, schedule sessions and learn together.
                        </p>
                    </div>
                </div>
            </section>

            <section className="stories" id="stories">
                <p className="section-label">SUCCESS STORIES</p>
                <h2>Real people, real swaps</h2>

                <div className="story-grid">
                    <div className="story-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "I traded Python for Spanish lessons.
                            SkillSwap completely changed how I learn."
                        </p>
                        <strong>Priya Nair</strong>
                        <small>Python ↔ Spanish</small>
                    </div>

                    <div className="story-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "I found someone who wanted to learn
                            web development and teach French."
                        </p>
                        <strong>Tomás Reyes</strong>
                        <small>Web Development ↔ French</small>
                    </div>

                    <div className="story-card">
                        <div className="stars">★★★★★</div>
                        <p>
                            "The community is genuine, warm and
                            full of people ready to share."
                        </p>
                        <strong>Yuki Tanaka</strong>
                        <small>UI/UX Design ↔ Guitar</small>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready for your first swap?</h2>
                <p>
                    Join curious people who are already teaching
                    and learning something new every week.
                </p>
                <a href="/register" className="cta-btn">Get Started</a>
            </section>

            <footer className="footer">
                <div>
                    <div className="logo">
                        <span className="logo-icon">↔</span>
                        SkillSwap
                    </div>
                    <p>
                        Exchange knowledge, build community,
                        and grow together.
                    </p>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>PLATFORM</h4>
                        <a href="#how-it-works">How it works</a>
                        <a href="#features">Features</a>
                        <a href="#stories">Success Stories</a>
                    </div>

                    <div>
                        <h4>COMPANY</h4>
                        <a href="#">About</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;