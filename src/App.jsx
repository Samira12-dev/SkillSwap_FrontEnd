
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";

import LayoutPublic from "./layouts/LayoutPublic";
import LayoutPrivate from "./layouts/LayoutPrivate";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public routes */}
                <Route element={<LayoutPublic />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>


                {/* Private routes */}
                <Route element={<ProtectedRoute />}>

                    <Route element={<LayoutPrivate />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/edit" element={<EditProfile />} />
                        <Route path="/skills" element={<MySkills />} />
                        <Route path="/discover" element={<DiscoverSkills />} />
                        <Route path="/swap-requests" element={<SwapRequests />} />
                        <Route path="/sessions" element={<Sessions />} />
                        <Route
                            path="/sessions/:sessionId"
                            element={<SessionDetails />}
                        />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/notifications" element={<Notifications />} />
                    </Route>

                </Route>


                {/* Access denied */}
                <Route
                    path="/access-denied"
                    element={<h2>Access Denied</h2>}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
