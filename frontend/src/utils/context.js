import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await fetch('https://mini-crm-hnpl.onrender.com/auth/check-auth', {
                credentials: 'include',
            });
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
            setUser(data.user);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
