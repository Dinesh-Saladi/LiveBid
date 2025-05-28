import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSocketStore } from "../../../../store/useSocketStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinAuction() {
  const [auctionId, setAuctionId] = useState("");
  const [open, setOpen] = useState(false);
  const { isThereAuctionHandle } = useSocketStore();
  const navigate = useNavigate();
  function HandleSubmit() {
    isThereAuctionHandle(auctionId, () => {
      console.log("success");
      setOpen(false);
      navigate(`/dashboard/auction/${auctionId}`);
    });
  }
  return (
    <motion.div className="m-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Join Auction</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Auction</DialogTitle>
            <DialogDescription>Enter the Auction Id to join.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted");
              HandleSubmit();
              console.log("completed");
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="auctionId" className="text-right">
                  AuctionId
                </Label>
                <Input
                  id="auctionId"
                  placeholder="Enter Auction Id"
                  className="col-span-3"
                  value={auctionId}
                  onChange={(e) => setAuctionId(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Join</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default JoinAuction;
