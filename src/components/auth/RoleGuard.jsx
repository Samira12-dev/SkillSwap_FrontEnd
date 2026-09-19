
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function RoleGuard({ roles, children }) {
    console.log("ROLE GUARD WORKING");
    const { user } = useContext(AuthContext);

    console.log("USER:", user);
    console.log("ROLE:", user?.role);
    console.log("ALLOWED:", roles);

    if (!roles.includes(user?.role)) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
}

export default RoleGuard;

