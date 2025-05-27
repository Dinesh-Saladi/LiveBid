import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_API);

export const useSocketStore = create((set, get) => ({
  createAuctionHandle: (name, category) => {
    socket.emit("create-auction", name, category);

    socket.once("auction-created", (newId) => {
      console.log("From Frontend Auction Created with id : " + newId);
    });
  },
}));
