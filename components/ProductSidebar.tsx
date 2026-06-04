"use client";

import Link from "next/link";
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

export default function ProductSidebar() {
  return (
    <aside className="hidden space-y-10 border-r border-[#E5E5E5] pr-4 text-sm lg:block">
      {Object.entries(productsByCategory).map(([category, items]) => (
        <section key={category}>
          <h4 className="mb-3 text-lg font-semibold tracking-wide text-[#F04423]">
            {category}
          </h4>

          <ul className="space-y-1.5">
            {items.map((product, index) => {
              const productKey = product.slug || product.id;

              return (
                <li key={`${productKey}-${index}`}>
                  <Link
                    href={`/products/${productKey}`}
                    className="block text-[14px] font-normal leading-5 text-[#56585C] transition hover:text-[#F04423]"
                  >
                    {product.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </aside>
  );
}
