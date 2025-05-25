import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Eye, Edit, Clock, Users } from "lucide-react";

function MyAuctions() {
  const auctions = [
    {
      id: 1,
      item: "Smartwatch",
      status: "Live",
      bids: 5,
      endTime: "2h 10m",
      currentBid: "₹1,200",
      statusColor: "bg-primary text-primary-foreground",
    },
    {
      id: 2,
      item: "Vintage Camera",
      status: "Ended",
      bids: 12,
      endTime: "Ended",
      currentBid: "₹3,500",
      statusColor: "bg-secondary text-secondary-foreground",
    },
    {
      id: 3,
      item: "Gaming Headset",
      status: "Live",
      bids: 8,
      endTime: "4h 32m",
      currentBid: "₹850",
      statusColor: "bg-primary text-primary-foreground",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">My Auctions</h2>
        <p className="text-muted-foreground">Manage your active and completed auctions</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {auctions.map((auction, index) => (
          <motion.div key={auction.id} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-secondary-foreground font-semibold text-sm">
                        {auction.item.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {auction.item}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className={auction.statusColor}>
                          {auction.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {auction.bids} bids
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {auction.endTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">
                      {auction.currentBid}
                    </p>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default MyAuctions;