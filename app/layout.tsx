import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhyCast Studio",
  description: "Local creator studio for WhyCast episodes."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
