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
  isThereAuctionHandle: (auctionId, onSuccess) => {
    socket.emit("is-there-auction", auctionId);

    socket.once("yes-it-is-there", () => {
      console.log("yes is there from frontend....");
      onSuccess();
    });

    socket.once("no-its-not", () => {
      console.log("Invalid Auction Id");
    });
  },
  joinAuctionHandle: (auctionId, onFail) => {
    socket.emit("join-auction", auctionId);

    socket.once("joined-auction", (auctionDetails) => {
      console.log("Joined the " + auctionDetails.name + " Auction");
      set({joinedAuction: auctionDetails});
      console.log(get().joinedAuction);
    });

    socket.once("invalid-auctionId", () => {
      console.log("Invalid Auction Id");
      onFail();
    });
  },
  startAuction: (auctionId) => {
    socket.emit("start-auction", auctionId);
  },
  getCurrentItem: (auctionId, setCurrent) => {
    socket.once("current", (value) => {
      setCurrent(value);
    });
  },
  getStatus: (setStatus) => {
    socket.once("current-status", (status) => {
      setStatus(status);
    });
  }
}));
