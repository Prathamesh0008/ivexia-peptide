"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

export default function FloatingProductButton() {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};

  return (
    <Link
      href="/all-peptides"
      className="fixed right-0 top-1/2 z-40 hidden h-36 w-10 -translate-y-1/2 items-center justify-center rounded-l-xl bg-[#F04423] text-white shadow-lg transition hover:bg-[#D93A18] md:flex"
    >
      <span className="[writing-mode:vertical-rl] text-xs font-semibold tracking-widest">
        {navigation.productList || "Product List"}
      </span>
    </Link>
  );
}
