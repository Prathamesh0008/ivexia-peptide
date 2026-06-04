import ProductCollectionPage from "@/components/ProductCollectionPage";

export const metadata = {
  title: "Bundle & Save | Ivexia Peptide",
  description: "Browse Ivexia Peptide bundles, blends, and category collections.",
};

export default function BundleSavePage() {
  return <ProductCollectionPage mode="bundle" />;
}
