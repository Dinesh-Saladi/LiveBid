import React from "react";
import { useParams } from "react-router-dom";
import { useSocketStore } from "../store/useSocketStore";
function AuctionPage() {
  const { auctionId } = useParams();
  const { joinedAuction } = useSocketStore();
  return (
    <div className="flex flex-col items-center justify-around">
      <div className="flex flex-col items-center">
        <h1>Welcome to {joinedAuction.name} Auction</h1>
        <p>Category: {joinedAuction.category}</p>
      </div>
      <div>AuctionPage with id: {auctionId}</div>
    </div>
  );
}

export default AuctionPage;
