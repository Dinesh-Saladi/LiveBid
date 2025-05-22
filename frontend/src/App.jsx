import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import axios from "axios";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
axios.defaults.withCredentials = true

const BASE_URL = "http://localhost:5000/api";

function App() {
  const { setUser, loading } = useAuthStore();
  useEffect(() => {
    axios.get(`${BASE_URL}/auth/me`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);
  if (loading) return null;
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
