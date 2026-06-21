import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { AnimatedCursor } from "@/components/animations/AnimatedCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `Portfolio ${site.name}`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Kelyan AFONSO",
    "portfolio",
    "génie mécanique",
    "productique",
    "ingénieur mécanique",
    "conception",
    "CAO",
    "SolidWorks",
    "bureau d'études",
    "maintenance industrielle",
    "BUT GMP",
    "rapport de stage",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: `Portfolio ${site.name}`,
    title: `${site.name} — ${site.title}`,
    description: site.description,
    images: [
      { url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — Portfolio` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ThemeScript />
        <ThemeProvider>
          <SmoothScrollProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
            >
              Aller au contenu principal
            </a>
            <AnimatedCursor />
            <ScrollProgress />
            <Navbar />
            <CommandPalette />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
