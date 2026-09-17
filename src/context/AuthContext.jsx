
import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const logoutTimerRef = useRef(null);

    const clearLogoutTimer = () => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
    };

    const logout = () => {
        clearLogoutTimer();
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const updateUserFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp && decodedToken.exp * 1000 <= Date.now()) {
                logout();
                return;
            }

            setUser({
                id: decodedToken.id,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                email: decodedToken.email,
                city: decodedToken.city,
                photo: decodedToken.photo,
                bio: decodedToken.bio,
                rating: decodedToken.rating,
                createdAt: decodedToken.createdAt,
                role: decodedToken.role
            });

            if (decodedToken.exp) {
                const expiresInMs = decodedToken.exp * 1000 - Date.now();

                clearLogoutTimer();

                logoutTimerRef.current = setTimeout(() => {
                    logout();
                }, expiresInMs);
            }
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            updateUserFromToken(token);
        }

        setLoading(false);

        return () => clearLogoutTimer();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        updateUserFromToken(token);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

