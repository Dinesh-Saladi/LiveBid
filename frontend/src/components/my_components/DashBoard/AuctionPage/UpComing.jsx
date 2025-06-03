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

function UpComing(props) {
  const { user } = useAuthStore();
  const { joinedAuction } = useSocketStore();
  console.log(user);
  console.log(user.id);
  const [items, setItems] = useState([]);
  const { getItems } = useSocketStore();

  useEffect(() => {
    getItems(setItems, joinedAuction.id);
    socket.emit("get-rooms");
  }, []);

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
      <div className="grid grid-cols-2 mt-10 gap-4">
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
            <div>
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
                    <TableRow key={product.id} className="odd:bg-muted/50">
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
    </div>
  );
}

export default UpComing;
