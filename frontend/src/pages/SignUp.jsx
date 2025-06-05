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
import { useAuthStore } from "../store/useAuthStore";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [name, setName] = useState("");
  const { user, register, loading } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  if (user) {
    return null;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Toaster richColors />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Join LiveBid</CardTitle>
          <CardTitle className="text-2xl">
            Create your LiveBid account
          </CardTitle>
          <CardDescription>
            Be part of a growing community of real-time auctioneers and bidders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("Registering user:", { name, email, password });
              const registerPromise = register(name, email, password);
              toast.promise(registerPromise, {
                loading: "Registering...",
                success: (data) => data.message,
                error: (err) => err.message || "Registration failed",
              });
              try {
                await registerPromise;
                setTimeout(() => {
                  navigate("/login");
                }, 1000); // 1 second delay
                // Optional cleanup
                // setName("");
                // setMail("");
                // setPassword("");
              } catch (err) {
                // error already shown by toast
              }
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
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
              <div>
                <Button
                  disabled={!email.length || !password.length}
                  className="w-full cursor-pointer"
                  type="submit"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-2 mt-4">
          <p className="text-sm text-center">Already have an account?</p>
          <Link
            to="/login"
            className="text-sm text-center hover:underline cursor-pointer"
          >
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
