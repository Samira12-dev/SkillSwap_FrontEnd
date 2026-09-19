import { useContext } from "react";
import UserDashboard from "../components/dashboard/UserDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <>
            {user?.role === "ADMIN" ? (
                <AdminDashboard />
            ) : (
                <UserDashboard />
            )}
        </>
    );
}

export default Dashboard;
