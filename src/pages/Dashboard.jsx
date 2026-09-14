import UserDashboard from "../components/dashboard/UserDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

function Dashboard() {
    const role = localStorage.getItem("role");

    return (
        <>
            {role === "ADMIN" ? (
                <AdminDashboard />
            ) : (
                <UserDashboard />
            )}
            
        </>
    );
}

export default Dashboard;