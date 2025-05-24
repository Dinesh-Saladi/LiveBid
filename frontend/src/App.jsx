import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import axios from "axios";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API;

function App() {
  const { setUser, loading } = useAuthStore();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/me`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);
  if (loading) return null;
  return (
    // <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    // </ThemeProvider>
  );
}

export default App;
