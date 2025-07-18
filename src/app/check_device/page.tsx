"use client";
import React, { useState } from "react";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import Main_body from "../jobs_available/test_comps/MainBody";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useInterviewRole } from "../store/useStore_Zustand";

export default function Page() {
  const [is_loading, set_is_loading] = useState(false);
  const { job_role } = useInterviewRole();

  const handle_click = () => {
    set_is_loading(!is_loading);
    const role = job_role;
    alert(`search params : ${role}`);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Main_body>
          <div className="flex h-full w-full items-center justify-center">
            <Link
              href={"/interview"}
            >
              {!is_loading ? (
                <Button className="hover:bg-[#212121]" onClick={handle_click}>
                  Page underprocess proceed to interview
                </Button>
              ) : (
                <Button disabled>
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
                  Page underprocess proceed to interview
                </Button>
              )}
            </Link>
          </div>
        </Main_body>
      </div>
    </div>
  );
}
