"use client";
import React, { useState } from "react";
import Sidebar from "../test/test_comps/Sidebar";
import Main_body from "../test/test_comps/Main_body";
import Toggle_camera_button from "./components_check/Toggle_camera_button";
import Camera_bar from "./components_check/Camera_bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function page() {
  const params = useSearchParams();
  const [is_loading, set_is_loading] = useState(false);

  const handle_click = () => {
    set_is_loading(!is_loading);
    const role = params.get("role");
    alert(`search params : ${role}`);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Main_body>
          <div className="flex h-full w-full items-center justify-center">
            <Link
              href={"/interview?role=frontend+developer&user=Ishan%20Jaiswal"}
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
