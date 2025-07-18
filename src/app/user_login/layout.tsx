import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <main>{children}</main>
      <Toaster />
    </body>
  );
}
