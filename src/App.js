import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  }
  
  return (
    <AuthContext.Provider value={{ token, setAndPersistToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/sign-up" element={<SignUp />}/>
          <Route path="" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
