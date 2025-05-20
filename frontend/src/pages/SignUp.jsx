import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [repassword, setRepeatPassword] = useState("");
  const [email, setMail] = useState("");
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Join LiveBid</CardTitle>
        <CardTitle className="text-2xl">Create your LiveBid account</CardTitle>
        <CardDescription>
          Be part of a growing community of real-time auctioneers and bidders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Mail</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="repassword">Re-enter Password</Label>
              <div className="relative">
                <Input
                  id="repassword"
                  value={repassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  type="password"
                  placeholder="Re-enter password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox className="cursor-pointer" id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
            </div>
            <div>
              <Button
                disabled={
                  !email.length || !password.length || password !== repassword
                }
                className="w-full cursor-pointer"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <div>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            type="submit"
          >
            Continue with Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-2 mt-4">
        <p className="text-sm text-center">Already have an account?</p>
        <a
          className="text-sm text-center hover:underline cursor-pointer"
          href="#"
        >
          Log in
        </a>
      </CardFooter>
    </Card>
  );
}
