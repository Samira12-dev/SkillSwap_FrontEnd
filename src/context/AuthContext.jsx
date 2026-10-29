import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../services/userService";

export const AuthContext = createContext();

const getUserFromToken = (decodedToken) => ({
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

            return getUserFromToken(decodedToken);
        } catch {
            localStorage.removeItem("token");
            return null;
        }
    });

    const [unreadMessages, setUnreadMessages] = useState(0);

    const navigate = useNavigate();
    const logoutTimerRef = useRef(null);

    const clearLogoutTimer = useCallback(() => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
    }, []);

    const logout = useCallback(() => {
        clearLogoutTimer();
        localStorage.removeItem("token");
        setUser(null);
        setUnreadMessages(0);
        navigate("/login");
    }, [clearLogoutTimer, navigate]);

    const updateUserFromToken = useCallback((token) => {
        try {
            const decodedToken = jwtDecode(token);

            if (
                decodedToken.exp &&
                decodedToken.exp * 1000 <= Date.now()
            ) {
                logout();
                return null;
            }

            setUser(getUserFromToken(decodedToken));

            if (decodedToken.exp) {
                const expiresInMs =
                    decodedToken.exp * 1000 - Date.now();

                clearLogoutTimer();

                logoutTimerRef.current = setTimeout(() => {
                    logout();
                }, expiresInMs);
            }

            return decodedToken;
        } catch {
            localStorage.removeItem("token");
            setUser(null);
            return null;
        }
    }, [clearLogoutTimer, logout]);

    const refreshUser = useCallback(async (userId) => {
        if (!userId) return null;

        const profile = await getUserById(userId);

        setUser((previous) =>
            previous ? { ...previous, ...profile } : previous
        );

        return profile;
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = updateUserFromToken(token);

            if (decodedToken?.id) {
                refreshUser(decodedToken.id).catch(() => {});
            }
        }

        return () => clearLogoutTimer();
    }, [clearLogoutTimer, refreshUser, updateUserFromToken]);

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
                refreshUser,
                unreadMessages,
                setUnreadMessages
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
