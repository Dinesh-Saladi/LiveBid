import { Flag, Diamond } from "lucide-react";

function Ended() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 mt-5">
        <Flag className="h-auto w-1/2 md:w-1/3 text-muted-foreground" />
        <div className="flex items-center text-center w-1/2 gap-4">
          <Diamond className="hidden md:flex text-muted-foreground"/>
          <div className="hidden md:flex flex-grow border-t border-gray-300" />
          <p className="text-xl w-full md:w-auto font-medium text-muted-foreground">
            Auction Ended
          </p>
          <div className="hidden md:flex flex-grow border-t border-gray-300" />
          <Diamond className="hidden md:flex text-muted-foreground"/>
        </div>
      </div>
    </div>
  );
}

export default Ended;
