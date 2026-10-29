import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeftRight,
    ArrowRight,
    Bell,
    CalendarDays,
    Clock3,
    Compass,
    MapPin,
    MessageSquare,
    Plus,
    RefreshCw,
    Sparkles,
    Video
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDashboard } from "../../services/dashboardService";
import Avatar from "../ui/Avatar";
import StatusBadge from "../ui/StatusBadge";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import PageHeader from "../ui/PageHeader";
import { Skeleton, SkeletonCard } from "../ui/LoadingState";
import {
    formatRelativeTime,
    formatTime,
    getErrorMessage
} from "../../utils/format";
import { NOTIFICATION_ROUTES } from "../../utils/constants";
import "../../App.css";

const EMPTY_DASHBOARD = {
    pendingRequests: 0,
    pendingSentRequests: 0,
    pendingReceivedRequests: 0,
    upcomingSessions: 0,
    unreadMessages: 0,
    notifications: 0,
    totalSwapRequests: 0,
    acceptedRequests: 0,
    completedRequests: 0,
    rejectedRequests: 0,
    cancelledRequests: 0,
    recentRequests: [],
    upcomingSessionItems: [],
    recentNotifications: []
};

const STATUS_COLORS = {
    PENDING: "#b46a05",
    ACCEPTED: "#0f9f74",
    COMPLETED: "#2563eb",
    REJECTED: "#d92d4b",
    CANCELLED: "#98a1b2"
};

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

const asNumber = (value) => Number(value) || 0;

const getPartner = (request, userId) => {
    const isSender = String(request.senderId) === String(userId);

    return {
        isSender,
        name: isSender ? request.receiverName : request.senderName,
        photo: isSender ? request.receiverPhoto : request.senderPhoto,
        id: isSender ? request.receiverId : request.senderId
    };
};

const getSessionPartner = (session, userId) => {
    const isSender = String(session.senderId) === String(userId);

    return {
        name: isSender ? session.receiverName : session.senderName,
        photo: isSender ? session.receiverPhoto : session.senderPhoto
    };
};

const formatSessionDate = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return { month: "--", day: "--" };
    }

    return {
        month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
        day: date.getDate()
    };
};

function UserDashboard() {
    const { user } = useContext(AuthContext);
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const loadDashboard = useCallback(async (isRefresh = false) => {
        if (!user?.id) return;

        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        setError("");

        try {
            const data = await getUserDashboard(user.id);

            setDashboard({
                ...EMPTY_DASHBOARD,
                ...data,
                recentRequests: Array.isArray(data?.recentRequests)
                    ? data.recentRequests
                    : [],
                upcomingSessionItems: Array.isArray(data?.upcomingSessionItems)
                    ? data.upcomingSessionItems
                    : [],
                recentNotifications: Array.isArray(data?.recentNotifications)
                    ? data.recentNotifications
                    : []
            });
        } catch (loadError) {
            setError(
                getErrorMessage(
                    loadError,
                    "We couldn't load your dashboard. Please try again."
                )
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const summary = dashboard || EMPTY_DASHBOARD;
    const firstName = user?.firstName || "there";

    const statusCounts = useMemo(() => [
        {
            key: "PENDING",
            label: "Pending",
            value: asNumber(summary.pendingRequests)
        },
        {
            key: "ACCEPTED",
            label: "Accepted",
            value: asNumber(summary.acceptedRequests)
        },
        {
            key: "COMPLETED",
            label: "Completed",
            value: asNumber(summary.completedRequests)
        },
        {
            key: "REJECTED",
            label: "Rejected",
            value: asNumber(summary.rejectedRequests)
        },
        {
            key: "CANCELLED",
            label: "Cancelled",
            value: asNumber(summary.cancelledRequests)
        }
    ], [summary]);

    const statusTotal = statusCounts.reduce(
        (total, status) => total + status.value,
        0
    );
    const totalRequests = Math.max(
        asNumber(summary.totalSwapRequests),
        statusTotal
    );

    const chartGradient = useMemo(() => {
        if (statusTotal === 0) {
            return "conic-gradient(#eef1f7 0% 100%)";
        }

        let cursor = 0;
        const segments = statusCounts
            .filter((status) => status.value > 0)
            .map((status) => {
                const start = cursor;
                const share = (status.value / statusTotal) * 100;
                cursor += share;

                return `${STATUS_COLORS[status.key]} ${start}% ${cursor}%`;
            });

        return `conic-gradient(${segments.join(", ")})`;
    }, [statusCounts, statusTotal]);

    const nextSession = summary.upcomingSessionItems[0];

    const statCards = [
        {
            label: "Pending requests",
            value: asNumber(summary.pendingRequests),
            detail: `${asNumber(summary.pendingReceivedRequests)} received · ${asNumber(summary.pendingSentRequests)} sent`,
            icon: ArrowLeftRight,
            tone: "warning",
            to: "/swap-requests"
        },
        {
            label: "Upcoming sessions",
            value: asNumber(summary.upcomingSessions),
            detail: nextSession
                ? `Next on ${new Date(nextSession.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                : "Nothing scheduled yet",
            icon: CalendarDays,
            tone: "success",
            to: "/sessions"
        },
        {
            label: "Unread messages",
            value: asNumber(summary.unreadMessages),
            detail: asNumber(summary.unreadMessages) > 0
                ? "Waiting in your inbox"
                : "You're all caught up",
            icon: MessageSquare,
            tone: "info",
            to: "/messages"
        },
        {
            label: "Notifications",
            value: asNumber(summary.notifications),
            detail: asNumber(summary.notifications) > 0
                ? "Require your attention"
                : "No new alerts",
            icon: Bell,
            tone: "purple",
            to: "/notifications"
        }
    ];

    const quickActions = [
        { to: "/skills/add", label: "Add a skill", icon: Plus, tone: "purple" },
        { to: "/discover", label: "Discover skills", icon: Compass, tone: "green" },
        { to: "/swap-requests", label: "Manage requests", icon: ArrowLeftRight, tone: "yellow" },
        { to: "/messages", label: "Open messages", icon: MessageSquare, tone: "purple-light" }
    ];

    if (loading && !dashboard) {
        return (
            <div className="dash-page">
                <PageHeader
                    eyebrow="Overview"
                    title={`${getGreeting()}, ${firstName}`}
                    description="Loading your exchange activity."
                />

                <div className="dash-skeleton-stats">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div className="dash-skeleton-stat" key={index}>
                            <Skeleton width="42px" height="42px" className="ui-skeleton-circle" />
                            <div className="dash-skeleton-copy">
                                <Skeleton width="55%" height="10px" />
                                <Skeleton width="35%" height="22px" />
                                <Skeleton width="70%" height="9px" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dash-columns">
                    <div className="dash-column">
                        <SkeletonCard rows={6} />
                        <SkeletonCard rows={4} />
                    </div>
                    <div className="dash-column">
                        <SkeletonCard rows={5} />
                        <SkeletonCard rows={4} />
                    </div>
                </div>
            </div>
        );
    }

    if (error && !dashboard) {
        return (
            <div className="dash-page">
                <PageHeader
                    eyebrow="Overview"
                    title={`${getGreeting()}, ${firstName}`}
                    description="Here is what's happening with your skill exchanges."
                />
                <ErrorState
                    title="We couldn't load your dashboard"
                    message={error}
                    onRetry={() => loadDashboard()}
                />
            </div>
        );
    }

    return (
        <div className="dash-page">
            <PageHeader
                eyebrow="Overview"
                title={`${getGreeting()}, ${firstName}`}
                description="Here is what's happening with your skill exchanges."
                actions={
                    <>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => loadDashboard(true)}
                            disabled={refreshing}
                        >
                            <RefreshCw
                                size={16}
                                className={refreshing ? "dash-spin" : undefined}
                            />
                            {refreshing ? "Refreshing" : "Refresh"}
                        </button>
                        <Link to="/discover" className="btn btn-primary">
                            <Compass size={16} />
                            Discover skills
                        </Link>
                    </>
                }
            />

            {error && (
                <div className="dash-inline-error" role="alert">
                    <span>{error}</span>
                    <button type="button" onClick={() => loadDashboard(true)}>
                        Try again
                    </button>
                </div>
            )}

            <div className="dash-stats">
                {statCards.map(({ label, value, detail, icon: Icon, tone, to }) => (
                    <Link to={to} className={`dash-stat dash-stat--${tone}`} key={label}>
                        <span className="dash-stat-icon" aria-hidden="true">
                            <Icon size={20} />
                        </span>
                        <span className="dash-stat-copy">
                            <span className="dash-stat-label">{label}</span>
                            <strong>{value}</strong>
                            <small>{detail}</small>
                        </span>
                        <ArrowRight className="dash-stat-arrow" size={16} aria-hidden="true" />
                    </Link>
                ))}
            </div>

            <section className="dash-quick" aria-label="Quick actions">
                <div className="dash-quick-copy">
                    <strong>Quick actions</strong>
                    <span>Keep your exchanges moving.</span>
                </div>
                <div className="dash-quick-links">
                    {quickActions.map(({ to, label, icon: Icon, tone }) => (
                        <Link to={to} className={`dash-quick-link dash-quick-link--${tone}`} key={to}>
                            <Icon size={15} />
                            {label}
                        </Link>
                    ))}
                </div>
            </section>

            <div className="dash-columns">
                <div className="dash-column">
                    <section className="dash-card">
                        <div className="dash-card-header">
                            <div>
                                <h2>Exchange request mix</h2>
                                <p>Every swap request by current status.</p>
                            </div>
                            <span className="dash-card-pill">
                                {totalRequests} total
                            </span>
                        </div>

                        {statusTotal === 0 ? (
                            <EmptyState
                                icon={ArrowLeftRight}
                                title="No exchanges yet"
                                description="Your request mix appears once you send or receive a swap request."
                                action={
                                    <Link to="/discover" className="btn btn-primary btn-sm">
                                        Find a skill partner
                                    </Link>
                                }
                                className="dash-empty"
                            />
                        ) : (
                            <div className="dash-mix">
                                <div
                                    className="dash-donut"
                                    style={{ background: chartGradient }}
                                    role="img"
                                    aria-label={`${totalRequests} total swap requests`}
                                >
                                    <div className="dash-donut-center">
                                        <strong>{totalRequests}</strong>
                                        <span>requests</span>
                                    </div>
                                </div>

                                <ul className="dash-legend">
                                    {statusCounts.map((status) => (
                                        <li key={status.key}>
                                            <span
                                                className="dash-legend-dot"
                                                style={{
                                                    background: STATUS_COLORS[status.key]
                                                }}
                                            />
                                            <span className="dash-legend-label">
                                                {status.label}
                                            </span>
                                            <strong>{status.value}</strong>
                                            <span className="dash-legend-share">
                                                {statusTotal > 0
                                                    ? `${Math.round((status.value / statusTotal) * 100)}%`
                                                    : "0%"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    <section className="dash-card">
                        <div className="dash-card-header">
                            <div>
                                <h2>Recent requests</h2>
                                <p>Your latest sent and received exchanges.</p>
                            </div>
                            <Link to="/swap-requests" className="btn-link">
                                View all
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {summary.recentRequests.length === 0 ? (
                            <EmptyState
                                icon={ArrowLeftRight}
                                title="No requests yet"
                                description="When you send or receive a swap request, it will appear here."
                                className="dash-empty"
                            />
                        ) : (
                            <ul className="dash-list">
                                {summary.recentRequests.map((request) => {
                                    const partner = getPartner(request, user?.id);

                                    return (
                                        <li key={request.id}>
                                            <Link to="/swap-requests" className="dash-list-item">
                                                <Avatar
                                                    user={{
                                                        firstName: partner.name,
                                                        photo: partner.photo
                                                    }}
                                                    size="sm"
                                                />

                                                <span className="dash-list-main">
                                                    <span className="dash-list-title">
                                                        <strong>{partner.name || "SkillSwap member"}</strong>
                                                        <StatusBadge
                                                            status={request.swapStatus}
                                                        />
                                                    </span>
                                                    <span className="dash-list-sub">
                                                        {request.skillOfferedName}
                                                        <ArrowLeftRight size={12} />
                                                        {request.skillWantedName}
                                                    </span>
                                                    <span className="dash-list-meta">
                                                        <Clock3 size={12} />
                                                        {formatRelativeTime(request.createdAt)}
                                                        {partner.isSender ? " · Sent" : " · Received"}
                                                    </span>
                                                </span>

                                                <ArrowRight
                                                    className="dash-list-arrow"
                                                    size={15}
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>
                </div>

                <div className="dash-column">
                    <section className="dash-card">
                        <div className="dash-card-header">
                            <div>
                                <h2>Upcoming sessions</h2>
                                <p>Your next scheduled exchanges.</p>
                            </div>
                            <Link to="/sessions" className="btn-link">
                                View all
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {summary.upcomingSessionItems.length === 0 ? (
                            <EmptyState
                                icon={CalendarDays}
                                title="No upcoming sessions"
                                description="Accepted requests can be scheduled as sessions."
                                action={
                                    <Link to="/swap-requests" className="btn btn-secondary btn-sm">
                                        Review requests
                                    </Link>
                                }
                                className="dash-empty"
                            />
                        ) : (
                            <ul className="dash-list">
                                {summary.upcomingSessionItems.map((session) => {
                                    const partner = getSessionPartner(session, user?.id);
                                    const date = formatSessionDate(session.date);
                                    const ModeIcon = session.mode === "ONLINE" ? Video : MapPin;

                                    return (
                                        <li key={session.id}>
                                            <Link
                                                to={`/sessions/${session.id}`}
                                                className="dash-list-item dash-session-item"
                                            >
                                                <span className="dash-date-badge" aria-hidden="true">
                                                    <span>{date.month}</span>
                                                    <strong>{date.day}</strong>
                                                </span>

                                                <span className="dash-list-main">
                                                    <span className="dash-list-title">
                                                        <strong>{partner.name || "SkillSwap member"}</strong>
                                                    </span>
                                                    <span className="dash-list-sub">
                                                        {session.skillOfferedName}
                                                        <ArrowLeftRight size={12} />
                                                        {session.skillWantedName}
                                                    </span>
                                                    <span className="dash-list-meta">
                                                        <Clock3 size={12} />
                                                        {formatTime(session.date)}
                                                        {" · "}
                                                        {session.duration} min
                                                        {" · "}
                                                        <ModeIcon size={12} />
                                                        {session.mode === "ONLINE"
                                                            ? "Online"
                                                            : "In person"}
                                                    </span>
                                                </span>

                                                <StatusBadge status={session.status} />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>

                    <section className="dash-card">
                        <div className="dash-card-header">
                            <div>
                                <h2>Notifications</h2>
                                <p>Updates from your exchanges.</p>
                            </div>
                            <Link to="/notifications" className="btn-link">
                                View all
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {summary.recentNotifications.length === 0 ? (
                            <EmptyState
                                icon={Bell}
                                title="No notifications"
                                description="You will see updates about requests, messages, and sessions here."
                                className="dash-empty"
                            />
                        ) : (
                            <ul className="dash-notification-list">
                                {summary.recentNotifications.map((notification) => (
                                    <li key={notification.id}>
                                        <Link
                                            to={NOTIFICATION_ROUTES[notification.type] || "/notifications"}
                                            className={`dash-notification ${
                                                notification.isRead ? "" : "is-unread"
                                            }`}
                                        >
                                            <span className="dash-notification-icon" aria-hidden="true">
                                                <Bell size={15} />
                                            </span>
                                            <span className="dash-notification-copy">
                                                <span>{notification.message}</span>
                                                <small>
                                                    {formatRelativeTime(notification.createdAt)}
                                                </small>
                                            </span>
                                            {!notification.isRead && (
                                                <span className="dash-unread-dot" aria-label="Unread" />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>

            <section className="dash-tip">
                <span className="dash-tip-icon" aria-hidden="true">
                    <Sparkles size={18} />
                </span>
                <div>
                    <strong>Make your profile stand out</strong>
                    <p>
                        Add a profile photo and keep your offered skills current so
                        the right partners can find you.
                    </p>
                </div>
                <Link to="/profile/edit" className="btn btn-secondary btn-sm">
                    Edit profile
                </Link>
            </section>
        </div>
    );
}

export default UserDashboard;
