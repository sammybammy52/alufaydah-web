import { createContext, useContext, useState, useEffect } from "react";
import CookieService from "encrypted-cookie";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const secretKey = import.meta.env.VITE_CRYPTO_KEY;


  const [user, setUser] = useState(JSON.parse(CookieService.getCookie("user", secretKey) || null));
  const [token, setToken] = useState(CookieService.getCookie("token", secretKey) || null);

  const handleChange = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const handleUser = (user) => {
    setUser(user);
  };

  const logout = () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    CookieService.eraseCookie("user", secretKey);
    CookieService.eraseCookie("token", secretKey);
  };

  const shouldKick = (e) => {
    if (e.response.data.message) {
      if (e.response.data.message == "Unauthenticated.") {
        CookieService.eraseCookie("user", secretKey);
        CookieService.eraseCookie("token", secretKey);
        window.location.href = "/";
      }
    }
  }

  useEffect(() => {
    CookieService.setCookie("user", JSON.stringify(user), 365, secretKey);
    CookieService.setCookie("token", token, 365, secretKey);
  }, [user, token]);

  let contextData = {
    user: user,
    token: token,
    handleChange,
    handleUser,
    logout,
    shouldKick,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
