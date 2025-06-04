import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Gavel, Trophy, Activity, Hourglass, Box } from "lucide-react";
import { socket, useSocketStore } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";

function DashBoardHome() {
  const { user } = useAuthStore();
  console.log(user);
  const [stats, setStats] = useState([]);

  const [activity, setActivity] = useState([]);

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

  useEffect(() => {
    socket.emit("get-details", user.id);
  }, []);

  useEffect(() => {
    const HandleInfo = (details) => {
      console.log(details.activity);
      setActivity(details.activity);
      setStats(() => [
        {
          title: "Ongoing Auctions",
          value: details.ongoing,
          icon: <Gavel className="w-6 h-6" />,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "Upcoming Auctions",
          value: details.upcoming,
          icon: <Hourglass className="w-6 h-6" />,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "Items Placed",
          value: details.itemsplaced,
          icon: <Box className="w-6 h-6" />,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
      ]);
    };
    socket.on("take-details", HandleInfo);

    return () => {
      socket.off("take-details", HandleInfo);
    };
  }, []);

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
        <p className="text-muted-foreground text-lg">
          Your auction dashboard overview
        </p>
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
              {activity.map((act, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      {act.status === "Bought" && (
                        <div>
                          <p className="font-medium text-foreground">
                            You Bought {act.item_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Final bid: ₹{act.price}
                          </p>
                        </div>
                      )}
                      {act.status === "Sold" && (
                        <div>
                          <p className="font-medium text-foreground">
                            You Sold {act.item_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Final bid: ₹{act.price}
                          </p>
                        </div>
                      )}
                      {act.status === "Unsold" && (
                        <p className="font-medium text-foreground">
                          Your Item {act.item_name} Unsold
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default DashBoardHome;
