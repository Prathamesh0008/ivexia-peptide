"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";
import { useCart } from "@/components/CartProvider";

type ProductListDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const products = PRODUCTS as Product[];

export default function ProductListDrawer({
  open,
  setOpen,
}: ProductListDrawerProps) {
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  const results = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return products;

    return products.filter((product) =>
      `${product.name || ""} ${product.category || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[9990] bg-black/35"
        onClick={() => setOpen(false)}
      />

      <aside className="fixed left-0 top-0 z-[9999] h-full w-[88%] max-w-[350px] bg-white shadow-2xl">
        <div className="relative flex h-full flex-col overflow-hidden bg-white">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.16]"
            style={{
              backgroundImage: "url('/DNA.png')",
            }}
          />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#090909] px-4 py-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} className="text-[#F04423]" />
                <h2 className="text-sm font-bold text-[#090909]">
                  Product List
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-[#090909] transition hover:bg-[#F7F7F7]"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="border-b border-[#E5E5E5] px-4 py-4">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="h-9 w-full rounded-md border border-[#090909] bg-white pl-9 pr-3 text-xs text-[#090909] outline-none placeholder:text-[#8A8D92] focus:border-[#F04423]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-7">
                {results.map((product, index) => {
                  const productKey = product.slug || product.id;

                  return (
                    <div
                      key={`${productKey}-${index}`}
                      className="flex items-center justify-between gap-3"
                    >
                      <Link
                        href={`/products/${productKey}`}
                        onClick={() => setOpen(false)}
                        className="min-w-0 flex-1"
                      >
                        <p className="line-clamp-1 text-[12px] font-bold leading-tight text-[#111827] transition hover:text-[#F04423]">
                          {product.name}
                        </p>

                        <p className="mt-1 line-clamp-1 text-[12px] leading-tight text-[#6B7280]">
                          {product.category || "Product"}
                        </p>
                      </Link>

                      <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F04423] text-white shadow-sm transition hover:bg-[#D93A18]"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {!results.length && (
                <p className="py-8 text-center text-sm text-[#56585C]">
                  No products found.
                </p>
              )}
            </div>

            <div className="border-t border-[#090909] bg-white p-4">
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-md bg-[#F04423] py-3 text-sm font-bold text-white transition hover:bg-[#D93A18]"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}