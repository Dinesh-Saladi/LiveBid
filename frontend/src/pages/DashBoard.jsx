import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Sidebar from "@/components/my_components/DashBoard/Sidebar";
import { Routes, Route } from "react-router-dom";
import DashBoardHome from "../components/my_components/DashBoard/DashBoardHome";
import MyAuctions from "../components/my_components/DashBoard/MyAuctions";
import AllAuctions from "../components/my_components/DashBoard/AllAuctions";
import Activity from "../components/my_components/DashBoard/Activity";
import Account from "../components/my_components/DashBoard/Account";

// Placeholder components for different sections

function DashBoard() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <Toaster />
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashBoardHome />} />
          <Route path="/my-auctions" element={<MyAuctions />} />
          <Route path="/auctions" element={<AllAuctions />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </div>
  );
}

export default DashBoard;
