"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";

const products = PRODUCTS as Product[];

const productsByCategory = products.reduce<Record<string, Product[]>>(
  (groups, product) => {
    const category = product.category || "Products";
    groups[category] = groups[category] || [];
    groups[category].push(product);
    return groups;
  },
  {},
);

export default function GlobalProductSidebar() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/account" ||
    pathname === "/cart" ||
    pathname.startsWith("/checkout") ||
    pathname === "/contact" ||
    pathname === "/about" ||
    pathname === "/all-peptides" ||
    pathname === "/popular-peptides" ||
    pathname === "/bundle-save" ||
    pathname === "/peptide-storage" ||
    pathname.startsWith("/peptide-information") ||
    pathname.startsWith("/peptide-research") ||
    pathname.startsWith("/products/")
  ) {
    return null;
  }

  return (
    <aside className="fixed bottom-0 left-[max(0px,calc((100vw-1280px)/2))] top-[140px] z-30 hidden w-[260px] overflow-y-auto bg-white px-5 py-7 lg:block">
      <h2 className="mb-6 text-lg font-semibold text-[#F04423]">Product List</h2>

      <div className="space-y-10 border-r border-[#E5E5E5] pr-4">
        {Object.entries(productsByCategory).map(([category, items]) => (
          <section key={category}>
            <h3 className="mb-3 text-lg font-semibold text-[#F04423]">
              {category}
            </h3>

            <ul className="space-y-1.5 text-sm leading-5 text-[#56585C]">
              {items.map((product, index) => {
                const productKey = product.slug || product.id;

                return (
                  <li key={`${productKey}-${index}`}>
                    <Link
                      href={`/products/${productKey}`}
                      className="block transition hover:text-[#F04423]"
                    >
                      {product.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
