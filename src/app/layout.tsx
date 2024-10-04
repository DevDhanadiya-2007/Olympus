import "./globals.css";
import type { Metadata } from "next";

import ReduxProviderWrapper from "@/store/ReduxProviderWrapper";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Olympus",
  description: "Olympus is a crypto wallet manager that allows users to manage and observe their wallets. It is an ambitious project that will involve additional capabilities in the future.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ReduxProviderWrapper>
          <Navbar />
          <main className="min-h-[80vh]">
            {children}
          </main>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
