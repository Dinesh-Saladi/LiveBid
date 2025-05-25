import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Trophy, Clock } from "lucide-react";

function Activity() {
  const activities = [
    {
      id: 1,
      type: "outbid",
      item: "Wireless Earbuds",
      amount: 500,
      time: "2 minutes ago",
      icon: <TrendingDown className="w-5 h-5" />,
      iconColor: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      id: 2,
      type: "won",
      item: "Bluetooth Speaker",
      amount: 800,
      time: "3 hours ago",
      icon: <Trophy className="w-5 h-5" />,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 3,
      type: "bid",
      item: "Gaming Headset",
      amount: 650,
      time: "5 hours ago",
      icon: <TrendingUp className="w-5 h-5" />,
      iconColor: "text-secondary-foreground",
      bgColor: "bg-secondary/50",
    },
    {
      id: 4,
      type: "outbid",
      item: "Vintage Camera",
      amount: 1200,
      time: "1 day ago",
      icon: <TrendingDown className="w-5 h-5" />,
      iconColor: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      id: 5,
      type: "bid",
      item: "Antique Vase",
      amount: 2500,
      time: "2 days ago",
      icon: <TrendingUp className="w-5 h-5" />,
      iconColor: "text-secondary-foreground",
      bgColor: "bg-secondary/50",
    },
  ];

  const getActivityText = (activity) => {
    switch (activity.type) {
      case "won":
        return `You won "${activity.item}" for ₹${activity.amount}`;
      case "outbid":
        return `You were outbid on "${activity.item}" - Your bid: ₹${activity.amount}`;
      case "bid":
        return `You placed a bid of ₹${activity.amount} on "${activity.item}"`;
      default:
        return "";
    }
  };

  const getStatusBadge = (type) => {
    switch (type) {
      case "won":
        return <Badge className="bg-primary text-primary-foreground">Won</Badge>;
      case "outbid":
        return <Badge variant="destructive">Outbid</Badge>;
      case "bid":
        return <Badge className="bg-secondary text-secondary-foreground">Active Bid</Badge>;
      default:
        return null;
    }
  };

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
        <h2 className="text-3xl font-bold text-foreground mb-2">My Activity</h2>
        <p className="text-muted-foreground">Track your bidding history and wins</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {activities.map((activity, index) => (
          <motion.div key={activity.id} variants={itemVariants}>
            <Card className="hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${activity.bgColor}`}>
                    <div className={activity.iconColor}>{activity.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-1">
                      {getActivityText(activity)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {activity.time}
                      </div>
                      {getStatusBadge(activity.type)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">
                      ₹{activity.amount.toLocaleString()}
                    </p>
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

export default Activity;