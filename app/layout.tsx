import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/data/loveStory";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#130621" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
