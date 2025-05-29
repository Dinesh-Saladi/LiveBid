import { useParams } from "react-router-dom";
import { useSocketStore } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import OnGoing from "./AuctionPage/OnGoing";
import UpComing from "./AuctionPage/UpComing";
import Ended from "./AuctionPage/Ended";

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
        
      {/* <OnGoing />  */}
      {/* <UpComing /> */}
      <Ended />
      
    </div>
  );
}

export default AuctionPage;
