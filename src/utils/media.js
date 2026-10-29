const configuredApiUrl = (import.meta.env.VITE_API_URL || "").trim();

export const resolveMediaUrl = (path) => {
    if (!path) return "";

    if (/^(https?:|data:|blob:)/i.test(path)) {
        return path;
    }

    if (path.startsWith("/uploads/") && configuredApiUrl) {
        try {
            return `${new URL(configuredApiUrl).origin}${path}`;
        } catch {
            return path;
        }
    }

    return path;
};
