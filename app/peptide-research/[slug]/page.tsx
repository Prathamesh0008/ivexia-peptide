import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RESEARCH_PAGES } from "@/data/researchPages.js";

type ResearchPage = {
  author?: string;
  bullets?: string[];
  categories?: string[];
  date?: string;
  id: number | string;
  paragraphs?: string[];
  sections?: { content?: string[]; heading?: string }[];
  slug: string;
  subtitle?: string;
  title: string;
};

const articles = RESEARCH_PAGES as ResearchPage[];

function brandResearchText(value: string) {
  return value
    .replace(/\bPeptide Sciences Research\b|\bPeptide Science\b/gi, "Ivexia Peptide")
    .replace(/\bBioregulators?\b|\bBioregulatory\b/gi, "Ivexia Peptide")
    .replace(/\bIvexia Peptide\s+peptide\b/gi, "Ivexia Peptide");
}

function getSummary(article: ResearchPage) {
  return (
    article.sections?.find((section) => /summary/i.test(section.heading || ""))
      ?.content?.[0] ||
    article.paragraphs?.[0] ||
    article.subtitle ||
    ""
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <article className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 lg:px-10">
        <LinkBack />

        <h1 className="mt-6 text-[34px] font-semibold leading-tight text-[#F04423]">
          {brandResearchText(article.title)}
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-12 text-[13px] text-[#5D6670]">
          <span className="inline-flex items-center gap-3">
            <UserRound size={26} fill="currentColor" strokeWidth={1.8} />
            By {article.author || "Dr. Logan"}
          </span>
          <span className="inline-flex items-center gap-3">
            <CalendarDays size={26} strokeWidth={1.8} />
            {article.date || "Loading..."}
          </span>
        </div>

        <section className="mt-10 space-y-3 text-black">
          <h2 className="text-[30px] font-semibold leading-tight text-black">
            Summary
          </h2>
          <p className="max-w-[900px] text-[16px] leading-[1.55] text-black">
            {brandResearchText(getSummary(article))}
          </p>
        </section>

        <div className="mt-12 space-y-8 text-[14px] leading-[1.65] text-black">
          {article.paragraphs?.slice(1).map((paragraph, index) => (
            <p key={`paragraph-${index + 1}`}>{brandResearchText(paragraph)}</p>
          ))}

          {article.sections?.filter((section) => !/summary/i.test(section.heading || "")).map((section, sectionIndex) => (
            <section key={`section-${sectionIndex}`} className="space-y-5 pt-4">
              {section.heading && (
                <h2 className="text-[30px] font-semibold leading-tight text-black">
                  {brandResearchText(section.heading)}
                </h2>
              )}
              {section.content?.map((paragraph, index) => (
                <p key={`section-${sectionIndex}-${index}`}>
                  {brandResearchText(paragraph)}
                </p>
              ))}
            </section>
          ))}

          {article.bullets && article.bullets.length > 0 && (
            <section className="pt-5">
              <h2 className="mb-4 text-[30px] font-semibold text-black">
                Key Research Points
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                {article.bullets.map((bullet) => (
                  <li key={bullet}>{brandResearchText(bullet)}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}

function LinkBack() {
  return (
    <Link href="/peptide-research" className="font-bold text-[#F04423] hover:text-[#D93618]">
      Back to Peptide Research
    </Link>
  );
}
