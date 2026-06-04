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
    <aside className="hidden lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4">
        <div className="space-y-8">
          {Object.entries(productsByCategory).map(([category, items]) => (
            <section key={category}>
              <h4 className="mb-5 text-[20px] font-bold text-[#F04423]">
                {category}
              </h4>

              <ul className="space-y-4">
                {items.map((product, index) => {
                  const productKey = product.slug || product.id;

                  return (
                    <li key={`${productKey}-${index}`}>
                      <Link
                        href={`/products/${productKey}`}
                        className="block text-[16px] font-normal leading-[1.4] text-black transition hover:text-[#F04423]"
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
      </div>
    </aside>
  );
}
