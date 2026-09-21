
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";

import LayoutPublic from "./layouts/LayoutPublic";
import LayoutPrivate from "./layouts/LayoutPrivate";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleGuard from "./components/auth/RoleGuard";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import MySkills from "./pages/MySkills";
import DiscoverSkills from "./pages/DiscoverSkills";
import SwapRequests from "./pages/SwapRequests";
import Sessions from "./pages/Sessions";
import SessionDetails from "./components/sessions/SessionDetails";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import AddSkill from "./components/skills/AddSkill";
import UserProfile from "./pages/UserProfile";

import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

import AdminSkills from "./components/Admin pages/AdminSkills";
import AdminSessions from "./components/Admin pages/AdminSessions";
import AdminSwapRequests from "./components/Admin pages/AdminSwapRequests";
import AdminNotifications from "./components/Admin pages/AdminNotifications";
import AdminUsers from "./components/Admin pages/AdminUsers";
import AdminDashboard from "./components/dashboard/AdminDashboard";

function App() {
    return (
        <Routes>

            <Route element={<LayoutPublic />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<ProtectedRoute />}>

                <Route
                    element={
                        <RoleGuard roles={["USER"]}>
                            <LayoutPrivate />
                        </RoleGuard>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/skills" element={<MySkills />} />
                    <Route path="/discover" element={<DiscoverSkills />} />
                    <Route path="/swap-requests" element={<SwapRequests />} />
                    <Route path="/sessions" element={<Sessions />} />
                    <Route path="/sessions/:sessionId" element={<SessionDetails />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:conversationId" element={<Messages />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/skills/add" element={<AddSkill />} />
                    <Route path="/profile/:userId" element={<UserProfile />} />
                </Route>

                <Route
                    element={
                        <RoleGuard roles={["ADMIN"]}>
                            <LayoutPrivate />
                        </RoleGuard>
                    }
                >
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/profile" element={<Profile />} />
                    <Route path="/admin/profile/edit" element={<EditProfile />} />
                    <Route path="/admin/skills" element={<AdminSkills />} />
                    <Route path="/admin/swap-requests" element={<AdminSwapRequests />} />
                    <Route path="/admin/sessions" element={<AdminSessions />} />
                    <Route path="/admin/notifications" element={<AdminNotifications />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/profile/:userId" element={<UserProfile />} />
                </Route>

            </Route>

        </Routes>
    );
}

export default App;

