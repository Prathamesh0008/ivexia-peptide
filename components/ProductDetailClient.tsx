"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/components/LanguageProvider";
import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";
import type { ChemicalPropertyImage } from "@/lib/chemicalProperties";

type ProductDetail = {
  name?: string;
  category?: string;
  description?: string;
  strength?: string | string[];
  tagline?: string;
  sequence?: string;
  molecularFormula?: string;
  molecularWeight?: string;
  pubChemSID?: string;
  synonyms?: string | string[];
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

function mergeDetails(base?: ProductDetail, translated?: ProductDetail): ProductDetail | undefined {
  if (!base && !translated) {
    return undefined;
  }

  return {
    ...base,
    ...translated,
    topDescription: {
      ...(base?.topDescription || {}),
      ...(translated?.topDescription || {}),
    },
    content: {
      ...(base?.content || {}),
      ...(translated?.content || {}),
    },
  };
}

function normalizeText(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join("\n\n");
  }

  return value || "";
}

export default function ProductDetailClient({
  product,
  details,
  slug,
  chemicalPropertyImages,
}: {
  product: Product;
  details?: ProductDetail;
  slug: string;
  chemicalPropertyImages: ChemicalPropertyImage[];
}) {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const translatedDetails = translations?.products?.[slug] as ProductDetail | undefined;
  const t = (key: string, fallback: string) => navigation[key] || fallback;
  const displayDetails = mergeDetails(details, translatedDetails);
  const strengthText = normalizeText(displayDetails?.strength) || product.strength;
  const displayProduct: Product = {
    ...product,
    name: displayDetails?.name || product.name,
    category: displayDetails?.category || product.category,
    description: displayDetails?.description || product.description,
    strength: strengthText,
  };
  const topPreviewText =
    displayProduct.description ||
    Object.values(displayDetails?.topDescription || {})[0] ||
    strengthText;

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/#products"
            className="cursor-pointer text-sm font-medium text-[#F04423] transition hover:text-[#D93A18]"
          >
            {t("backToProducts", "Back to Products")}
          </Link>

          <section className="mt-8 grid gap-8 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)_320px]">
            <div className="self-start overflow-hidden rounded-md border border-[#E5E5E5] bg-white shadow-sm">
              <div className="flex aspect-[0.72] items-center justify-center bg-[#FFF8F5] p-4">
                <Image
                  src={product.image || "/medicineproduct.jpg"}
                  alt={displayProduct.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="min-w-0">
              {displayProduct.category && (
                <p className="inline-flex rounded-md bg-[#F04423] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {displayProduct.category}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-semibold leading-tight text-[#111827] md:text-[44px]">
                  {displayProduct.name}
                </h1>
                <span className="rounded-md bg-[#F04423] px-3 py-1 text-sm font-semibold text-white">
                  {t("freeShipping", "FREE Shipping")}
                </span>
              </div>

              {displayDetails?.tagline && (
                <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-black">
                  {displayDetails.tagline}
                </p>
              )}

              {topPreviewText && (
                <p
                  className="mt-8 max-w-2xl overflow-hidden text-[15px] leading-7 text-black"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 5,
                  }}
                >
                  {topPreviewText}
                </p>
              )}
            </div>

            <div className="self-start lg:col-start-2 xl:col-start-auto">
              <ProductPurchasePanel product={displayProduct} t={t} />
            </div>

            <div className="lg:col-span-2 xl:col-span-3">
              <ProductInformationTabs
                chemicalPropertyImages={chemicalPropertyImages}
                details={displayDetails}
                product={displayProduct}
                sourceProduct={product}
                t={t}
              />
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductInformationTabs({
  chemicalPropertyImages,
  details,
  product,
  sourceProduct,
  t,
}: {
  chemicalPropertyImages: ChemicalPropertyImage[];
  details?: ProductDetail;
  product: Product;
  sourceProduct: Product;
  t: (key: string, fallback: string) => string;
}) {
  const [activeTab, setActiveTab] = useState<"description" | "coa" | "storage">(
    "description",
  );
  const tabContentRef = useRef<HTMLDivElement>(null);
  const productList = PRODUCTS as Product[];
  const productsByCategory = productList.reduce<Record<string, Product[]>>(
    (groups, item) => {
      const category = item.category || "Products";
      groups[category] = groups[category] || [];
      groups[category].push(item);
      return groups;
    },
    {},
  );
  const tabs = [
    { id: "description" as const, label: "DESCRIPTION" },
    { id: "coa" as const, label: "COA / HPLC / MS" },
    { id: "storage" as const, label: "STORAGE" },
  ];
  const openTab = (tabId: "description" | "coa" | "storage") => {
    setActiveTab(tabId);
    window.requestAnimationFrame(() => {
      tabContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section className="mt-2 grid gap-8 border-t border-[#E5E5E5] pt-10 lg:grid-cols-[280px_1fr]">
      <aside>
        <h2 className="text-xl font-semibold text-[#F04423]">
          Product List
        </h2>
        <div className="mt-8 space-y-8">
          {Object.entries(productsByCategory).map(([category, items]) => (
            <section key={category}>
              <h3 className="mb-4 text-lg font-black text-[#090909]">
                {category}
              </h3>
              <ul className="space-y-3 text-sm leading-6 text-[#111827]">
                {items.map((item) => (
                  <li key={item.slug || item.id}>
                    <Link
                      href={`/products/${item.slug || item.id}`}
                      className={`block transition hover:text-[#F04423] ${
                        (item.slug || item.id) === (product.slug || product.id)
                          ? "font-semibold text-[#F04423]"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap gap-10 border-b border-[#E5E5E5]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => openTab(tab.id)}
              className={`pb-4 text-xl font-medium transition ${
                activeTab === tab.id
                  ? "border-b-2 border-[#F04423] text-[#F04423]"
                  : "text-[#111827] hover:text-[#F04423]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div ref={tabContentRef} className="relative scroll-mt-36 overflow-hidden bg-white pt-10">
          {activeTab === "description" && (
            <FullDescriptionContent
              chemicalPropertyImages={chemicalPropertyImages}
              details={details}
              product={product}
              sourceProduct={sourceProduct}
              t={t}
            />
          )}

          {activeTab === "coa" &&
            renderChemicalPropertyImages(chemicalPropertyImages, sourceProduct, details)}

          {activeTab === "storage" && (
            <StorageInstructions product={product} t={t} />
          )}
        </div>
      </div>
    </section>
  );
}

function StorageInstructions({
  product,
  t,
}: {
  product: Product;
  t: (key: string, fallback: string) => string;
}) {
  return (
  <div className="space-y-8 text-[16px] font-normal leading-[1.65] text-black">
  <div className="space-y-7">
    <h2 className="text-[20px] font-bold leading-relaxed text-black">
      Storage Instructions:
    </h2>

    <p>
      All of our products are manufactured using the{" "}
      <strong>Lyophilization (Freeze Drying)</strong> process, which ensures
      that our products remain{" "}
      <strong>100% stable for shipping</strong> for up to{" "}
      <strong>3-4 months.</strong>
      <br />
      Once the peptides are{" "}
      <strong>reconstituted (mixed with bacteriostatic water)</strong>, they
      must be <strong>stored in the fridge</strong> to maintain stability. After
      reconstitution, the peptides will remain{" "}
      <strong>stable for up to 30 days.</strong>
    </p>
  </div>

  <p>
    Lyophilization is a unique dehydration process, also known as
    cryodesiccation, where the peptides are frozen and then subjected to low
    pressure. This causes the water in the peptide vial to sublimate directly
    from solid to gas, leaving behind a stable, crystalline white structure
    known as lyophilized peptide. The puffy white powder can be stored at room
    temperature until you&apos;re ready to reconstitute it with bacteriostatic
    water.
  </p>

  <p>
    Once peptides have been received, it is imperative that they are kept cold
    and away from light. If the peptides will be used immediately, or in the
    next several days, weeks or months, short-term refrigeration under 4C (39F)
    is generally acceptable. Lyophilized peptides are usually stable at room
    temperatures for several weeks or more, so if they will be utilized within
    weeks or months such storage is typically adequate.
  </p>

  <p>
    However, for longer term storage (several months to years) it is more
    preferable to store peptides in a freezer at -80C (-112F). When storing
    peptides for months or even years, freezing is optimal in order to preserve
    the peptide&apos;s stability.
  </p>

  <div className="space-y-7">
    <p>For further information on proper storage techniques, click the link below:</p>

    <Link
      href="/peptide-storage"
      className="inline-block text-[16px] font-normal text-[#F04423] transition hover:text-[#D93618]"
    >
      Peptide Storage Information
    </Link>
  </div>

  {(product.storage || product.researchStatus || product.purity || product.appearance) && (
    <div className="grid gap-4 border-t border-[#E5E5E5] pt-8 text-[14px] font-normal leading-6 text-[#56585C] md:grid-cols-2">
      {product.storage && <Info label={t("storage", "Storage")} value={product.storage} />}
      {product.researchStatus && (
        <Info label={t("status", "Status")} value={product.researchStatus} />
      )}
      {product.purity && <Info label={t("purity", "Purity")} value={product.purity} />}
      {product.appearance && (
        <Info label={t("appearance", "Appearance")} value={product.appearance} />
      )}
    </div>
  )}
</div>
  );
}

function getDiscountForQuantity(quantity: number) {
  if (quantity >= 10) {
    return 0.08;
  }

  if (quantity >= 5) {
    return 0.07;
  }

  if (quantity >= 3) {
    return 0.04;
  }

  return 0;
}

function ProductPurchasePanel({
  product,
  t,
}: {
  product: Product;
  t: (key: string, fallback: string) => string;
}) {
  const [quantity, setQuantity] = useState(1);
  const basePrice = typeof product.price === "number" ? product.price : 0;
  const discount = getDiscountForQuantity(quantity);
  const unitPrice = basePrice * (1 - discount);
  const cartProduct = {
    ...product,
    price: unitPrice,
  };
  const bulkOptions = [
    { quantity: 3, discount: 0.04 },
    { quantity: 5, discount: 0.07 },
    { quantity: 10, discount: 0.08 },
  ];

  function updateQuantity(nextQuantity: number) {
    setQuantity(Math.max(1, Math.min(99, nextQuantity)));
  }

  return (
    <section className="w-full max-w-[320px] rounded-md bg-white pr-1 xl:ml-auto">
      {typeof product.price === "number" && (
        <p className="text-3xl font-semibold leading-none text-[#F04423]">
          ${unitPrice.toFixed(2)}
        </p>
      )}

      <div className="mt-7 inline-grid grid-cols-3 overflow-hidden rounded-md border border-[#8A8A8A] bg-white">
        <button
          type="button"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
          className="flex h-[52px] w-[62px] items-center justify-center border-r border-[#8A8A8A] text-[#8A8A8A] transition hover:text-[#F04423] disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <Minus size={20} />
        </button>
        <span className="flex h-[52px] w-[66px] items-center justify-center border-r border-[#8A8A8A] text-lg text-[#2F4058]">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(quantity + 1)}
          className="flex h-[52px] w-[62px] items-center justify-center text-[#6B6B6B] transition hover:text-[#F04423]"
          aria-label="Increase quantity"
        >
          <Plus size={23} />
        </button>
      </div>

      <AddToCartButton
        product={cartProduct}
        quantity={quantity}
        showIcon={false}
        className="mt-6 min-h-[56px] rounded-lg text-lg"
      />

      <div className="mt-6 space-y-2">
        {bulkOptions.map((option) => {
          const optionPrice = basePrice * (1 - option.discount);

          return (
            <button
              key={option.quantity}
              type="button"
              onClick={() => setQuantity(option.quantity)}
              className="flex w-full items-center justify-between gap-4 rounded-lg border border-[#E5E5E5] bg-white px-4 py-3 text-sm shadow-sm transition hover:border-[#F04423]"
            >
              <span className="rounded-md border border-[#F04423] px-4 py-2 font-semibold text-[#F04423]">
                {t("buyQuantitySave", "Buy {quantity} and save {discount}%")
                  .replace("{quantity}", String(option.quantity))
                  .replace("{discount}", String(Math.round(option.discount * 100)))}
              </span>
              <span className="text-[#111827]">
                <strong>${optionPrice.toFixed(2)}</strong>{" "}
                {t("each", "each")}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FullDescriptionContent({
  chemicalPropertyImages,
  details,
  product,
  sourceProduct,
  t,
}: {
  chemicalPropertyImages: ChemicalPropertyImage[];
  details?: ProductDetail;
  product: Product;
  sourceProduct: Product;
  t: (key: string, fallback: string) => string;
}) {
  const [activeSection, setActiveSection] = useState<
    "overview" | "structure" | "research" | "citations"
  >("overview");
  const sectionContentRef = useRef<HTMLDivElement>(null);
  const productName = product.name.replace(/\s+\d+(mg|mcg|g)\b/gi, "").trim();
  const content = details?.content;
  const sectionLinks = [
    { id: "overview" as const, label: `${productName} Overview` },
    { id: "structure" as const, label: `${productName} Structure` },
    { id: "research" as const, label: `${productName} Research` },
    { id: "citations" as const, label: "Referenced Citations" },
  ];
  const useStackedSectionLinks = sectionLinks.some((link) => link.label.length > 30);

  return (
    <div className="space-y-10">
      <section className="relative min-h-[380px] overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-white p-8 sm:p-12">
        <div className="pointer-events-none absolute inset-y-0 left-[70px] w-[240px]">
          <Image
            src="/DNA1.jpeg"
            alt=""
            fill
            sizes="240px"
            className="object-cover object-left opacity-[0.12]"
          />
        </div>
        <div
          className={`relative z-10 ml-auto min-h-[260px] py-12 ${
            useStackedSectionLinks
              ? "flex max-w-[720px] items-center pl-6"
              : "flex max-w-[700px] items-center justify-center gap-[72px]"
          }`}
        >
          {useStackedSectionLinks ? (
            <div className="w-full max-w-[680px] space-y-7">
              {sectionLinks.map((item) => {
                const pointNumber = sectionLinks.findIndex((link) => link.id === item.id) + 1;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id);
                      window.requestAnimationFrame(() => {
                        sectionContentRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      });
                    }}
                    className={`flex w-full cursor-pointer items-start gap-5 text-left text-[21px] font-semibold leading-tight transition hover:text-[#D93618] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F04423] ${
                      activeSection === item.id
                        ? "text-[#F04423] underline decoration-[#F04423] underline-offset-8"
                        : "text-[#F04423]"
                    }`}
                  >
                    <span className="w-6 shrink-0 text-right text-black">{pointNumber}.</span>
                    <span className="max-w-[600px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            [sectionLinks.slice(0, 2), sectionLinks.slice(2)].map((column, columnIndex) => (
              <div key={`description-point-column-${columnIndex}`} className="w-[300px] space-y-8">
                {column.map((item) => {
                  const pointNumber = sectionLinks.findIndex((link) => link.id === item.id) + 1;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSection(item.id);
                        window.requestAnimationFrame(() => {
                          sectionContentRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        });
                      }}
                      className={`flex w-full cursor-pointer items-center gap-5 text-left text-[22px] font-semibold transition hover:text-[#D93618] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F04423] ${
                        activeSection === item.id
                          ? "text-[#F04423] underline decoration-[#F04423] underline-offset-8"
                          : "text-[#F04423]"
                      }`}
                    >
                      <span className="w-6 shrink-0 text-right text-black">{pointNumber}.</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </section>

      <section ref={sectionContentRef} className="scroll-mt-36 rounded-[18px] border border-[#E5E5E5] bg-white p-6 sm:p-8">
        {activeSection === "overview" && (
          <div className="space-y-5 text-sm leading-7 text-[#374151]">
            <h2 className="text-2xl font-semibold text-[#111827]">
              {sectionLinks[0].label}
            </h2>
            {product.description && <p>{product.description}</p>}
            {product.strength && <TextBlock value={product.strength} />}
            {details?.topDescription && (
              <div className="space-y-4">
                {Object.values(details.topDescription).map((paragraph, index) => (
                  <p key={`description-top-${index}`}>{paragraph}</p>
                ))}
              </div>
            )}
            {content?.overview?.map((paragraph, index) => (
              <p key={`overview-inline-${index}`}>{paragraph}</p>
            ))}
            {!product.description && !product.strength && !details?.topDescription && !content?.overview?.length && (
              <p>
                {product.name} is listed as a research-use-only peptide product
                with available specifications, purity, and product data shown
                on this page.
              </p>
            )}
          </div>
        )}

        {activeSection === "structure" && (
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-[#111827]">
              {sectionLinks[1].label}
            </h2>
            <div className="grid gap-4 text-sm leading-6 text-[#56585C] sm:grid-cols-2">
              {sourceProduct.size && <Info label={t("size", "Size")} value={sourceProduct.size} />}
              {sourceProduct.purity && (
                <Info label={t("purity", "Purity")} value={sourceProduct.purity} />
              )}
              {sourceProduct.cas && <Info label="CAS" value={sourceProduct.cas} />}
              {sourceProduct.appearance && (
                <Info
                  label={t("appearance", "Appearance")}
                  value={sourceProduct.appearance}
                />
              )}
            </div>
            {content?.molecularPoints && content.molecularPoints.length > 0 && (
              <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-[#374151]">
                {content.molecularPoints.map((point, index) => (
                  <li key={`structure-molecular-${index}`}>{point}</li>
                ))}
              </ul>
            )}
            <ChemicalFactList product={sourceProduct} details={details} />
            {!content?.molecularPoints?.length && (
              <p className="text-sm leading-7 text-[#374151]">
                Structure details for {product.name} include available size,
                purity, CAS, and appearance data listed above.
              </p>
            )}
          </div>
        )}

        {activeSection === "research" && (
          <div className="space-y-6 text-sm leading-7 text-[#374151]">
            <h2 className="text-2xl font-semibold text-[#111827]">
              {sectionLinks[2].label}
            </h2>
            {content?.scientificBackground?.map((paragraph, index) => (
              <p key={`research-scientific-${index}`}>{paragraph}</p>
            ))}
            {content?.mechanismPoints && content.mechanismPoints.length > 0 && (
              <ul className="grid list-disc gap-2 pl-5">
                {content.mechanismPoints.map((point, index) => (
                  <li key={`research-mechanism-${index}`}>{point}</li>
                ))}
              </ul>
            )}
            {sourceProduct.applications && sourceProduct.applications.length > 0 && (
              <div>
                <h3 className="text-xl font-medium text-[#111827]">
                  {t("applications", "Applications")}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sourceProduct.applications.map((application) => (
                    <li
                      key={application}
                      className="rounded-md border border-[#E5E5E5] px-4 py-3"
                    >
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content?.applications && content.applications.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {content.applications.map((application, index) => (
                  <div key={`research-app-${index}`} className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                    <h3 className="font-semibold text-[#111827]">{application.title}</h3>
                    <p className="mt-2">{application.text}</p>
                  </div>
                ))}
              </div>
            )}
            {!content?.scientificBackground?.length &&
              !content?.mechanismPoints?.length &&
              !sourceProduct.applications?.length &&
              !content?.applications?.length && (
                <p>
                  Research information for {product.name} is shown from the
                  available product description, strength, and research-use-only
                  specifications for this compound.
                </p>
              )}
          </div>
        )}

        {activeSection === "citations" && (
          <div className="space-y-5 text-sm leading-7 text-[#374151]">
            <h2 className="text-2xl font-semibold text-[#111827]">
              {sectionLinks[3].label}
            </h2>
            {content?.validationPoints && content.validationPoints.length > 0 ? (
              <ul className="grid list-disc gap-2 pl-5">
                {content.validationPoints.map((point, index) => (
                  <li key={`citation-validation-${index}`}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>
                Certificates of analysis, HPLC/MS validation, and referenced
                research documentation are provided when available for this
                research-use-only compound.
              </p>
            )}
            {content?.regulatoryText && <p>{content.regulatoryText}</p>}
            {content?.faqItems && content.faqItems.length > 0 && (
              <div className="space-y-4">
                {content.faqItems.slice(0, 4).map((faq, index) => (
                  <div key={`citation-faq-${index}`} className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                    <p className="font-semibold text-[#111827]">{faq.q}</p>
                    <p className="mt-2">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="rounded-[18px] border border-[#E5E5E5] bg-white p-6 sm:p-8">
        {renderChemicalPropertyImages(chemicalPropertyImages, sourceProduct, details)}
      </section>

      {details?.content && (
        <div className="space-y-8">
          {renderContent(details.content)}
        </div>
      )}
    </div>
  );
}

function TextBlock({ value }: { value: string }) {
  return (
    <>
      {value.split("\n\n").map((paragraph, index) => (
        <p key={`text-block-${index}`}>{paragraph}</p>
      ))}
    </>
  );
}

function getChemicalFacts(product: Product, details?: ProductDetail) {
  const productWithFacts = product as Product & {
    sequence?: string;
    molecularFormula?: string;
    molecularWeight?: string;
    pubChemSID?: string;
    synonyms?: string | string[];
  };
  const synonyms = details?.synonyms || productWithFacts.synonyms;

  return [
    { label: "Sequence", value: details?.sequence || productWithFacts.sequence },
    {
      label: "Molecular Formula",
      value: details?.molecularFormula || productWithFacts.molecularFormula,
    },
    {
      label: "Molecular Weight",
      value: details?.molecularWeight || productWithFacts.molecularWeight,
    },
    { label: "PubChem SID", value: details?.pubChemSID || productWithFacts.pubChemSID },
    { label: "CAS Number", value: product.cas },
    {
      label: "Synonyms",
      value: Array.isArray(synonyms) ? synonyms.join(", ") : synonyms,
    },
  ].filter((item) => item.value && String(item.value).trim().length > 0);
}

function ChemicalFactList({
  product,
  details,
}: {
  product: Product;
  details?: ProductDetail;
}) {
  const facts = getChemicalFacts(product, details);

  if (facts.length === 0) {
    return null;
  }

  return (
    <dl className="mt-6 space-y-2 text-base leading-7 text-black">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="inline font-bold">{fact.label}: </dt>
          <dd className="inline">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function renderChemicalPropertyImages(
  images: ChemicalPropertyImage[],
  product: Product,
  details?: ProductDetail,
) {
  const hasFacts = getChemicalFacts(product, details).length > 0;

  return (
    <section className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">Chemical Property Visualizations</h3>
      {images.length === 0 && (
        <p className="text-sm leading-6 text-[#56585C]">
          No chemical property images are available for this product yet.
        </p>
      )}
      <div className="grid gap-8">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className="overflow-hidden rounded-md border border-[#E5E5E5] bg-white"
          >
            <div className="border-b border-[#E5E5E5] bg-white px-4 py-3 text-lg font-semibold text-[#111827]">
              {index + 1}.
            </div>
            <div className="flex items-center justify-center bg-[#F7F7F7]">
            <Image
              src={image.src}
              alt={image.label}
              width={400}
              height={300}
              className="h-auto w-full object-contain"
            />
            </div>
            <figcaption className="border-t border-[#E5E5E5] bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F04423]">
                {image.category}
              </p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#111827]">
                {image.label}
              </p>
              <ChemicalFactList product={product} details={details} />
            </figcaption>
          </figure>
        ))}
      </div>
      {images.length === 0 && hasFacts && (
        <div className="rounded-md border border-[#E5E5E5] bg-white p-5">
          <ChemicalFactList product={product} details={details} />
        </div>
      )}
    </section>
  );
}

function renderContent(content: NonNullable<ProductDetail["content"]>) {
  return (
    <div className="space-y-10">
      {content.overviewTitle && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.overviewTitle}
          </h2>
          {content.overview?.map((paragraph, index) => (
            <p key={`overview-${index}`} className="text-sm leading-7 text-[#374151]">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {content.scientificBackgroundTitle && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.scientificBackgroundTitle}
          </h2>
          {content.scientificBackground?.map((paragraph, index) => (
            <p key={`scientific-${index}`} className="text-sm leading-7 text-[#374151]">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {content.mechanismTitle && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.mechanismTitle}
          </h2>
          <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-[#374151]">
            {content.mechanismPoints?.map((point, index) => (
              <li key={`mechanism-${index}`}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {content.applicationsTitle && content.applications && content.applications.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.applicationsTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.applications.map((application, index) => (
              <div key={`app-${index}`} className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                <h3 className="font-semibold text-[#111827]">{application.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#374151]">{application.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.molecularTitle && content.molecularPoints && content.molecularPoints.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.molecularTitle}
          </h2>
          <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-[#374151]">
            {content.molecularPoints.map((point, index) => (
              <li key={`molecular-${index}`}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {content.stabilityTitle && content.stabilityPoints && content.stabilityPoints.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.stabilityTitle}
          </h2>
          <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-[#374151]">
            {content.stabilityPoints.map((point, index) => (
              <li key={`stability-${index}`}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {content.solubilityTitle && content.solubilityPoints && content.solubilityPoints.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.solubilityTitle}
          </h2>
          <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-[#374151]">
            {content.solubilityPoints.map((point, index) => (
              <li key={`solubility-${index}`}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {content.techSpecsTitle && content.techSpecs && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.techSpecsTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(content.techSpecs).map(([key, value]) => (
              <div key={key} className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F04423]">
                  {key}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#374151]">{value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.validationTitle && content.validationPoints && content.validationPoints.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.validationTitle}
          </h2>
          <ul className="grid list-disc gap-2 pl-5 text-sm leading-7 text-[#374151]">
            {content.validationPoints.map((point, index) => (
              <li key={`validation-${index}`}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {content.regulatoryTitle && content.regulatoryText && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.regulatoryTitle}
          </h2>
          <p className="text-sm leading-7 text-[#374151]">{content.regulatoryText}</p>
        </section>
      )}

      {content.whyTitle && content.whyText && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">
            {content.whyTitle}
          </h2>
          <p className="text-sm leading-7 text-[#374151]">{content.whyText}</p>
        </section>
      )}

      {content.faqTitle && content.faqItems && content.faqItems.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#111827]">{content.faqTitle}</h2>
          <div className="space-y-4">
            {content.faqItems.map((faq, index) => (
              <div key={`faq-${index}`} className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                <p className="font-semibold text-[#111827]">{faq.q}</p>
                <p className="mt-2 text-sm leading-7 text-[#374151]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F04423]">
        {label}
      </p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
