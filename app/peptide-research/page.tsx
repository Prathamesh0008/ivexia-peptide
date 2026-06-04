import Link from "next/link";
import { Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RESEARCH_PAGES } from "@/data/researchPages.js";

type ResearchPage = {
  author?: string;
  categories?: string[];
  date?: string;
  excerpt?: string;
  id: number | string;
  paragraphs?: string[];
  sections?: { content?: string[]; heading?: string }[];
  slug: string;
  title: string;
};

const articles = RESEARCH_PAGES as ResearchPage[];

function brandResearchText(value: string) {
  return value
    .replace(/\bPeptide Sciences Research\b|\bPeptide Science\b/gi, "Ivexia Peptide")
    .replace(/\bBioregulators?\b|\bBioregulatory\b/gi, "Ivexia Peptide")
    .replace(/\bIvexia Peptide\s+peptide\b/gi, "Ivexia Peptide");
}

function getPreview(article: ResearchPage) {
  return brandResearchText(
    article.excerpt ||
      article.paragraphs?.[0] ||
      article.sections?.find((section) => section.content?.length)?.content?.[0] ||
      "",
  );
}

export const metadata = {
  title: "Ivexia Peptide Research",
  description: "Research-use-only peptide article library from Ivexia Peptide.",
};

export default function PeptideResearchPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#090909]">
      <Navbar />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4">
        <aside className="md:col-span-1">
          <ResearchSidebar />
        </aside>

        <div className="max-w-[880px] md:col-span-3">
          <h1 className="mb-6 text-[42px] font-semibold text-[#090909]">
            Ivexia Peptide Research
          </h1>

          <div className="mb-14 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-6 py-6 text-[#56585C]">
            Articles and product information on this website are provided for
            informational and educational purposes only. Products are furnished
            for in-vitro research use only and are not medicines or drugs.
          </div>

          <div className="space-y-14">
            {articles.map((article) => (
              <article key={article.slug}>
                <Link
                  href={`/peptide-research/${article.slug}`}
                  className="block text-[22px] font-semibold text-[#F04423] hover:underline"
                >
                  {brandResearchText(article.title)}
                </Link>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {article.author || "Ivexia Peptide"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {article.date || "Research Article"}
                  </span>
                </div>

                <p className="mt-4 text-[16px] leading-[1.8] text-[#374151]">
                  {getPreview(article)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ResearchSidebar() {
  return (
    <nav className="sticky top-28 space-y-3 border-r border-[#E5E5E5] pr-6 text-sm">
      <h2 className="mb-4 text-lg font-semibold text-[#F04423]">
        Peptide Research
      </h2>

      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/peptide-research/${article.slug}`}
          className="block leading-5 text-[#56585C] transition hover:text-[#F04423]"
        >
          {brandResearchText(article.title)}
        </Link>
      ))}
    </nav>
  );
}
