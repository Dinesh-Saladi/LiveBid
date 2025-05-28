import React from "react";
import { useParams } from "react-router-dom";
import { useSocketStore } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const item = {
  name: "Keyboard",
  image:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  seller: "Dinesh",
  Description:
    "Responsive keys for fast, accurate typing\nSleek, durable design\nCustomizable RGB backlighting\nPlug & play with USB or Bluetooth connectivity",
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
      <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-4">
        <div className="col-span-2 row-span-3 p-4">
          <Card className="hover:shadow-lg transition-all duration-300 border border-border">
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
                  <p className="text-lg text-muted-foreground">
                    Seller: {item.seller}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 row-span-1 p-4">
          <Card className="hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">
                    Current Bid: {currentbid.bid}
                  </p>
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
        </div>
      </div>
    </div>
  );
}

export default AuctionPage;
