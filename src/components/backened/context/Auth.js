import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const storedUser = localStorage.getItem("Userinfo");

    const [user, setUser] = useState(
        storedUser ? JSON.parse(storedUser) : null
    );

    const login = (userData) => {
        localStorage.setItem("Userinfo", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("Userinfo");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};