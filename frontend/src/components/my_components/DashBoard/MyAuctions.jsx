import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Eye, Edit, Clock, Users } from "lucide-react";
import CreateAuction from "./MyAuctions/CreateAuction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuctionsData from "./MyAuctions/AuctionsData";

function MyAuctions() {
  return (
    <div className="p-8 bg-background min-h-screen">
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
      <div>
        <Tabs defaultValue="onGoing" className="w-full">
          <TabsList>
            <TabsTrigger value="onGoing">OnGoing</TabsTrigger>
            <TabsTrigger value="upComing">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
          </TabsList>
          <TabsContent value="onGoing">
            <AuctionsData />
          </TabsContent>
          <TabsContent value="upComing">
            <AuctionsData />
          </TabsContent>
          <TabsContent value="ended">
            <AuctionsData />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyAuctions;
