import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://milesformacenergy.vercel.app"),
  icons: { icon: "/favicon.svg" },
  title: {
    default: "Miles Mattina for MAC Energy",
    template: "%s | Miles Mattina for MAC Energy",
  },
  description:
    "A custom interactive application for the Brand Manager role at MAC Energy.",
  twitter: { card: "summary_large_image", images: ["/social-preview.png"] },
  openGraph: {
    title: "Miles Mattina for MAC Energy",
    description:
      "A custom interactive application for the Brand Manager role at MAC Energy.",
    type: "website",
    images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Miles Mattina for MAC Energy — Brand Manager application" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${anton.variable} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
