import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const localToken = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(localToken);

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  }

  function logout(){
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, setAndPersistToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
