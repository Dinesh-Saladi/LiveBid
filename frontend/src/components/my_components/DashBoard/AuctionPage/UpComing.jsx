import { Hourglass, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

function UpComing() {
  return (
    <div>
      <div className="grid grid-cols-2 mt-10">
        <div className="col-start-1 col-span-1 flex flex-col items-center justify-between gap-4">
          <Hourglass className="h-auto w-3/4 text-muted-foreground sticky" />
          <p className="text-lg font-sm text-muted-foreground">Waiting for the Auctioner to start the Auction</p>
        </div>
        <div className="col-start-2 col-span-1 flex flex-col items-center justify-center gap-4">
          <Button className="w-full">Add Items</Button>
          <h2 className="text-3xl font-bold">Auction Items</h2>
          <Archive className="h-auto w-1/3 text-muted-foreground"/>
          <p className="text-lg font-sm text-muted-foreground">No Items Added</p>
        </div>
      </div>
    </div>
  );
}

export default UpComing;
