"use client";

import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function FloatingProductButton() {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};

  return (
    <a
      href="#products"
      className="fixed left-0 top-[38%] z-40 hidden items-center gap-4 rounded-r-lg bg-[#F04423] px-6 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-[#D93A18] md:flex"
    >
      {navigation.productList || "Product List"} <ChevronRight size={28} />
    </a>
  );
}
