import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">LiveBid</h1>
          <p className="text-lg text-gray-600">
            A platform for real-time bidding and auctions
          </p>
        </div>
        <div className="space-x-2 m-2">
          <Link
            to="/signup"
            className="text-sm text-center hover:underline cursor-pointer"
          >
            <Button className="cursor-pointer"> Sign up</Button>
          </Link>
          <Link
            to="/login"
            className="text-sm text-center hover:underline cursor-pointer"
          >
            <Button className="cursor-pointer"> Log in</Button>
          </Link>
        </div>
      </div>
      <div>Home</div>
    </div>
  );
}

export default Home;
