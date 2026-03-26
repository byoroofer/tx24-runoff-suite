import type { ReactNode } from "react";
import "./globals.css";
import { AdminNav } from "../components/admin-nav";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminNav />
        {children}
      </body>
    </html>
  );
}
