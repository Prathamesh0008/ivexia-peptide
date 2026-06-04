import ProductCollectionPage from "@/components/ProductCollectionPage";

export const metadata = {
  title: "All Peptides | Ivexia Peptide",
  description: "Browse all Ivexia Peptide research-use-only products.",
};

export default function AllPeptidesPage() {
  return <ProductCollectionPage mode="all" />;
}
