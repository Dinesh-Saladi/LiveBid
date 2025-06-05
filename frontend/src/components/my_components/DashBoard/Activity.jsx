import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Activity as ActivityIcon } from "lucide-react";
import { socket } from "../../../store/useSocketStore";
import { useAuthStore } from "../../../store/useAuthStore";
import BarLoader from "../BarLoader";

function Activity() {
  const { user } = useAuthStore();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    socket.emit("get-activity-details", user.id);
  }, []);
  useEffect(() => {
    const HandleActivity = (activity) => {
      setActivity(activity);
      setLoading(false);
    };
    socket.on("take-activity-details", HandleActivity);
    return () => {
      socket.off("take-activity-details", HandleActivity);
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
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              My Activity
            </h2>
            <p className="text-muted-foreground">
              Track your bidding history and wins
            </p>
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
                  <ActivityIcon className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.map((act, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-secondary/5 rounded-lg"
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
      )}
    </div>
  );
}

export default Activity;
