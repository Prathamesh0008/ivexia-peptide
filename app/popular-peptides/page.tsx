import ProductCollectionPage from "@/components/ProductCollectionPage";

export const metadata = {
  title: "Popular Peptides | Ivexia Peptide",
  description: "Browse popular Ivexia Peptide research-use-only products.",
};

export default function PopularPeptidesPage() {
  return <ProductCollectionPage mode="popular" />;
}
