import { Flag, Diamond } from "lucide-react";
import { socket } from "../../../../store/useSocketStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function Ended() {
  const { auctionId } = useParams();
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    setSummary(null);
    socket.emit("get-summary", auctionId);
    const HandleSummary = (summary) => {
      setSummary(summary);
      console.log(summary);
    };
    socket.on("take-summary", HandleSummary);
    return () => {
      socket.off("take-summary", HandleSummary);
    };
  }, [auctionId]);
  return (
    <div className="m-0 p-0 w-full">
      {!summary ? (
        <div className="flex items-center justify-center min-h-screen">
          <BarLoader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <div>
            <h2 className="text-2xl font-bold">
              Auction Summary
            </h2>
          </div>
          <div className="w-full border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.map((s) => (
                  <TableRow key={s.id} className="odd:bg-muted/50">
                    <TableCell className="font-medium">{s.item_name}</TableCell>
                    <TableCell>{s.seller}</TableCell>
                    <TableCell>{s.buyer}</TableCell>
                    <TableCell>{s.price}</TableCell>
                    <TableCell>{s.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Ended;
