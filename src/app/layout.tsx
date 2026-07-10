import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Darksite",
  description: "Find dark-sky windows for astrophotography with moon, weather, and globe context."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
