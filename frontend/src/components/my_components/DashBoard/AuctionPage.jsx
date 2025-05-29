import React from "react";
import { useParams } from "react-router-dom";
import { useSocketStore } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timer from "./AuctionPage/Timer";
import { Button } from "@/components/ui/button";

const item = {
  name: "Keyboard",
  image:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Description:
    "Responsive keys for fast, accurate typing\nSleek, durable design\nCustomizable RGB backlighting\nPlug & play with USB or Bluetooth connectivity",
  seller: "Dinesh",
  email: "dineshsaladi79@gmail.com"
};

const currentbid = {
  bid: "1000$",
  name: "Dinesh",
  email: "dineshsaladi79@gmail.com",
};

function AuctionPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const { joinAuctionHandle, joinedAuction } = useSocketStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    joinAuctionHandle(auctionId, () => {
      navigate("/");
    });
  }, [user, navigate, auctionId]);

  if (!user || !joinedAuction) return null;

  return (
    <div className="p-8 bg-background min-h-screen">
      <motion.div>
        <h2 className="text-4xl font-bold text-foreground mb-2">
          Welcome to the {joinedAuction.name} Auction!
        </h2>
        <p className="text-muted-foreground text-lg">
          Place your bids and own the finest{" "}
          {joinedAuction.category === "other"
            ? "items"
            : joinedAuction.category}
          .
        </p>
      </motion.div>

      {/* laptops and tabs */}
      <div className="hidden md:grid grid-cols-4 grid-rows-5 gap-4 m-5">
        {/* Left Column: Item Details */}
        <div className="col-start-1 col-span-2 row-start-1 row-span-5">
          <Card className="hover:shadow-lg transition-all duration-300 border border-border h-full">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">
                    Name: {item.name}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Description:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      {item.Description.split("\n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Current Bid, Button, and Timer */}
        <div className="col-start-3 col-span-2 row-start-1 row-span-5 flex flex-col space-y-4">
          {/* Current Bid Card */}
          <Card className="w-full hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Current Bid: {currentbid.bid}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Name: {currentbid.name}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Email: {currentbid.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button and Timer Row */}
          <div className="flex items-center">
            <Button className="flex-1">Place Bid</Button>
            <div className="flex justify-center items-center">
              <Timer />
            </div>
          </div>
          <Card className="w-full hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Seller Details
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Name: {item.seller}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Email: {item.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AuctionPage;
