import { useParams } from "react-router-dom";
import { useSocketStore, socket } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import OnGoing from "./AuctionPage/OnGoing";
import UpComing from "./AuctionPage/UpComing";
import Ended from "./AuctionPage/Ended";
import { useState } from "react";
import BarLoader from "../BarLoader";

function AuctionPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const { joinAuctionHandle, joinedAuction, startAuction } = useSocketStore();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!user) {
      navigate("/login");
    }
    joinAuctionHandle(auctionId, () => {
      navigate("/");
    });
    socket.emit("get-rooms");
  }, [auctionId]);

  useEffect(() => {
    const HandleChangeStatus = (status) => {
      console.log("status changed");
      console.log(status);
      setLoading(false);
      setStatus(status);
    };

    socket.on("current-status", HandleChangeStatus);

    return () => {
      socket.off("current-status", HandleChangeStatus);
    };
  }, [auctionId]);

  if (!user || !joinedAuction || loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );

  return (
    <div className="p-6 md:p-8 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold text-foreground mb-2">
          Welcome to the {joinedAuction.auction_name} Auction!
        </h2>
        <p className="text-muted-foreground text-lg">
          Place your bids and own the finest{" "}
          {joinedAuction.auction_category === "other"
            ? "items"
            : joinedAuction.auction_category}
          .
        </p>
      </motion.div>

      {status === "onGoing" && <OnGoing />}
      {status === "upComing" && (
        <UpComing
          onStart={() => {
            setStatus("onGoing");
            startAuction(auctionId);
          }}
        />
      )}
      {status === "ended" && <Ended />}
    </div>
  );
}

export default AuctionPage;
