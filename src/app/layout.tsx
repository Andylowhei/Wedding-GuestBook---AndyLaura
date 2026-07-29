import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy & Laura's Wedding Guestbook | 19 Sep 2026",
  description:
    "Sign the cloud guestbook for Andy Low & Laura Kauderer's wedding. AI-powered sentiment analysis colours each message by mood.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FDF8F4] text-[#3D3027] antialiased">{children}</body>
    </html>
  );
}
