import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { NotificationProvider } from '@/components/NotificationProvider';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Volt UI - 100+ React Animation Components",
  description: "A modern React component library with 100+ stunning animations. Text effects, buttons, cards, cursors, loaders & backgrounds. Built with Framer Motion, GSAP & Three.js.",
  keywords: ["react", "nextjs", "components", "animations", "ui library", "framer motion", "gsap", "three.js"],
  authors: [{ name: "Mahmoud" }],
  creator: "Mahmoud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://volt-ui.vercel.app",
    title: "Volt UI - 100+ React Animation Components",
    description: "Modern React component library with stunning animations",
    siteName: "Volt UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volt UI - 100+ React Animation Components",
    description: "Modern React component library with stunning animations",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-05Q6XMNHYT"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-05Q6XMNHYT');
            `,
          }}
        />

        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          {children}
        </NotificationProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}