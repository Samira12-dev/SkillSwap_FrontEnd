export const getInitials = (firstName, lastName) => {
    const first = (firstName || "").trim().charAt(0);
    const last = (lastName || "").trim().charAt(0);

    return `${first}${last}`.toUpperCase() || "?";
};

export const getInitialsFromName = (name) => {
    const parts = (name || "").trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

export const getDisplayName = (user) => {
    if (!user) return "Unknown user";

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    return name || user.email || "Unknown user";
};

export const formatDate = (value, fallback = "—") => {
    if (!value) return fallback;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return fallback;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

export const formatDateTime = (value, fallback = "—") => {
    if (!value) return fallback;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return fallback;

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export const formatTime = (value, fallback = "—") => {
    if (!value) return fallback;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return fallback;

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
};

export const formatRelativeTime = (value, fallback = "") => {
    if (!value) return fallback;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return fallback;

    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const ranges = [
        ["year", 60 * 60 * 24 * 365],
        ["month", 60 * 60 * 24 * 30],
        ["day", 60 * 60 * 24],
        ["hour", 60 * 60],
        ["minute", 60]
    ];

    for (const [unit, secondsInUnit] of ranges) {
        if (Math.abs(seconds) >= secondsInUnit) {
            return formatter.format(
                Math.round(seconds / secondsInUnit),
                unit
            );
        }
    }

    return formatter.format(seconds, "second");
};

export const normalizePage = (data) => {
    if (Array.isArray(data)) {
        return {
            content: data,
            totalPages: 1,
            totalElements: data.length,
            page: 0,
            size: data.length
        };
    }

    return {
        content: Array.isArray(data?.content) ? data.content : [],
        totalPages: Number(data?.totalPages) || 0,
        totalElements: Number(data?.totalElements) || 0,
        page: Number(data?.number) || 0,
        size: Number(data?.size) || 0
    };
};

export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
    if (!error) return fallback;

    const response = error.response;
    const data = response?.data;

    if (typeof data === "string" && data.trim()) {
        return data;
    }

    if (data && typeof data === "object") {
        if (typeof data.message === "string" && data.message.trim()) {
            return data.message;
        }

        if (typeof data.error === "string" && data.error.trim()) {
            return data.error;
        }
    }

    if (error.code === "ERR_NETWORK") {
        return "Cannot reach the SkillSwap server. Check that the backend is running.";
    }

    if (response?.status === 401) {
        return "Your session is no longer valid. Please sign in again.";
    }

    if (response?.status === 403) {
        return "You do not have permission to perform this action.";
    }

    if (response?.status === 404) {
        return "The requested resource could not be found.";
    }

    if (response?.status === 409) {
        return "This action conflicts with existing data. Refresh and try again.";
    }

    if (response?.status >= 500) {
        return "The server encountered an error. Please try again shortly.";
    }

    if (error.message) {
        return error.message;
    }

    return fallback;
};

export const formatSkillLevel = (level) => {
    if (!level) return "Not specified";

    return level
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const sortByDateDesc = (items, key = "createdAt") =>
    [...(items || [])].sort((a, b) => {
        const first = a?.[key] ? new Date(a[key]).getTime() : 0;
        const second = b?.[key] ? new Date(b[key]).getTime() : 0;

        return second - first;
    });
