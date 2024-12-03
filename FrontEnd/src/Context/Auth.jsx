import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || false);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => AuthContext;

export function AuthUserNotToken({ children }) {
  const { token } = useContext(useAuth());
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get("http://localhost:8000/api/city", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      } catch (error) {
        if (error.response.data.message == "Unauthenticated.") {
          setMessage(error.response.data.message);
        }
      }
    }
    fetch();
  }, []);

  if (token == undefined || !token || message == "Unauthenticated.") {
    return <Navigate to={"/"} />;
  }

  return children;
}
