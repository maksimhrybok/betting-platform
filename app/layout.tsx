import type { Metadata } from "next";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Betting Platform",
  description: "Betting Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 min-h-screen">
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
