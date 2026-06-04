import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products.js";
import productDetails from "@/data/product_Details.js";
import type { Product } from "@/data/productTypes";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getChemicalPropertyImagesForProduct } from "@/lib/chemicalProperties";

const products = PRODUCTS as Product[];

type ProductDetail = {
  tagline?: string;
  topDescription?: Record<string, string>;
  content?: {
    overviewTitle?: string;
    overview?: string[];
    scientificBackgroundTitle?: string;
    scientificBackground?: string[];
    mechanismTitle?: string;
    mechanismPoints?: string[];
    applicationsTitle?: string;
    applications?: { title: string; text: string }[];
    molecularTitle?: string;
    molecularPoints?: string[];
    stabilityTitle?: string;
    stabilityPoints?: string[];
    solubilityTitle?: string;
    solubilityPoints?: string[];
    techSpecsTitle?: string;
    techSpecs?: Record<string, string>;
    validationTitle?: string;
    validationPoints?: string[];
    regulatoryTitle?: string;
    regulatoryText?: string;
    whyTitle?: string;
    whyText?: string;
    faqTitle?: string;
    faqItems?: { q: string; a: string }[];
  };
};

function getProduct(slug: string) {
  return products.find((product) => (product.slug || product.id) === slug);
}

function getProductDetail(slug: string) {
  return (productDetails.products as Record<string, ProductDetail>)[slug];
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug || product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  const details = getProductDetail(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={product}
      details={details}
      slug={slug}
      chemicalPropertyImages={getChemicalPropertyImagesForProduct(product)}
    />
  );
}
