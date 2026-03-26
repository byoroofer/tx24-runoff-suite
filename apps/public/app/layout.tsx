import type { ReactNode } from "react";
import "./globals.css";
import { DisclosureFooter } from "../components/disclosure-footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <DisclosureFooter />
      </body>
    </html>
  );
}

