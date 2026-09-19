import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        try {
            const decodedToken = jwtDecode(token);

            if (
                decodedToken.exp &&
                decodedToken.exp * 1000 <= Date.now()
            ) {
                localStorage.removeItem("token");
                return null;
            }

            return {
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
            };
        } catch (error) {
            localStorage.removeItem("token");
            return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);

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
        setUnreadMessages(0);
        navigate("/login");
    };

    const updateUserFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);

            if (
                decodedToken.exp &&
                decodedToken.exp * 1000 <= Date.now()
            ) {
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
                const expiresInMs =
                    decodedToken.exp * 1000 - Date.now();

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

        return () => clearLogoutTimer();
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        updateUserFromToken(token);
    };

    const updateUser = (updatedFields) => {
        setUser((prev) => ({ ...prev, ...updatedFields }));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateUser,
                loading,
                unreadMessages,
                setUnreadMessages
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};