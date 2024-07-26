import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A comprehensive web application for managing and tracking company expenses",
  keywords: "expense tracking, company expenses, finance management",
  openGraph: {
    images: [
      {
        url: "https://2f31-152-58-219-162.ngrok-free.app/logo.png", 
        width: 800,
        height: 600,
        alt: "Expense Tracker",
      }
    ],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <SignedIn>
            <div className="mt-1 flex justify-end mr-5 w-full pr-5 h-14 container"> 
            </div>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <main>{children}</main>
        </body>
    </html>
    </ClerkProvider>
  );
}
