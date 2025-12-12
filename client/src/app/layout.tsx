"use client";

import { Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.component";
import Footer from "./components/Footer.component";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "600"],
  variable: "--font-kanit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${kanit.className}`}>
      <body className="pt-20 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
