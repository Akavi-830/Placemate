import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);

      return;
    }
    try {
      const response = await api.get("/auth/verify-token");
      setUser(response.data.user);
    } catch {
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
