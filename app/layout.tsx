import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  //SEO
  title: "Poker Analyzer Test",
  description: "Texas Hold'em hand analyzer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={nunitoSans.variable}>
      <body className={`${nunitoSans.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
