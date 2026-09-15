import { getUser } from "../../services/authService";

import { Navigate } from "react-router-dom";

export default function RoleGuard({ roles, children }) {
    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(user.role)) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
}

