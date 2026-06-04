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
    new Set(productList.map((product) => product.category).filter(Boolean))
  ) as string[];
  const popularProducts = productList
    .filter((product) => product.category === "Popular Peptides")
    .slice(0, 6);
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

    if (!scrollContainer) {
      return;
    }

    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollContainer.clientWidth : scrollContainer.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-w-0">
      <section className="max-w-none">
<h1 className="text-2xl font-medium leading-tight text-[#090909] md:text-3xl lg:text-[38px]">
  Buy Peptides for Scientific Research and Development
</h1>

        <div className="mt-8 space-y-3 text-base leading-7 text-[#090909] lg:text-[18px] lg:leading-7">
          <p>
        Ivexia Peptide™ specializes in the synthesis of highly purified peptides, proteins and amino acid derivatives for scientific research and development.uses automated, and manual peptide synthesizers as well as solution and solid-phase peptide synthetic technology to offer the finest quality peptides and proteins that exceed 99% purity. From the initial stages of peptide synthesis to packaging and delivery, our company implements the most stringent quality control standards to ensure that all peptides arrive in their purest and most stable form. In house testing at all stages of production at our analytical test lab verifies our peptides sequential fingerprints for precision accuracy. This is achieved through highly accurate High-Performance Liquid Chromatography and Mass Spectrometry analysis, which scientifically proves the purity, accuracy and identity of each peptide.
          </p>
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section id="popular-peptides" className="mt-10 scroll-mt-40">
          <h2 className="text-3xl font-semibold leading-tight text-[#090909] md:text-4xl">
            {t("popularPeptides", "Popular Peptides")}
          </h2>

          <div className="relative mt-8">
            <button
              type="button"
              aria-label="Scroll popular peptides left"
              onClick={() => scrollPopularProducts("left")}
              className="absolute left-0 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-[#8A8A8A] transition hover:text-[#F04423]"
            >
              <ChevronLeft size={44} strokeWidth={3.6} />
            </button>

            <div
              ref={popularScrollRef}
              className="flex min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
            >
              {popularProducts.map((product, index) => (
                <div
                  key={`popular-${product.slug || product.id}-${index}`}
                  className="w-full shrink-0 snap-start md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Scroll popular peptides right"
              onClick={() => scrollPopularProducts("right")}
              className="absolute right-0 top-1/2 z-10 flex translate-x-1/2 -translate-y-1/2 items-center justify-center text-[#8A8A8A] transition hover:text-[#F04423]"
            >
              <ChevronRight size={44} strokeWidth={3.6} />
            </button>
          </div>
        </section>
      )}

      {bundleProducts.length > 0 && (
        <section id="bundle-save" className="mt-16 scroll-mt-40">
          <h2 className="text-2xl font-semibold leading-tight text-[#090909] md:text-3xl">
            20 Vial Peptide Bundles (10 vials of each peptide)
          </h2>

          <div className="mt-8 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {bundleProducts.map((product, index) => (
              <ProductCard
                key={`bundle-${product.slug || product.id}-${index}`}
                product={product}
              />
            ))}
          </div>
        </section>
      )}

      <section id="all-peptides" className="mt-16 scroll-mt-40">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
            Shop by Category
          </h2>

          <div className="mt-7 flex w-full gap-4 overflow-x-auto pb-3">
            {["All Peptides", ...categories].map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-[8px] border px-5 py-3 text-base font-medium transition ${
                    active
                      ? "border-[#F04423] bg-[#F04423] text-white"
                      : "border-[#F04423] bg-white text-[#F04423] hover:bg-[#FFF4F0]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

      <h2 className="text-2xl font-black leading-tight md:text-3xl">
        {selectedCategory === "All Peptides"
          ? t("allPeptides", "All Peptides")
          : selectedCategory}
      </h2>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-[#374151]">
        {t(
          "gridDescription",
          "Explore our complete collection of research-use-only peptide products for scientific and investigative purposes."
        )}
      </p>

      <p className="mt-5 text-sm font-medium text-[#090909]">
        {t("showingProducts", "Showing {count} products").replace(
          "{count}",
          String(visibleProducts.length)
        )}
      </p>

     <div className="mt-6 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={`${product.slug || product.id}-${index}`}
            product={product}
          />
        ))}
      </div>
      </section>
    </div>
  );
}
