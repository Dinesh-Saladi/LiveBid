import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Gavel, Trophy, Activity } from "lucide-react";

function DashBoardHome() {
  const stats = [
    {
      title: "Ongoing Auctions",
      value: "4",
      icon: <Gavel className="w-6 h-6" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Bids Placed",
      value: "12",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-secondary-foreground",
      bgColor: "bg-secondary/50",
    },
    {
      title: "Items Won",
      value: "2",
      icon: <Trophy className="w-6 h-6" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
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
        <h2 className="text-4xl font-bold text-foreground mb-2">
          Welcome to LiveBid
        </h2>
        <p className="text-muted-foreground text-lg">Your auction dashboard overview</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div>
                  <p className="font-medium text-foreground">You won "Bluetooth Speaker"</p>
                  <p className="text-sm text-muted-foreground">Final bid: ₹800 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <div>
                  <p className="font-medium text-foreground">Outbid on "Wireless Earbuds"</p>
                  <p className="text-sm text-muted-foreground">Your bid: ₹500 • 5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default DashBoardHome;