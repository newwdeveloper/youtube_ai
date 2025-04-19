import { createContext, useContext, useEffect, useState } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Auth Provider component
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 3. Login function — used by both login and signup
  const login = (username, token) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    setUsername(username);
    setToken(token);
  };

  // 4. Logout function
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    setToken(null);
  };

  // 5. Check if user is already logged in on first render
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    }
  }, []);

  // 6. Provide the auth context value
  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 7. Export a hook to use the AuthContext easily
export const useAuth = () => useContext(AuthContext);
