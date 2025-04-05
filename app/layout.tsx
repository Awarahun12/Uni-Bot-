import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/variables.css"
import "../styles/style.css"
import "../styles/utilityclasses.css"
import Provider from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniBot",
  description: "University Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <Provider>
      <body className={`${inter.className} bg-[#f0f4f8]`}>{children}</body>
      </Provider>
    </html>
    
  );
}
