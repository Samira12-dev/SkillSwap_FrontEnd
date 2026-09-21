
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function RoleGuard({ roles, children }) {
    const { user } = useContext(AuthContext);

    console.log("USER:", user);
    console.log("USER ROLE:", user?.role);
    console.log("ALLOWED ROLES:", roles);

    if (!roles.includes(user?.role)) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
}

export default RoleGuard;