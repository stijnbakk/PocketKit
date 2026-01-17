import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PocketKit React",
  description: "Next.js + PocketBase authentication boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
