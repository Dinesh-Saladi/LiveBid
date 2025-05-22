import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

function DashBoard() {
  const { user, loading, logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  if (!user) return null;
  console.log(user);
  return (
    <div>
      <Toaster />
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">LiveBid</h1>
          <p className="text-lg text-gray-600">DashBoard</p>
        </div>
        <div className="m-2">
          <Button
            onClick={async () => {
              const logoutPromise = logout();
              toast.promise(logoutPromise, {
                success: (data) => data.message,
                error: (err) => err.message || "Logout failed",
              });
              try {
                await logoutPromise;
                navigate("/login");
              } catch (err) {
                // error already shown by toast
              }
            }}
            className="cursor-pointer"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
