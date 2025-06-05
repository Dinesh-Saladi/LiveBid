import { create } from "zustand";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export const socket = io(import.meta.env.VITE_BACKEND_API);

export const useSocketStore = create((set, get) => ({
  joinedAuction: null,
  createAuctionHandle: (name, category, user_id) => {
    socket.emit("create-auction", name, category, user_id);

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
      set({ joinedAuction: auctionDetails });
      console.log(get().joinedAuction);
    });

    socket.once("invalid-auctionId", () => {
      console.log("Invalid Auction Id");
      onFail();
    });
  },
  startAuction: (auctionId) => {
    socket.emit("start-auction", auctionId);

    socket.once("cannot-start", () => {
      console.log("There should be atleast 1 item to start");
    });
  },
  getCurrentItem: (auctionId, setCurrent) => {
    socket.once("current", (value) => {
      setCurrent(value);
    });
  },
  addItemHandle: (
    name,
    description,
    userId,
    auctionId,
    basePrice,
    imageUrl
  ) => {
    socket.emit(
      "add-item",
      name,
      description,
      userId,
      auctionId,
      basePrice,
      imageUrl
    );

    socket.once("added", () => {
      console.log("item added succesfully");
    });

    socket.once("not-added", (e) => {
      console.log("error");
    });
  },
  getItems: (setItems, auctionId) => {
    socket.emit("get-items", auctionId);

    socket.once("here-take-items", (items) => {
      console.log(items);
      setItems(items);
    });

    socket.once("error-getting-items", (e) => {
      console.log(e);
    });
  },
}));
