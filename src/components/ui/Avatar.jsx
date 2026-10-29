import { useState } from "react";
import { getDisplayName, getInitials, getInitialsFromName } from "../../utils/format";
import { resolveMediaUrl } from "../../utils/media";

export default function Avatar({ user, name, size = "md", className = "" }) {
    const [imageFailed, setImageFailed] = useState(false);
    const displayName = name || getDisplayName(user);
    const initials = user?.firstName
        ? getInitials(user.firstName, user.lastName)
        : getInitialsFromName(displayName);
    const photo = resolveMediaUrl(user?.photo);
    const classes = `ui-avatar ui-avatar--${size} ${className}`.trim();

    if (photo && !imageFailed) {
        return (
            <img
                src={photo}
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
