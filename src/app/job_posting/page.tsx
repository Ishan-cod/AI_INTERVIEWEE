import React from "react";
import Sidebar from "../test/test_comps/Sidebar";
import Main_body from "../test/test_comps/Main_body";

export default function page() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <Main_body></Main_body>
        </div>
      </div>
    </>
  );
}
