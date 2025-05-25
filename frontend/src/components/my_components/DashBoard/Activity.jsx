import React from "react";

function Activity() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Activity</h2>
      <ul className="space-y-2">
        <li className="p-4 border rounded-xl">
          You bid ₹500 on "Wireless Earbuds" - Outbid
        </li>
        <li className="p-4 border rounded-xl">
          You won "Bluetooth Speaker" for ₹800
        </li>
      </ul>
    </div>
  );
}

export default Activity;
