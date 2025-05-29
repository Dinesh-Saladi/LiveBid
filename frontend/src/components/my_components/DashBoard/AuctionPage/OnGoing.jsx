import React from "react";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const item = {
  name: "Keyboard",
  image:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Description:
    "Responsive keys for fast, accurate typing\nSleek, durable design\nCustomizable RGB backlighting\nPlug & play with USB or Bluetooth connectivity",
  seller: "Dinesh",
  email: "dineshsaladi79@gmail.com",
};

const currentbid = {
  bid: "1000$",
  name: "Dinesh",
  email: "dineshsaladi79@gmail.com",
};

function OnGoing() {
  return (
    <div>
      {/* laptops and tabs */}
      <div className="hidden md:grid grid-cols-4 grid-rows-5 gap-4 m-5">
        {/* Left Column: Item Details */}
        <div className="col-start-1 col-span-2 row-start-1 row-span-5">
          <Card className="hover:shadow-lg transition-all duration-300 border border-border h-full">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">
                    Name: {item.name}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Description:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      {item.Description.split("\n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Current Bid, Button, and Timer */}
        <div className="col-start-3 col-span-2 row-start-1 row-span-5 flex flex-col space-y-4">
          {/* Current Bid Card */}
          <Card className="w-full hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Current Bid: {currentbid.bid}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Name: {currentbid.name}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Email: {currentbid.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button and Timer Row */}
          <div className="flex items-center">
            <Button className="flex-1">Place Bid</Button>
            <div className="flex justify-center items-center">
              <Timer radius="60" />
            </div>
          </div>
          <Card className="w-full hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Seller Details
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Name: {item.seller}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Email: {item.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden flex flex-col gap-1 my-3">
        {/* Left Column: Item Details */}
        <div>
          <Card className="hover:shadow-lg transition-all duration-300 border border-border h-full">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p className="text-xl font-semibold text-foreground mb-1">
                    Name: {item.name}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Description:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      {item.Description.split("\n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Current Bid, Button, and Timer */}
        <div className="flex flex-col space-y-4">
          {/* Button and Timer Row */}
          <div className="flex items-center">
            <Button className="flex-1">Place Bid</Button>
            <div className="flex justify-center items-center">
              <Timer radius="45" />
            </div>
          </div>
          {/* Current Bid Card */}
          <Card className="w-full hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Current Bid: {currentbid.bid}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Name: {currentbid.name}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Email: {currentbid.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full hover:shadow-lg transition-all duration-300 border border-border">
            <CardContent>
              <div className="flex flex-col items-start space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Seller Details
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Name: {item.seller}
                  </p>
                  <p className="text-lg text-muted-foreground mb-2">
                    Email: {item.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OnGoing;
