import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./tailwind.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahm2010.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ahmed Ashraf — Front-End Developer",
    template: "%s | Ahmed Ashraf",
  },
  description:
    "Front-end developer in Saudi Arabia building accessible, responsive web experiences with React, Next.js, and TypeScript.",
  keywords: [
    "Ahmed Ashraf",
    "front-end developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Saudi Arabia",
  ],
  authors: [{ name: "Ahmed Ashraf" }],
  creator: "Ahmed Ashraf",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ahmed Ashraf Portfolio",
    title: "Ahmed Ashraf — Front-End Developer",
    description:
      "Thoughtful, accessible web experiences built with modern front-end tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ashraf — Front-End Developer",
    description:
      "Thoughtful, accessible web experiences built with modern front-end tools.",
  },
  appleWebApp: {
    title: "Ahmed Ashraf",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2e9" },
    { media: "(prefers-color-scheme: dark)", color: "#11120f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`;
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${sans.variable} ${display.variable} overflow-x-hidden bg-cream font-sans leading-relaxed text-ink transition-colors duration-300 selection:bg-gold selection:text-ink dark:bg-[#11120f] dark:text-[#f3f0e8]`}
      >
        {children}
      </body>
    </html>
  );
}
