import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function DashBoardHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to LiveBid</h2>
      <p className="mb-6">Your auction dashboard overview.</p>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold">Ongoing Auctions</h3>
            <p className="text-2xl">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold">Bids Placed</h3>
            <p className="text-2xl">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold">Items Won</h3>
            <p className="text-2xl">2</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashBoardHome;
