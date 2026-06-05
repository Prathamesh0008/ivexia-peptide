"use client";

import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type FloatingProductButtonProps = {
  onClick: () => void;
};

export default function FloatingProductButton({ onClick }: FloatingProductButtonProps) {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 items-center gap-3 rounded-r-lg bg-[#F04423] px-5 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#D93A18] md:flex"
    >
      <span>{navigation.productList || "Product List"}</span>
      <ChevronRight size={20} />
    </button>
  );
}