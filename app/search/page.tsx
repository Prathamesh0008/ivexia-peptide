import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";

const products = PRODUCTS as Product[];

export const metadata = {
  title: "Search | Ivexia Peptide",
  description: "Search Ivexia Peptide research-use-only products.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query = "" } = await searchParams;
  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? products.filter((product) =>
        [product.name, product.category, product.description]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedQuery)),
      )
    : [];

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold">
          Search results for: <span className="text-[#F04423]">{query || "—"}</span>
        </h1>

        {results.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[#E5E5E5] p-8 text-[#56585C]">
            <p>No products found.</p>
            <Link
              href="/all-peptides"
              className="mt-4 inline-flex rounded-md bg-[#F04423] px-5 py-2 text-sm font-semibold text-white hover:bg-[#D93A18]"
            >
              Browse All Peptides
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
            {results.map((product, index) => (
              <ProductCard key={`${product.slug || product.id}-${index}`} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
