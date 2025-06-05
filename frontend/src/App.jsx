import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import axios from "axios";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "./pages/NotFound";
import BarLoader from "./components/my_components/BarLoader";

axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

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
  if (loading) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <BarLoader />
      </div>
    );
  }
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
