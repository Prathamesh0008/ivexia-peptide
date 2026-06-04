"use client";

import { MouseEvent, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSidebar from "@/components/ProductSidebar";
import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";

type CollectionMode = "all" | "popular" | "bundle";

const productList = PRODUCTS as Product[];

const preferredCategoryOrder = [
  "Popular Peptides",
  "Peptide Capsules",
  "Peptide Blends",
  "IGF-1 Proteins",
  "Melanotan Peptides",
  "Bioregulators",
  "Cosmetic Peptides",
  "Research Peptides",
];

function getCategories(mode: CollectionMode) {
  const uniqueCategories = Array.from(
    new Set(productList.map((product) => product.category).filter(Boolean)),
  ) as string[];

  const sortedCategories = [
    ...preferredCategoryOrder.filter((category) => uniqueCategories.includes(category)),
    ...uniqueCategories.filter((category) => !preferredCategoryOrder.includes(category)),
  ];

  if (mode === "all") {
    return ["All Peptides", ...sortedCategories.filter((category) => category !== "Popular Peptides")];
  }

  if (mode === "popular") {
    return sortedCategories.filter((category) => category !== "All Peptides");
  }

  return ["All Peptides", ...sortedCategories.filter((category) => category !== "Popular Peptides")];
}

function isBundleProduct(product: Product) {
  const text = `${product.name} ${product.slug || ""} ${product.category || ""}`;
  return /bundle|blend|combo/i.test(text);
}

export default function ProductCollectionPage({
  mode,
}: {
  mode: CollectionMode;
}) {
  const initialCategory = mode === "popular" ? "Popular Peptides" : "All Peptides";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [visible, setVisible] = useState(mode === "all" ? 24 : 48);

  const categories = useMemo(() => getCategories(mode), [mode]);

  const visibleProducts = useMemo(() => {
    if (mode === "popular") {
      return activeCategory === "All Peptides"
        ? productList.filter((product) => product.category === "Popular Peptides")
        : productList.filter((product) => product.category === activeCategory);
    }

    if (mode === "bundle") {
      return activeCategory === "All Peptides"
        ? productList.filter(isBundleProduct)
        : productList.filter((product) => product.category === activeCategory);
    }

    return activeCategory === "All Peptides"
      ? productList
      : productList.filter((product) => product.category === activeCategory);
  }, [activeCategory, mode]);

  const copy = {
    all: {
      title: "All Peptides",
      subtitle: "Browse Ivexia Peptide research-use-only products by category.",
      countLabel: "products",
    },
    popular: {
      title: "Popular Peptides",
      subtitle: "Explore frequently viewed Ivexia Peptide research products.",
      countLabel: "products",
    },
    bundle: {
      title: "Bundle & Save",
      subtitle: "Browse peptide blends, bundles, and category-based collections.",
      countLabel: activeCategory === "All Peptides" ? "bundles" : "products",
    },
  }[mode];

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setVisible(mode === "all" ? 24 : 48);
  }

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="min-h-screen bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-4">
          <aside className="hidden lg:block">
            <ProductSidebar />
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#090909] md:text-4xl">
                {copy.title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#56585C]">
                {copy.subtitle}
              </p>
            </div>

            <CategorySlider
              activeCategory={activeCategory}
              categories={categories}
              onChange={handleCategoryChange}
            />

            <p className="mt-4 mb-6 text-sm text-[#56585C]">
              Showing <span className="font-semibold text-[#090909]">{visibleProducts.length}</span>{" "}
              {copy.countLabel}
            </p>

            {visibleProducts.length === 0 ? (
              <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8 text-sm text-[#56585C]">
                No products found in this collection.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
                {visibleProducts.slice(0, visible).map((product, index) => (
                  <ProductCard key={`${product.slug || product.id}-${index}`} product={product} />
                ))}
              </div>
            )}

            {visible < visibleProducts.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((current) => current + 24)}
                  className="rounded-md bg-[#090909] px-6 py-3 text-sm font-semibold text-white"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CategorySlider({
  activeCategory,
  categories,
  onChange,
}: {
  activeCategory: string;
  categories: string[];
  onChange: (category: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;

    dragState.current = {
      isDragging: true,
      startX: event.pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
    };
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!dragState.current.isDragging || !scrollRef.current) return;

    event.preventDefault();

    const x = event.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft =
      dragState.current.scrollLeft - (x - dragState.current.startX) * 1.4;
  }

  function stopDragging() {
    dragState.current.isDragging = false;
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className="category-scrollbar flex cursor-grab select-none gap-3 overflow-x-auto pb-3 active:cursor-grabbing"
      >
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`shrink-0 whitespace-nowrap rounded-xl border px-5 py-2 text-sm font-semibold transition ${
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
  );
}
