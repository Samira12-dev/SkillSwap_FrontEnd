import {
    ArrowRight,
    BadgeCheck,
    Bell,
    CalendarDays,
    Check,
    Compass,
    GraduationCap,
    Handshake,
    MessageSquare,
    Search,
    Sparkles,
    Star,
    UserRound
} from "lucide-react";
import { Link } from "react-router-dom";
import "../App.css";

const steps = [
    {
        icon: UserRound,
        title: "Create your profile",
        description: "Add the skills you can offer and the skills you want to learn, with the level you are comfortable with."
    },
    {
        icon: Compass,
        title: "Find a match",
        description: "Browse real profiles, filter by skill and level, then send an exchange request when someone fits."
    },
    {
        icon: Handshake,
        title: "Exchange and learn",
        description: "Chat after acceptance, schedule a session, and review the experience when you are finished."
    }
];

const benefits = [
    {
        icon: GraduationCap,
        title: "Offer and wanted skills",
        description: "Keep a clear list of what you can teach and what you want to learn next."
    },
    {
        icon: Search,
        title: "Focused discovery",
        description: "Find people by skill name, exchange type, and level instead of scrolling a generic feed."
    },
    {
        icon: MessageSquare,
        title: "Real-time conversations",
        description: "Message your exchange partner in a focused conversation once a request is accepted."
    },
    {
        icon: CalendarDays,
        title: "Session scheduling",
        description: "Propose a time and duration, confirm sessions, and keep upcoming exchanges organised."
    },
    {
        icon: Star,
        title: "Reviews after completion",
        description: "Build trust through ratings that are only available after a completed session."
    },
    {
        icon: Bell,
        title: "Useful notifications",
        description: "Stay aware of requests, sessions, and unread messages without checking every page."
    }
];

export default function Home() {
    return (
        <div className="landing">
            <section className="landing-hero">
                <div className="landing-container landing-hero-inner">
                    <div className="landing-hero-copy">
                        <span className="landing-badge">
                            <Sparkles size={14} />
                            Skill exchange, without the noise
                        </span>
                        <h1>
                            Teach what you know.
                            <br />
                            Learn what you <span>love.</span>
                        </h1>
                        <p className="landing-subtitle">
                            SkillSwap connects people who want to trade knowledge
                            directly. Build your profile, find a partner, and turn
                            a shared interest into a real learning exchange.
                        </p>

                        <div className="landing-actions">
                            <Link to="/register" className="btn btn-primary">
                                Create free account
                                <ArrowRight size={17} />
                            </Link>
                            <Link to="/login" className="btn btn-secondary">
                                Sign in
                            </Link>
                        </div>

                        <div className="landing-trust">
                            <span><Check size={14} /> Profile-based matching</span>
                            <span><Check size={14} /> Real-time messaging</span>
                            <span><Check size={14} /> Session scheduling</span>
                        </div>
                    </div>

                    <div className="landing-visual" aria-hidden="true">
                        <div className="preview-card preview-card-main">
                            <div className="preview-card-top">
                                <strong>Your next exchange</strong>
                                <small>Example</small>
                            </div>

                            <div className="preview-match">
                                <span className="preview-match-icon">
                                    <GraduationCap size={19} />
                                </span>
                                <span className="preview-match-copy">
                                    <strong>Offering: Creative Writing</strong>
                                    <small>Advanced level</small>
                                </span>
                                <span className="tag green">Offer</span>
                            </div>

                            <div className="preview-match">
                                <span className="preview-match-icon">
                                    <Compass size={19} />
                                </span>
                                <span className="preview-match-copy">
                                    <strong>Wanting to learn: Spanish</strong>
                                    <small>Intermediate level</small>
                                </span>
                                <span className="tag blue">Wanted</span>
                            </div>

                            <div className="preview-card-top" style={{ margin: "18px 0 8px" }}>
                                <small>Exchange flow</small>
                                <BadgeCheck size={17} color="#0f9f74" />
                            </div>
                            <p className="ui-text-sm ui-muted" style={{ margin: 0 }}>
                                Request accepted, conversation ready, session ready to schedule.
                            </p>
                        </div>

                        <div className="preview-card preview-chat">
                            <div className="preview-chat-head">
                                <span />
                                Conversation
                            </div>
                            <div className="preview-bubble">Would Saturday morning work for you?</div>
                            <div className="preview-bubble is-own">Yes, let&apos;s schedule it.</div>
                        </div>

                        <div className="preview-card preview-session">
                            <span className="preview-session-icon">
                                <CalendarDays size={17} />
                            </span>
                            <span>
                                <strong>Session confirmed</strong>
                                <small>Online · 60 minutes</small>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-section" id="how-it-works">
                <div className="landing-container">
                    <div className="landing-section-head">
                        <p className="ui-eyebrow">How it works</p>
                        <h2>A clear path from interest to exchange</h2>
                        <p>
                            SkillSwap keeps the process simple: describe what you
                            know, find someone with a complementary interest, and
                            arrange the exchange.
                        </p>
                    </div>

                    <div className="landing-steps">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <article className="landing-step" key={step.title}>
                                    <span className="landing-step-number">0{index + 1}</span>
                                    <Icon className="landing-step-icon" size={21} />
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="landing-section landing-section--tint" id="benefits">
                <div className="landing-container">
                    <div className="landing-section-head">
                        <p className="ui-eyebrow">Benefits</p>
                        <h2>Everything needed for a focused exchange</h2>
                        <p>
                            Each feature supports the same goal: helping two people
                            organise a fair, useful skill swap.
                        </p>
                    </div>

                    <div className="landing-benefits">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <article className="landing-benefit" key={benefit.title}>
                                    <span className="landing-benefit-icon">
                                        <Icon size={20} />
                                    </span>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="landing-section">
                <div className="landing-container">
                    <div className="landing-cta-inner">
                        <div>
                            <h2>Ready to turn what you know into what you want to learn?</h2>
                            <p>
                                Create a profile, add your first skill, and start
                                discovering people with something to exchange.
                            </p>
                        </div>
                        <div className="landing-cta-actions">
                            <Link to="/register" className="btn btn-primary">
                                Get started
                                <ArrowRight size={16} />
                            </Link>
                            <Link to="/login" className="btn btn-secondary">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
