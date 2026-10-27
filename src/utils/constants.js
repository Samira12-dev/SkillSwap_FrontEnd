export const SKILL_LEVELS = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" }
];

export const SKILL_TYPES = [
    { value: "OFFER", label: "I can offer" },
    { value: "WANTED", label: "I want to learn" }
];

export const SESSION_MODES = [
    { value: "ONLINE", label: "Online" },
    { value: "PRESENTIEL", label: "In person" }
];

export const SWAP_STATUS_TONES = {
    PENDING: "warning",
    ACCEPTED: "success",
    REJECTED: "danger",
    COMPLETED: "info",
    CANCELLED: "neutral"
};

export const SESSION_STATUS_TONES = {
    PROPOSED: "warning",
    CONFIRMED: "success",
    COMPLETED: "info",
    CANCELLED: "neutral"
};

export const NOTIFICATION_ROUTES = {
    NEW_SWAP_REQUEST: "/swap-requests",
    REQUEST_ACCEPTED: "/swap-requests",
    REQUEST_REJECTED: "/swap-requests",
    NEW_MESSAGE: "/messages",
    SESSION_REMINDER: "/sessions",
    SESSION_PROPOSED: "/sessions",
    SESSION_CONFIRMED: "/sessions",
    SESSION_CANCELLED: "/sessions",
    SESSION_COMPLETED: "/sessions",
    NEW_REVIEW: "/sessions"
};
