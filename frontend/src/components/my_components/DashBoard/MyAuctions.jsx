import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Eye, Edit, Clock, Users } from "lucide-react";
import CreateAuction from "./MyAuctions/CreateAuction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuctionsData from "./MyAuctions/AuctionsData";
import { socket } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";
import BarLoader from "../BarLoader";

function MyAuctions() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  useEffect(() => {
    socket.emit("give-data-myauctions", user.id);
    const HandleData = (data) => {
      setData(data);
      setLoading(false);
    };
    socket.on("take-data-myauctions", HandleData);
    return () => {
      socket.off("take-data-myauctions", HandleData);
    };
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <div className="p-6 md:p-8 bg-background min-h-screen">
          <div className="flex flex-row justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-foreground mb-2">
                My Auctions
              </h2>
              <p className="text-muted-foreground">
                Manage your active and completed auctions
              </p>
            </motion.div>
            <CreateAuction />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
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
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default MyAuctions;
