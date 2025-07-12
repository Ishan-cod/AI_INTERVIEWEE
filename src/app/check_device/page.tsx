// app/check_device/page.tsx
import React, { Suspense } from "react";
import ClientPage from "./ClientPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-lg">Loading...</div>}>
      <ClientPage />
    </Suspense>
  );
}
