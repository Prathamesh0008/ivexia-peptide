"use client";

import { useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/productTypes";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";

export default function AddToCartButton({
  className = "",
  product,
  quantity = 1,
  showIcon = true,
}: {
  className?: string;
  product: Product;
  quantity?: number;
  showIcon?: boolean;
}) {
  const { addItem } = useCart();
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const t = (key: string, fallback: string) => navigation[key] || fallback;

  function handleAddToCart() {
    setIsLoading(true);
    window.setTimeout(() => {
      addItem(product, quantity);
      setIsLoading(false);
      setIsAdded(true);
      window.setTimeout(() => setIsAdded(false), 1200);
    }, 350);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#F04423] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D93A18] disabled:cursor-wait disabled:opacity-80 ${className}`}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : showIcon ? (
        <ShoppingCart size={18} />
      ) : null}
      <span>
        {isLoading
          ? t("addingToCart", "Adding...")
          : isAdded
            ? t("addedToCart", "Added")
            : t("addToCart", "Add to Cart")}
      </span>
    </button>
  );
}
