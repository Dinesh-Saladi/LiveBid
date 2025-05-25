import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function AllAuctions() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Auctions</h2>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold">Painting</h3>
            <p>Current Bid: ₹2000</p>
            <p>Ends in: 3h</p>
            <Button className="mt-2 w-full">Place Bid</Button>
          </CardContent>
        </Card>
        {/* Repeat for more items */}
      </div>
    </div>
  );
}

export default AllAuctions;
