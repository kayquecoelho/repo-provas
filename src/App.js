import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import AddTests from "./pages/AddTests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const localToken = JSON.parse(localStorage.getItem("token"));
  const [token, setToken] = useState(localToken);

  function setAndPersistToken(token) {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  }
  
  return (
    <AuthContext.Provider value={{ token, setAndPersistToken }}>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/sign-up" element={<SignUp />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/teachers" element={<Home />}/>
          <Route path="/add" element={<AddTests />}/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
