import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://miles-for-ritual.vercel.app"),
  icons: { icon: "/favicon.svg" },
  title: {
    default: "Miles Mattina for Ritual",
    template: "%s | Miles Mattina for Ritual",
  },
  description:
    "A custom interactive application for the Brand Manager role at Ritual.",
  openGraph: {
    title: "Miles Mattina for Ritual",
    description:
      "A custom interactive application for the Brand Manager role at Ritual.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${dmSans.variable} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
