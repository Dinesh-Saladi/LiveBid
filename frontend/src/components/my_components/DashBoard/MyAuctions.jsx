import React from "react";
import { Button } from "@/components/ui/button";

function MyAuctions() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Auctions</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2">Item</th>
              <th className="p-2">Status</th>
              <th className="p-2">Bids</th>
              <th className="p-2">End Time</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Smartwatch</td>
              <td className="p-2">Live</td>
              <td className="p-2">5</td>
              <td className="p-2">2h 10m</td>
              <td className="p-2 space-x-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAuctions;
