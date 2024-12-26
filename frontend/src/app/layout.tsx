import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizzaria",
  description: "Descrição da pizzaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: "f1f1f1",
              color: "#131313",
              borderColor: "rgba(255,255,255,.5",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
