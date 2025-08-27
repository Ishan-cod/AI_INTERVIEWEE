import { EdgeStoreProvider } from "@/lib/edgestore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <EdgeStoreProvider>
        <main>{children}</main>
      </EdgeStoreProvider>
    </body>
  );
}
  