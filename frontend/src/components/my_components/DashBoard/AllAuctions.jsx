import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Heart } from "lucide-react";

function AllAuctions() {
  const auctions = [
    {
      id: 1,
      title: "Abstract Painting",
      currentBid: 2000,
      endTime: "3h",
      image: "🎨",
      bids: 8,
      isHot: true,
    },
    {
      id: 2,
      title: "Vintage Watch",
      currentBid: 1500,
      endTime: "1d 5h",
      image: "⌚",
      bids: 12,
      isHot: false,
    },
    {
      id: 3,
      title: "Antique Vase",
      currentBid: 3200,
      endTime: "2h 15m",
      image: "🏺",
      bids: 15,
      isHot: true,
    },
    {
      id: 4,
      title: "Rare Book Collection",
      currentBid: 850,
      endTime: "6h 30m",
      image: "📚",
      bids: 5,
      isHot: false,
    },
    {
      id: 5,
      title: "Diamond Ring",
      currentBid: 5500,
      endTime: "45m",
      image: "💍",
      bids: 23,
      isHot: true,
    },
    {
      id: 6,
      title: "Sculpture",
      currentBid: 1200,
      endTime: "8h",
      image: "🗿",
      bids: 7,
      isHot: false,
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
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
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
        <h2 className="text-3xl font-bold text-foreground mb-2">All Auctions</h2>
        <p className="text-muted-foreground">Discover amazing items up for auction</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {auctions.map((auction, index) => (
          <motion.div key={auction.id} variants={itemVariants}>
            <Card className="hover:shadow-xl transition-all duration-300 border-border group cursor-pointer hover:border-primary/50">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="h-48 bg-secondary flex items-center justify-center text-6xl rounded-t-lg">
                    {auction.image}
                  </div>
                  {auction.isHot && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 left-3 bg-background/80 hover:bg-background"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {auction.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Bid</span>
                      <span className="text-xl font-bold text-foreground">
                        ₹{auction.currentBid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Ends in {auction.endTime}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {auction.bids} bids
                      </span>
                    </div>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Place Bid
                    </Button>
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

export default AllAuctions;