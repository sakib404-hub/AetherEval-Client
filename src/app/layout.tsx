import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { CosmicBackground } from "./_components/shared/CosmicBackground";
import { SmoothScrollProvider } from "./_components/shared/SmoothScrollProvider";
import { FloatingDock } from "./_components/navigation/FloatingDock";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AetherEval — Academic Project Evaluation System",
  description:
    "Next-generation quantum-attested academic project evaluation and peer review platform.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} dark antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="relative flex min-h-screen flex-col bg-[#070412] font-body text-on-surface selection:bg-primary-container selection:text-white">
        <SmoothScrollProvider>
          {/* Deep Space Ambient Backing */}
          <CosmicBackground />

          {/* Persistent Quantum Sidebar (Only Navigation) */}
          <FloatingDock />

          {/* Main Route Content Container */}
          <div className="relative z-10 flex min-h-screen flex-1 flex-col md:pl-28 px-4 md:px-8 py-8 pb-24 md:pb-8">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
