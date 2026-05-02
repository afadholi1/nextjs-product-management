import { Inter } from "next/font/google"; // Import Font Inter
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Konfigurasi font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Gunakan CSS Variable
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Terapkan font class di sini */}
      <body className={`${inter.variable} font-sans antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}