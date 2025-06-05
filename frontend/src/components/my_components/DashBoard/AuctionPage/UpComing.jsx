import { Hourglass, Archive, BellElectric } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSocketStore, socket } from "../../../../store/useSocketStore";
import AddItems from "./AddItems";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarLoader from "../../BarLoader";
import { motion } from "framer-motion";

function UpComing(props) {
  const { user } = useAuthStore();
  const { joinedAuction } = useSocketStore();
  console.log(user);
  console.log(user.id);
  const [items, setItems] = useState(null);
  const { getItems } = useSocketStore();

  useEffect(() => {
    getItems(setItems, joinedAuction.id);
    socket.emit("get-rooms");
  }, [joinedAuction]);

  useEffect(() => {
    const handleNewItems = (items) => {
      console.log("helloooooooooooooo");
      setItems(items);
      console.log(items);
    };

    socket.on("new-items", handleNewItems);

    return () => {
      socket.off("new-items", handleNewItems);
    };
  }, []);

  // return null;
  return (
    <div>
      {!items ? (
        <div className="flex min-h-screen items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <div className="hidden md:grid grid-cols-2 mt-10 gap-4">
              {user.id === joinedAuction.user_id ? (
                <div className="col-start-1 col-span-1 flex flex-col items-center justify-between gap-4">
                  <BellElectric className="h-auto w-3/4 text-muted-foreground" />
                  <Button onClick={props.onStart} className="w-full">
                    Start Auction
                  </Button>
                </div>
              ) : (
                <div className="col-start-1 col-span-1 flex flex-col items-center justify-between gap-4">
                  <Hourglass className="h-auto w-3/4 text-muted-foreground sticky" />
                  <p className="text-lg font-sm text-muted-foreground">
                    Waiting for the Auctioner to start the Auction
                  </p>
                </div>
              )}

              <div className="col-start-2 col-span-1 flex flex-col items-center justify-center gap-4">
                <AddItems />
                <h2 className="text-2xl font-bold">Auction Items</h2>
                {items.length == 0 ? (
                  <div className="w-full flex flex-col items-center">
                    <Archive className="h-auto w-1/3 text-muted-foreground" />
                    <p className="text-lg font-sm text-muted-foreground">
                      No Items Added
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-4">Name</TableHead>
                          <TableHead>Base Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((product) => (
                          <TableRow
                            key={product.id}
                            className="odd:bg-muted/50"
                          >
                            <TableCell className="font-medium">
                              {product.item_name}
                            </TableCell>
                            <TableCell>{product.base_price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>

            {/* mobiles */}
            <div className="flex md:hidden flex-col mt-10 gap-4">
              {user.id === joinedAuction.user_id ? (
                <div className="flex flex-col items-center justify-between gap-4">
                  <BellElectric className="h-auto w-3/4 text-muted-foreground" />
                  <Button onClick={props.onStart} className="w-full">
                    Start Auction
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-between gap-4">
                  <Hourglass className="h-auto w-3/4 text-muted-foreground sticky" />
                  <p className="text-lg font-sm text-muted-foreground">
                    Waiting for the Auctioner to start the Auction
                  </p>
                </div>
              )}

              <div className="flex flex-col items-center justify-center gap-4">
                <AddItems />
                <h2 className="text-2xl font-bold">Auction Items</h2>
                {items.length == 0 ? (
                  <div className="w-full flex flex-col items-center">
                    <Archive className="h-auto w-1/3 text-muted-foreground" />
                    <p className="text-lg font-sm text-muted-foreground">
                      No Items Added
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-4">Name</TableHead>
                          <TableHead>Base Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((product) => (
                          <TableRow
                            key={product.id}
                            className="odd:bg-muted/50"
                          >
                            <TableCell className="font-medium">
                              {product.item_name}
                            </TableCell>
                            <TableCell>{product.base_price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default UpComing;
