import { Hourglass, Archive, BellElectric } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useSocketStore } from "../../../../store/useSocketStore";

function UpComing(props) {
  const { user } = useAuthStore();
  const { joinedAuction } = useSocketStore();
  console.log(user);
  console.log(user.id);
  // return null;
  return (
    <div>
      <div className="grid grid-cols-2 mt-10 gap-4">
        {user.id === joinedAuction.id ? (
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
          <Button className="w-full">Add Items</Button>
          <h2 className="text-3xl font-bold">Auction Items</h2>
          <Archive className="h-auto w-1/3 text-muted-foreground" />
          <p className="text-lg font-sm text-muted-foreground">
            No Items Added
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpComing;
