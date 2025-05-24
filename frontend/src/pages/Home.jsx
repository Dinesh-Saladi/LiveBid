import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/my_components/HomePage/NavBar";
import Hero from "../components/my_components/HomePage/Hero";
import Features from "../components/my_components/HomePage/Features";
import Cta from "../components/my_components/HomePage/Cta";
import Footer from "../components/my_components/HomePage/Footer";
import { motion } from "framer-motion";

function Home() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
