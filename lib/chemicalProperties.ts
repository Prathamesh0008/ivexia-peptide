import fs from "node:fs";
import path from "node:path";
import type { Product } from "@/data/productTypes";

export type ChemicalPropertyImage = {
  category: string;
  fileName: string;
  label: string;
  src: string;
};

const CHEMICAL_PROPERTIES_ROOT = path.join(
  process.cwd(),
  "public",
  "chemicalproperties",
);
const DOCUMENTS_ROOT = path.join(process.cwd(), "public", "documents");

const IMAGE_EXTENSIONS = new Set([".gif", ".jpeg", ".jpg", ".png", ".webp"]);

function titleFromFileName(fileName: string) {
  return path
    .parse(fileName)
    .name.replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePublicSrc(src: string) {
  const withLeadingSlash = src.startsWith("/") ? src : `/${src}`;
  return withLeadingSlash.replace(/^\/public\//, "/").replace(/\\/g, "/");
}

function normalizeMatchText(value: string) {
  return value
    .toLowerCase()
    .replace(/®|™/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(peptide|peptides|blend|capsules|capsule|topical|vials|vial|kit|research|mg|mcg|g)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readDirectorySafely(directory: string) {
  try {
    return fs.readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
}

export function getAllChemicalPropertyImages() {
  const images: ChemicalPropertyImage[] = [];

  function walk(directory: string) {
    for (const entry of readDirectorySafely(directory)) {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (!entry.isFile() || !IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        continue;
      }

      const relativePath = path.relative(CHEMICAL_PROPERTIES_ROOT, entryPath);
      const publicPath = normalizePublicSrc(
        path.posix.join(
          "/chemicalproperties",
          ...relativePath.split(path.sep),
        ),
      );

      images.push({
        category: relativePath.split(path.sep)[0] || "chemicalproperties",
        fileName: entry.name,
        label: titleFromFileName(entry.name),
        src: publicPath,
      });
    }
  }

  walk(CHEMICAL_PROPERTIES_ROOT);

  return images.sort((left, right) => {
    const byCategory = left.category.localeCompare(right.category);
    return byCategory || left.label.localeCompare(right.label);
  });
}

export function getChemicalPropertyImagesForProduct(product: Product) {
  const selected = new Map<string, ChemicalPropertyImage>();

  for (const src of product.coaImages || []) {
    const normalizedSrc = normalizePublicSrc(src);

    selected.set(normalizedSrc.toLowerCase(), {
      category: normalizedSrc.split("/")[2] || "documents",
      fileName: normalizedSrc.split("/").pop() || normalizedSrc,
      label: titleFromFileName(normalizedSrc.split("/").pop() || normalizedSrc),
      src: normalizedSrc,
    });
  }

  for (const src of product.descriptionImages || []) {
    const normalizedSrc = normalizePublicSrc(src);

    selected.set(normalizedSrc.toLowerCase(), {
      category: normalizedSrc.split("/")[2] || "chemicalproperties",
      fileName: normalizedSrc.split("/").pop() || normalizedSrc,
      label: titleFromFileName(normalizedSrc.split("/").pop() || normalizedSrc),
      src: normalizedSrc,
    });
  }

  if (selected.size === 0) {
    const productText = normalizeMatchText(`${product.name} ${product.slug || ""} ${product.id}`);

    for (const entry of readDirectorySafely(DOCUMENTS_ROOT)) {
      if (!entry.isDirectory()) {
        continue;
      }

      const folderText = normalizeMatchText(entry.name);

      if (
        !folderText ||
        (!productText.includes(folderText) && !folderText.includes(productText.split(" ")[0] || ""))
      ) {
        continue;
      }

      const folderPath = path.join(DOCUMENTS_ROOT, entry.name);

      for (const file of readDirectorySafely(folderPath)) {
        if (!file.isFile() || !IMAGE_EXTENSIONS.has(path.extname(file.name).toLowerCase())) {
          continue;
        }

        const publicPath = normalizePublicSrc(
          path.posix.join("/documents", entry.name, file.name),
        );

        selected.set(publicPath.toLowerCase(), {
          category: entry.name,
          fileName: file.name,
          label: titleFromFileName(file.name),
          src: publicPath,
        });
      }
    }
  }

  return Array.from(selected.values());
}
