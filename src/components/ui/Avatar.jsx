import { useState } from "react";
import { getDisplayName, getInitials } from "../../utils/format";

export default function Avatar({ user, name, size = "md", className = "" }) {
    const [imageFailed, setImageFailed] = useState(false);
    const displayName = name || getDisplayName(user);
    const initials = getInitials(user?.firstName, user?.lastName);
    const classes = `ui-avatar ui-avatar--${size} ${className}`.trim();

    if (user?.photo && !imageFailed) {
        return (
            <img
                src={user.photo}
                alt={`${displayName}'s profile`}
                className={`${classes} ui-avatar--image`}
                onError={() => setImageFailed(true)}
            />
        );
    }

    return (
        <span className={classes} aria-label={displayName} title={displayName}>
            <span>{initials}</span>
        </span>
    );
}
