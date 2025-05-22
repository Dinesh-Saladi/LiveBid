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
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const { user, login, loading } = useAuthStore();
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
      <Toaster />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>It's nice to see you again.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const loginPromise = login(email, password);
              console.log("Logging in user:", { email, password });
              toast.promise(loginPromise, {
                loading: "Logging in...",
                success: (data) => data.message,
                error: (err) => err.message || "Login failed",
              });
              try {
                await loginPromise;
                setTimeout(() => {
                  navigate("/dashboard");
                }, 1000); // 1 second delay
              } catch (error) {
                // error already shown by toast
              }
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Mail</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Your email"
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
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div>
                <Button
                  disabled={!email.length || password.length < 8}
                  className="w-full cursor-pointer"
                  type="submit"
                >
                  Login
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
          <p className="text-sm text-center">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-sm text-center hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
