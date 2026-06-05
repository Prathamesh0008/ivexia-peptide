//app\about\page.tsx
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const countrySections = [
  {
    heading: "Ivexia Peptide in Germany",
    subheading: "Research peptide information for German laboratories",
    image: "/abaut.png.jpg",
    bulletHeading: "What visitors can expect:",
    paragraphs: [
      "Ivexia Peptide provides organized research-use-only peptide information with clear categories, product details, and professional navigation.",
      "The experience is built for users who need fast access to peptide research references and product information.",
    ],
    bullets: ["Structured peptide categories", "Readable research references", "Clear product browsing"],
  },
  {
    heading: "Ivexia Peptide in France",
    subheading: "Clean browsing for research-focused audiences",
    image: "/Hexagonal1.png",
    bulletHeading: "Our approach includes:",
    paragraphs: [
      "The website keeps peptide content simple to scan, with product lists, article pages, and information pages using consistent spacing and hierarchy.",
      "Ivexia colors and branding remain intact while the overall layout follows a clean, professional reference structure.",
    ],
    bullets: ["Consistent page layout", "Ivexia orange accent color", "Responsive desktop and mobile pages"],
  },
  {
    heading: "Ivexia Peptide in the Netherlands",
    subheading: "Product discovery made straightforward",
    image: "/DNA.png",
    bulletHeading: "Catalog strengths:",
    paragraphs: [
      "Collection pages are organized around left category navigation, horizontal category filters, and compact product cards.",
      "This makes it easier to move between all peptides, popular peptides, bundles, and individual product pages.",
    ],
    bullets: ["All Peptides route", "Popular Peptides route", "Bundle & Save route"],
  },
  {
    heading: "Ivexia Peptide in Italy",
    subheading: "Research content with better structure",
    image: "/medicin.png",
    bulletHeading: "Information pages include:",
    paragraphs: [
      "Peptide information and peptide research sections are arranged for easier reading, with article previews, sidebars, and clear calls to action.",
      "Content remains positioned for research and educational reference only.",
    ],
    bullets: ["Peptide information library", "Research article previews", "Research-use-only notices"],
  },
  {
    heading: "Ivexia Peptide in Spain",
    subheading: "Support and company information",
    image: "/b.png",
    bulletHeading: "Support experience:",
    paragraphs: [
      "The contact and company pages are designed with clean two-column and section-based presentation.",
      "Visitors can find support details, company values, and page navigation without losing the Ivexia brand look.",
    ],
    bullets: ["Dedicated contact page", "Company overview", "Mission and ethics sections"],
  },
];

const featureCards = [
  "Clean catalog structure for research products.",
  "Consistent Ivexia Peptide branding and orange accent system.",
  "Information pages styled for quick scanning and readability.",
  "Support details available through a dedicated contact page.",
  "Collection pages organized by product category.",
  "Research-use-only messaging throughout the experience.",
];

export const metadata = {
  title: "About Ivexia Peptide",
  description: "Learn about Ivexia Peptide research-use-only product information and company values.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#374151]">
      <Navbar />

      <section className="mx-auto max-w-[1300px] space-y-10 px-4 py-8 sm:space-y-14 sm:px-6 sm:py-12 lg:space-y-24 lg:py-20">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-[#F04423]" />
            <span className="text-sm font-semibold uppercase text-[#F04423]">
              Company Overview
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#090909] md:text-4xl">
            About Ivexia Peptide
          </h1>

          {countrySections.map((country, index) => (
            <section
              key={country.heading}
              className="grid items-center gap-6 pt-8 sm:gap-8 sm:pt-10 lg:grid-cols-2 lg:gap-12 lg:pt-16"
            >
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <h2 className="text-2xl font-bold text-[#090909]">
                  {country.heading}
                </h2>

                <p className="text-lg font-medium text-[#F04423]">
                  {country.subheading}
                </p>

                <div className="mt-4 space-y-4 leading-relaxed">
                  {country.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[#090909]">
                  {country.bulletHeading}
                </h3>

                <ul className="mt-2 list-inside list-disc space-y-1">
                  {country.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div
               className={`relative flex h-[220px] w-full max-w-[460px] items-center justify-center overflow-hidden rounded-xl bg-[#FFF7F4] sm:h-[260px] lg:h-[300px] ${
  index % 2 !== 0 ? "lg:order-1 lg:justify-self-start" : "lg:justify-self-end"
}`}
              >
                <Image
                  src={country.image}
                  alt={country.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover lg:object-cover"
                />
              </div>
            </section>
          ))}
        </div>

        <section className="grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-[#E5E5E5] p-8">
            <h2 className="text-2xl font-semibold text-[#090909]">Mission</h2>
            <p className="mt-3 leading-relaxed">
              To provide a clean, professional, and easy-to-navigate peptide
              reference experience for research-focused visitors.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E5E5] p-8">
            <h2 className="text-2xl font-semibold text-[#090909]">Vision</h2>
            <p className="mt-3 leading-relaxed">
              To keep Ivexia Peptide product and research information organized,
              readable, and consistent across every page.
            </p>
          </div>
        </section>

        <section className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#090909]">
              Quality, Service, and Value
            </h2>
            <p>
              Ivexia Peptide focuses on a clear research-use-only browsing
              experience, structured product categories, and readable article
              pages.
            </p>
            <p>
              The page layout uses a clean section rhythm while
              preserving Ivexia’s colors, logo, and brand identity.
            </p>
          </div>

          <div className="relative h-[300px] max-w-[460px] overflow-hidden rounded-xl bg-[#FFF7F4] lg:justify-self-end">
            <Image
              src="/abaut.png.jpg"
              alt="Lab research"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-[#090909]">Why Choose Us</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <div key={feature} className="rounded-xl border border-[#E5E5E5] p-6">
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] p-8">
          <h2 className="text-2xl font-semibold text-[#090909]">Ethics</h2>
          <p className="mt-3 leading-relaxed">
            Ivexia Peptide content is presented for informational and research
            reference purposes only and is not intended as medical advice.
          </p>
        </section>
      </section>

      <Footer />
    </main>
  );
}
