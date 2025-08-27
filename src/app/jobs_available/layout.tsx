import { EdgeStoreProvider } from "@/lib/edgestore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <main>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </main>
    </body>
  );
}
