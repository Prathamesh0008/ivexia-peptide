"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/productTypes";
import AddToCartButton from "./AddToCartButton";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProductCard({ product }: { product: Product }) {
  const productHref = `/products/${product.slug || product.id}`;
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const translatedProduct = translations?.products?.[product.slug || product.id];
  const translatedName = translatedProduct?.name;
  const t = (key: string, fallback: string) => navigation[key] || fallback;
  const displayProduct = {
    ...product,
    name: typeof translatedName === "string" ? translatedName : product.name,
  };

  return (
    <article className="flex h-full min-h-[300px] min-w-0 flex-col overflow-hidden rounded-lg border border-[#E5E5E5] bg-white transition">
      <Link
        href={productHref}
        className="relative flex aspect-square w-full items-center justify-center bg-white p-3"
      >
        <Image
          src={product.image || "/medicineproduct.jpg"}
          alt={displayProduct.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          {typeof product.price === "number" && (
            <p className="mb-3 text-[17px] font-bold text-[#F04423]">
              ${product.price.toFixed(2)}
            </p>
          )}

          <Link href={productHref}>
            <h3 className="text-[14px] font-semibold leading-snug text-[#090909] hover:underline">
              {displayProduct.name}
            </h3>
          </Link>

          <div className="mt-2 text-xs leading-5 text-[#56585C]">
            <p>{product.size}</p>
            <p>{product.purity}</p>
            <p className="font-semibold text-[#F04423]">
              {t("researchUseOnly", "Research Use Only")}
            </p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <Link
            href={productHref}
            className="block w-full cursor-pointer rounded-md border border-[#F04423] px-3 py-2 text-center text-sm font-semibold text-[#F04423] transition hover:bg-black hover:text-white"
          >
            {t("learnMore", "Learn More")}
          </Link>

          <AddToCartButton product={displayProduct} className="px-3 py-2" />
        </div>
      </div>
    </article>
  );
}
