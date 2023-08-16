import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { LoginModal } from "@/components/modals/LoginModal";
import { getCurrentUser } from "@/utils/actions/getCurrentUser";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airrbnb",
  description: "Airbnb clone built with Nextjs and MySql",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <ToasterProvider />

        {children}
      </body>
    </html>
  );
}
