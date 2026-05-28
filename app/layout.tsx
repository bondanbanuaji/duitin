import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, Plus_Jakarta_Sans, Noto_Sans_JP, Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#00E5C3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Duitin — AI-Powered Realtime Financial Tracking",
    template: "%s | Duitin",
  },
  description: "Duitin adalah platform pencatatan keuangan personal berbasis web dengan AI agent pintar (Gemini API), realtime updates, dan export laporan profesional.",
  applicationName: "Duitin",
  authors: [{ name: "Duitin Team" }],
  generator: "Next.js",
  keywords: ["finance", "AI", "budgeting", "expense tracker", "fintech", "personal finance", "duitin", "gemini ai"],
  referrer: "origin-when-cross-origin",
  creator: "Duitin",
  publisher: "Duitin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://duitin.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/branding/favicon.ico", sizes: "any" },
      { url: "/branding/logo.svg", type: "image/svg+xml" },
      { url: "/branding/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/branding/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/branding/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/branding/favicon.ico"],
    other: [
      { rel: "mask-icon", url: "/branding/logo.svg", color: "#00E5C3" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://duitin.vercel.app",
    siteName: "Duitin",
    title: "Duitin — AI-Powered Realtime Financial Tracking",
    description: "Catat dan kelola keuanganmu dengan bantuan AI pintar. Realtime dashboard, budget tracker, dan laporan profesional.",
    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "Duitin — AI-Powered Realtime Financial Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duitin — AI-Powered Realtime Financial Tracking",
    description: "Catat dan kelola keuanganmu dengan bantuan AI pintar.",
    images: ["/branding/og-image.png"],
    creator: "@duitin",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Duitin",
  },
  other: {
    "msapplication-TileColor": "#080B10",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", syne.variable, spaceGrotesk.variable, plusJakartaSans.variable, notoSansJP.variable, "font-sans", geist.variable)}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Duitin",
              "operatingSystem": "Web",
              "applicationCategory": "FinanceApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              },
              "description": "Duitin adalah platform pencatatan keuangan personal berbasis web dengan AI agent pintar (Gemini API), realtime updates, dan export laporan profesional.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "100"
              }
            })
          }}
        />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
