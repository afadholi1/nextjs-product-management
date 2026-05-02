import { Inter } from "next/font/google"; // Import Font Inter
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Konfigurasi font Inter dengan CSS variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <main>{children}</main>
        {/* Komponen toast notifikasi global */}
        <Toaster />
      </body>
    </html>
  );
}