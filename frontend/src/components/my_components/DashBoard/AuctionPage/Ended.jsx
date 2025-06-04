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

function Ended() {
  const { auctionId } = useParams();
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    socket.emit("get-summary", auctionId);
    socket.once("take-summary", (summary) => {
      setSummary(summary);
      console.log(summary);
    });
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 m-4">
      <div>
        <h2 className="text-2xl font-bold">Auction Summary</h2>
      </div>
      <div className="w-full border rounded-md overflow-hidden">
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
    </div>
  );
}

export default Ended;
