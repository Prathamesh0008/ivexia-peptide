import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

export default function LegalContentPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-[1180px] px-6 py-12">
        <h1 className="mb-9 text-[34px] font-bold leading-tight text-black">
          {title}
        </h1>

        <div className="legal-content max-w-[1120px] text-[15px] leading-[1.75] text-black">
          {children}
        </div>
      </section>

      <Footer />
    </main>
  );
}