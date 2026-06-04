"use client";

import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/components/LanguageProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function ProductGrid() {
  const popularScrollRef = useRef<HTMLDivElement>(null);
  const productList = PRODUCTS as Product[];
  const categories = Array.from(
    new Set(productList.map((product) => product.category).filter(Boolean)),
  ) as string[];
  const popularProducts = productList
    .filter((product) => product.category === "Popular Peptides")
    .slice(0, 8);
  const bundleProducts = productList
    .filter((product) => {
      const text = `${product.name} ${product.slug || ""} ${product.category || ""}`;
      return /bundle|blend/i.test(text);
    })
    .slice(0, 8);
  const [selectedCategory, setSelectedCategory] = useState("All Peptides");
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const t = (key: string, fallback: string) => navigation[key] || fallback;
  const visibleProducts =
    selectedCategory === "All Peptides"
      ? productList
      : productList.filter((product) => product.category === selectedCategory);

  const scrollPopularProducts = (direction: "left" | "right") => {
    const scrollContainer = popularScrollRef.current;

    if (!scrollContainer) return;

    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollContainer.clientWidth : scrollContainer.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-w-0">
      <section>
        <h1 className="text-3xl font-bold leading-tight text-[#090909] md:text-4xl">
          Buy Peptides for Scientific Research and Development
        </h1>

        <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#56585C]">
          <p>
            Ivexia Peptide specializes in the synthesis of highly purified peptides,
            proteins and amino acid derivatives for scientific research and
            development. Our product information is organized for quick browsing,
            clear research-use notices, and focused product comparison.
          </p>
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section id="popular-peptides" className="mt-10 scroll-mt-40">
          <h2 className="mb-4 text-2xl font-semibold leading-tight text-[#090909]">
            {t("popularPeptides", "Popular Peptides")}
          </h2>

          <div className="relative">
            <button
              type="button"
              aria-label="Scroll popular peptides left"
              onClick={() => scrollPopularProducts("left")}
              className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-[#8A8A8A] shadow-md transition hover:bg-[#F7F7F7] hover:text-[#F04423] md:flex"
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </button>

            <div
              ref={popularScrollRef}
              className="scrollbar-none grid grid-flow-col auto-cols-[calc(100%/2)] gap-3 overflow-x-auto px-0 pb-3 scroll-smooth sm:auto-cols-[calc(100%/3)] lg:auto-cols-[calc(100%/4)] lg:px-12"
            >
              {popularProducts.map((product, index) => (
                <div key={`popular-${product.slug || product.id}-${index}`} className="snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Scroll popular peptides right"
              onClick={() => scrollPopularProducts("right")}
              className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-[#8A8A8A] shadow-md transition hover:bg-[#F7F7F7] hover:text-[#F04423] md:flex"
            >
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
        </section>
      )}

      {bundleProducts.length > 0 && (
        <section id="bundle-save" className="mt-16 scroll-mt-40">
          <h2 className="text-2xl font-semibold leading-tight text-[#090909]">
            20 Vial Peptide Bundles (10 vials of each peptide)
          </h2>

          <div className="mt-8 grid min-w-0 grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 xl:grid-cols-4">
            {bundleProducts.map((product, index) => (
              <ProductCard key={`bundle-${product.slug || product.id}-${index}`} product={product} />
            ))}
          </div>
        </section>
      )}

      <section id="all-peptides" className="mt-16 scroll-mt-40">
        <div className="mb-6">
          <h2 className="text-2xl font-bold leading-tight md:text-3xl">
            Shop by Category
          </h2>

          <div className="scrollbar-none mt-7 flex w-full cursor-grab select-none gap-3 overflow-x-auto pb-3">
            {["All Peptides", ...categories].map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-xl border px-5 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-[#090909] bg-[#090909] text-white"
                      : "border-[#F04423] bg-white text-[#F04423] hover:bg-[#FFF4F0]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-sm text-[#56585C]">
          {t("showingProducts", "Showing {count} products").replace(
            "{count}",
            String(visibleProducts.length),
          )}
        </p>

        <div className="mt-6 grid min-w-0 grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard key={`${product.slug || product.id}-${index}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
