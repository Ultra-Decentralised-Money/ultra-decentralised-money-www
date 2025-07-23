import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultra Decentralised Money | Cardano Analytics",
  description: "Real-time insights into Cardano's decentralization, governance activity, and DeFi ecosystem. Track validators, proposals, TVL, stablecoins, and more.",
  keywords: ["Cardano", "Analytics", "DeFi", "Staking", "Governance", "Blockchain"],
  authors: [{ name: "Ultra Decentralised Money" }],
  openGraph: {
    title: "Ultra Decentralised Money | Cardano Analytics",
    description: "Real-time insights into Cardano's decentralization, governance activity, and DeFi ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
