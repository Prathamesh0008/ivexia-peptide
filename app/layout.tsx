import type { Metadata } from "next";
import GlobalProductSidebar from "@/components/GlobalProductSidebar";
import ProductDrawerController from "@/components/ProductDrawerController";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ivexia Peptide",
  description: "Research-use-only peptide product information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <Providers>
          <ProductDrawerController />
          <GlobalProductSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}