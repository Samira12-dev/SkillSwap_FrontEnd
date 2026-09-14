function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Overview of the SkillSwap platform.</p>

            <div className="dashboard-stats">
                <div className="dashboard-card">
                    <span>Total Users</span>
                    <strong>0</strong>
                </div>

                <div className="dashboard-card">
                    <span>Total Skills</span>
                    <strong>0</strong>
                </div>

                <div className="dashboard-card">
                    <span>Total Swap Requests</span>
                    <strong>0</strong>
                </div>

                <div className="dashboard-card">
                    <span>Active Sessions</span>
                    <strong>0</strong>
                </div>

                <div className="dashboard-card">
                    <span>Completed Sessions</span>
                    <strong>0</strong>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;