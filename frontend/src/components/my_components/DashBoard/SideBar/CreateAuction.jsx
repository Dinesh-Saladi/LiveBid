import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSocketStore } from "../../../../store/useSocketStore";
import { useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function CreateAuction(props) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { createAuctionHandle } = useSocketStore();
  const { user } = useAuthStore();
  console.log("user");
  console.log(user);
  console.log(user.id);
  function HandleSubmit() {
    console.log(name + " " + category);
    createAuctionHandle(name, category, user.id);
    setOpen(false);
  }
  return (
    <motion.div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {props.vis ? (
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground">
              <Plus className="w-5 h-5" />
              <span>Create New Auction</span>
            </Link>
          ) : (
            <Link className="flex items-center justify-center p-3 rounded-lg transition-colors group relative hover:bg-accent hover:text-accent-foreground">
              <Plus className="w-5 h-5" />
            </Link>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Auction</DialogTitle>
            <DialogDescription>
              Fill in the auction details below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter Name"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select
                    id="category"
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="automobile">Automobiles</SelectItem>
                      <SelectItem value="art">Art & Sculpture</SelectItem>
                      <SelectItem value="realestate">Real Estate</SelectItem>
                      <SelectItem value="collectibles">Collectibles</SelectItem>
                      <SelectItem value="luxury">
                        Jewelry & Luxury Items
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default CreateAuction;
