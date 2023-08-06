import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { ToasterProvider } from "@/providers/ToasterProvider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airrbnb",
  description: "Airbnb clone built with Nextjs and MySql",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <RegisterModal />
        <ToasterProvider />

        {children}
      </body>
    </html>
  );
}
