import ProductCollectionPage from "@/components/ProductCollectionPage";

export const metadata = {
  title: "All Peptides | Ivexia Peptide",
  description: "Browse all Ivexia Peptide research-use-only products.",
};

const categoryBySlug: Record<string, string> = {
  "peptide-capsules": "Peptide Capsules",
  "peptide-blends": "Peptide Blends",
  "igf-1-proteins": "IGF-1 Proteins",
  "melanotan-peptides": "Melanotan Peptides",
  bioregulators: "Bioregulators",
  "cosmetic-peptides": "Cosmetic Peptides",
};

export default async function AllPeptidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const categorySlug = Array.isArray(category) ? category[0] : category;
  const initialCategory = categorySlug ? categoryBySlug[categorySlug] : undefined;

  return <ProductCollectionPage mode="all" initialCategory={initialCategory} />;
}
