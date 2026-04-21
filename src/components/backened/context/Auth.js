import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userinfo");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (data) => {
    localStorage.setItem("userinfo", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("userinfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};