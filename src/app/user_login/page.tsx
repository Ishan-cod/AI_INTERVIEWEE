"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CircleCheckBig,
  Clock,
  Github,
  Loader2,
  LoaderCircle,
  MailCheck,
  UserCheck2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLoginStore } from "../store/useStore_Zustand";
import axios from "axios";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import Link from "next/link";

export default function Page() {
  const [allfiled, setallfiled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { name, setName } = useLoginStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toLogin, settoLogin] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    toast(<span>User registeration in process</span>, {
      icon: <Clock className="animate-spin" />,
      description: (
        <>
          <div className="text-sm text-zinc-500 leading-relaxed">
            Please wait while we register your account
          </div>
        </>
      ),
    });

    try {
      const response = await axios.post("/api/auth/user_signup", {
        name,
        email,
        password,
      });

      if (response.status == 201) {
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
        setTimeout(() => redirect("/jobs_available"), 2000);
      }
    } catch (e: any) {
      setIsLoading(false);
      if (e.response.status === 409) {
        toast(
          <span className="font-semibold text-black">
            You're already registered!
          </span>,
          {
            icon: <UserCheck2 className="text-green-700 animate-pulse" />,
            description: (
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <div>It looks like your account already exists.</div>
                <div>Please log in to continue.</div>
              </div>
            ),
          }
        );
      } else {
        toast(
          <span className="font-semibold text-red-600">
            User registeration failed
          </span>,
          {
            icon: <XCircle className="text-red-500" />,
            description: (
              <div className="text-sm text-gray-700 mt-1 space-y-1">
                <div>Sorry! We couldn’t register your account</div>
                <div>Please try again or check your internet connection.</div>
              </div>
            ),
            duration: 6000,
          }
        );
      }
    }
  };

  useEffect(() => {
    if (name.length != 0 && email.length != 0 && password.length != 0) {
      setallfiled(true);
    } else {
      setallfiled(false);
    }
  }, [name, password, email]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-zinc-900 to-zinc-800">
        <NeonGradientCard className="w-full max-w-sm bg-zinc-900 rounded-xl shadow-lg space-y-6 h-auto">
          <div className="p-3">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">
                Create an account
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Enter your email below to create your account
              </p>
            </div>

            {/* <div className="space-y-3">
            <Button variant="outline" className="w-full flex gap-2">
              <Github className="w-4 h-4" /> GitHub
            </Button>
            <Button variant="outline" className="w-full flex gap-2">
              <MailCheck className="w-4 h-4" /> Google
            </Button>
          </div> */}

            {/* <div className="relative">
            <Separator className="bg-zinc-700" />
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs text-zinc-500 bg-zinc-900 px-2">
              OR CONTINUE WITH
            </span>
          </div> */}

            <div className="w-full ">
              <div className="flex items-center justify-around w-full my-2">
                <div className="border-b-2 text-white p-3 rounded-lg">
                  SIGNUP
                </div>

                <Link href={'/signin'}>
                <div className="text-white/50 hover:text-white hover:cursor-pointer p-3 hover:border-b-2 rounded-lg" onClick={() => settoLogin(true)}>
                  {toLogin ? (
                    <>
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    <>LOGIN</>
                  )}
                </div></Link>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300" htmlFor="email">
                Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                className="bg-zinc-800 text-white border-zinc-700"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-300" htmlFor="email">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="bg-zinc-800 text-white border-zinc-700"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-300" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-zinc-800 text-white border-zinc-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-5  ">
              {!isLoading && allfiled ? (
                <Button
                  type="submit"
                  className="w-full bg-white/90 text-black hover:scale-105 hover:bg-white/80"
                  onClick={handleSubmit}
                >
                  Create account
                </Button>
              ) : !allfiled && !isLoading ? (
                <Button type="submit" className="w-full" disabled>
                  Create account
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-white/90 text-black scale-105"
                  disabled
                >
                  <LoaderCircle className="animate-spin" />
                  <div>Creating ...</div>
                </Button>
              )}
            </div>
          </div>
        </NeonGradientCard>
      </div>
    </>
  );
}
