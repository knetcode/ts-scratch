import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "../_components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TS ScratchPad",
  description: "TS ScratchPad",
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${inter.className}`}>
        <NavBar />
        {props.children}
      </body>
    </html>
  );
}
