import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/authContext";
import SearchProvider from "./contexts/searchContext";
import AddTests from "./pages/AddTests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/teachers" element={<Home />} />
            <Route path="/add" element={<AddTests />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
