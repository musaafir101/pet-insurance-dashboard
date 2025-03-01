"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noLayoutPages = ["/login"];

  return (
    <html lang="en">
      <body>
        {noLayoutPages.includes(pathname) ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
