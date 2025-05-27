import { create } from "zustand";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io(import.meta.env.VITE_BACKEND_API);

export const useSocketStore = create((set, get) => ({
  joinedAuction: null,
  createAuctionHandle: (name, category) => {
    socket.emit("create-auction", name, category);

    socket.once("auction-created", (newId) => {
      console.log("From Frontend Auction Created with id : " + newId);
    });
  },
  joinAuctionHandle: (auctionId, onSuccess) => {
    socket.emit("join-auction", auctionId);

    socket.once("joined-auction", (auctionDetails) => {
      console.log("Joined the " + auctionDetails.name + " Auction");
      set({joinedAuction: auctionDetails});
      onSuccess();
    })

    socket.once("invalid-auctionId", () => {
      console.log("Invalid Auction Id");
    })
  }
}));
