import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoxIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuctionsData({ data }) {
  const navigate = useNavigate();
  return (
    <div>
      {data.length ? (
        <div className="w-full border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">ID</TableHead>
                <TableHead>Auction Name</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d) => (
                <TableRow
                  key={d.id}
                  onClick={() => navigate(`/dashboard/auction/${d.id}`)}
                  className="odd:bg-muted/50 cursor-pointer"
                >
                  <TableCell className="pl-4">{d.id}</TableCell>
                  <TableCell className="font-medium">
                    {d.auction_name}
                  </TableCell>
                  <TableCell>{d.auction_category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center m-30 gap-3">
          <BoxIcon className="w-48 h-full text-muted-foreground" />
          <p className="text-muted-foreground text-2xl font-medium">Empty</p>
        </div>
      )}
    </div>
  );
}

export default AuctionsData;
