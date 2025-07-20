"use client";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheckBig, Clock, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RecentLogin from "../user_login/component_login/RecentLoginBar";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [isSignUp, setisSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginloader, setloginloader] = useState<boolean>(false);
  const [TokenEmail, setTokenEmail] = useState<string>("");
  const [TokenUsername, setTokenUsername] = useState<string>("");

  const handleLogin = async () => {
    try {
      toast(<span>Login in process</span>, {
        icon: <Clock className="animate-spin" />,
        description: (
          <>
            <div className="text-sm text-zinc-500 leading-relaxed">
              Please wait while we login in your account
            </div>
          </>
        ),
      });

      setloginloader(true);
      const response = await axios.post("/api/auth/user_login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        toast(<span>User registered successfully</span>, {
          icon: <CircleCheckBig className="animate-bounce text-green-500" />,
          duration: 5000,
          description: (
            <>
              <div className="text-sm text-zinc-500 leading-relaxed">
                Your account registered as a User.
                <br />
                <span className="text-green-500 font-semibold">
                  Happy interviewing
                </span>
              </div>
            </>
          ),
        });
        redirect("/jobs_available");
      }
    } catch (error) {
      setloginloader(false);
      toast(
        <span className="font-semibold text-red-600">Sorry! Login failed</span>,
        {
          icon: <XCircle className="text-red-500" />,
          description: (
            <div className="text-sm text-gray-700 mt-1 space-y-1">
              <div>Sorry! We couldn’t login to your account</div>
              <div>Please try again or check your internet connection.</div>
            </div>
          ),
          duration: 6000,
        }
      );
    }
  };

  useEffect(() => {
    const cookieCheck = async () => {
      try {
        const response = await axios.get("/api/auth/check_cookie");
        const token_username = response.data.token.username;
        const token_email = response.data.token.email;
        setTokenEmail(token_email);
        setTokenUsername(token_username);
      } catch (error) {}
    };

    cookieCheck();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-zinc-900 to-zinc-800">
        <NeonGradientCard className="w-full max-w-sm bg-zinc-900 rounded-xl shadow-lg space-y-6 h-auto">
          <div className="p-3">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Welcome Back !</h1>
              <p className="text-sm text-zinc-400 mt-1">
                Please enter the details to login
              </p>
            </div>

            <div className="w-full ">
              <div className="flex items-center justify-around w-full my-2">
                <Link href={"/user_login"}>
                  <div className="text-white/50 p-3 rounded-lg hover:cursor-pointer hover:text-white hover:border-b-2">
                    SIGNUP
                  </div>
                </Link>

                <div className="text-white hover:text-white hover:cursor-pointer p-3 hover:border-b-2 rounded-lg border-b-2">
                  {false ? (
                    <>
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    <>LOGIN</>
                  )}
                </div>
              </div>
            </div>

            <div className="my-2">
              <div className="text-white">Email</div>
              <Input
                type="email"
                placeholder="example@example.com"
                className="bg-zinc-800 text-white border-zinc-700"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2">
              <div className="text-white">Password</div>
              <Input
                type="password"
                placeholder="Password"
                className="bg-zinc-800 text-white border-zinc-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <RecentLogin name={TokenUsername} email={TokenEmail} />

            <div className="mt-1">
              <Button
                type="submit"
                className="w-full bg-white/90 text-black hover:scale-105 hover:bg-white/80 hover:cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </NeonGradientCard>
      </div>
    </>
  );
}
