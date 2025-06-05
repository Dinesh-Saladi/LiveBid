import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Heart } from "lucide-react";
import JoinAuction from "./AllAuctions/JoinAuction";
import AuctionsData from "./AllAuctions/AuctionsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { socket } from "../../../store/useSocketStore";
import BarLoader from "../BarLoader";

function AllAuctions() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    socket.emit("give-data-allauctions");
    const HandleData = (data) => {
      setData(data);
      setLoading(false);
    };
    socket.on("take-data-allauctions", HandleData);
    return () => {
      socket.off("take-data-allauctions", HandleData);
    };
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <div className="p-8 bg-background min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-row justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                All Auctions
              </h2>
              <p className="text-muted-foreground">
                Discover amazing items up for auction
              </p>
            </div>
            <JoinAuction />
          </motion.div>

          <div>
            <Tabs defaultValue="onGoing" className="w-full">
              <TabsList>
                <TabsTrigger value="onGoing">OnGoing</TabsTrigger>
                <TabsTrigger value="upComing">Upcoming</TabsTrigger>
                <TabsTrigger value="ended">Ended</TabsTrigger>
              </TabsList>
              <TabsContent value="onGoing">
                <AuctionsData data={data.ongoing} />
              </TabsContent>
              <TabsContent value="upComing">
                <AuctionsData data={data.upcoming} />
              </TabsContent>
              <TabsContent value="ended">
                <AuctionsData data={data.ended} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllAuctions;
