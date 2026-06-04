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
    <article className="flex h-full min-h-[390px] min-w-0 flex-col rounded-md border border-[#E5E5E5] bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg">
<div className="flex h-[190px] items-center justify-center overflow-hidden rounded-md bg-[#FFF8F5] p-2">
  <Image
    src={product.image || "/medicineproduct.jpg"}
    alt={displayProduct.name}
    width={440}
    height={440}
    className="h-full w-full object-contain"
  />
</div>

      <h3 className="mt-4 min-h-[44px] text-base font-semibold leading-5 text-[#090909]">
        {displayProduct.name}
      </h3>

      <div className="mt-2 flex-1 text-sm leading-5 text-[#56585C]">
        <p>{product.size}</p>
        <p>{product.purity}</p>
        <p className="font-semibold text-[#F04423]">
          {t("researchUseOnly", "Research Use Only")}
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        {typeof product.price === "number" && (
          <p className="text-center text-xl font-semibold text-[#F04423]">
            ${product.price.toFixed(2)}
          </p>
        )}

        <Link
          href={productHref}
          className="block w-full cursor-pointer rounded-md border border-[#F04423] px-3 py-2.5 text-center text-sm font-semibold text-[#F04423] transition hover:bg-[#F04423] hover:text-white"
        >
          {t("learnMore", "Learn More")}
        </Link>

        <AddToCartButton product={displayProduct} className="px-3 py-2.5" />
      </div>
    </article>
  );
}
