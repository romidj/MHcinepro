
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
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
  metadataBase: new URL("https://mhcinepro.com"),

  title: "MH CinePro | Production Audiovisuelle en Algérie",

  description:
    "Production audiovisuelle en Algérie : films documentaires, podcasts, vidéos professionnelles, photographie, tournage drone et montage vidéo.",

  openGraph: {
    title: "MH CinePro | Production Audiovisuelle en Algérie",
    description:
      "Découvrez nos films documentaires, podcasts, productions vidéo, services de photographie et prises de vue aériennes par drone.",
    url: "https://mhcinepro.com",
    siteName: "MH CinePro",
    locale: "fr_DZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PageViewTracker />
        <Analytics />
      </body>
    </html>
  );
}
