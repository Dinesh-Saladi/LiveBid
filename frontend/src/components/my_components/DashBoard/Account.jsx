import React from "react";
import { Button } from "@/components/ui/button";

function Account() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded-xl"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded-xl"
        />
        <Button>Update</Button>
      </form>
    </div>
  );
}

export default Account;
