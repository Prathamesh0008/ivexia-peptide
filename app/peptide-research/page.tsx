import Link from "next/link";
import { CalendarDays, CircleAlert, UserRound } from "lucide-react";
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

const categories = Array.from(
  new Set(articles.flatMap((article) => article.categories || [])),
).sort((left, right) => left.localeCompare(right));

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

function getPostedIn(article: ResearchPage) {
  return (article.categories || []).slice(0, 3).map(brandResearchText).join(" ");
}

function isHumaninResearch(article: ResearchPage) {
  return article.slug === "humanin-research";
}

export default function PeptideResearchPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1580px] gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-[8px] border border-[#E5E5E5] bg-white px-6 py-7 lg:sticky lg:top-32 lg:max-h-[calc(100vh-150px)] lg:overflow-y-auto">
            <div className="space-y-8">
              <div>
                <h2 className="mb-8 text-[20px] font-medium leading-tight text-black">
                  Search the articles
                </h2>
                <input
                  type="search"
                  placeholder="Find some..."
                  className="h-[28px] w-full max-w-[212px] border border-[#8E8E8E] px-2 text-[14px] leading-none outline-none"
                />
              </div>

              <div>
                <span className="mb-2 block h-[6px] w-[18px] border-2 border-[#333]" />
                <h2 className="mb-7 text-[20px] font-medium leading-tight text-black">
                  Categories
                </h2>
                <ul className="list-disc space-y-2 pl-6 text-[14px] leading-[1.35] text-[#5D6670]">
                  {categories.map((category, index) => (
                    <li key={`${brandResearchText(category)}-${index}`}>
                      <a href="#research-list" className="transition hover:text-[#F04423]">
                        {brandResearchText(category)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div id="research-list" className="max-w-[1150px]">
            <h1 className="mb-8 text-[38px] font-semibold leading-tight text-black">
              Ivexia Peptide Research
            </h1>

            <div className="mb-12 flex gap-4 bg-[#F7F7F7] px-7 py-7 text-[13px] font-medium leading-[1.6] text-[#6A7078]">
              <CircleAlert className="mt-1 shrink-0 text-[#F04423]" size={24} />
              <p>
                ALL ARTICLES AND PRODUCT INFORMATION PROVIDED ON THIS WEBSITE
                ARE FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. The
                products offered on this website are furnished for in-vitro
                studies only. In-vitro studies (Latin: in glass) are performed
                outside of the body. These products are not medicines or drugs
                and have not been approved by the FDA to prevent, treat or cure
                any medical condition, ailment or disease. Bodily introduction
                of any kind into humans or animals is strictly forbidden by law.
              </p>
            </div>

            <div className="space-y-16">
              {articles.map((article) => (
                <article key={article.slug} className="space-y-7">
                  <h2 className="text-[32px] font-semibold leading-tight text-[#F04423]">
                    {brandResearchText(article.title)}
                  </h2>

                  <div className="flex flex-wrap items-center gap-12 text-[13px] text-[#5D6670]">
                    <span className="inline-flex items-center gap-3">
                      <UserRound size={26} fill="currentColor" strokeWidth={1.8} />
                      By {article.author || "Dr. Logan"}
                    </span>
                    <span className="inline-flex items-center gap-3">
                      <CalendarDays size={26} strokeWidth={1.8} />
                      {article.date || "Loading..."}
                    </span>
                  </div>

                  {!isHumaninResearch(article) && (
                    <p className="max-w-[1110px] text-[14px] leading-[1.55] text-black">
                      {getPreview(article)}
                    </p>
                  )}

                  {isHumaninResearch(article) ? (
                    <div className="space-y-8 text-[14px] leading-[1.65] text-black">
                      {article.sections?.map((section, sectionIndex) => (
                        <section key={`humanin-${sectionIndex}`} className="space-y-3">
                          {section.heading && (
                            <h3 className="text-[30px] font-semibold leading-tight text-black">
                              {brandResearchText(section.heading)}
                            </h3>
                          )}
                          {section.content?.map((paragraph, index) => (
                            <p key={`humanin-${sectionIndex}-${index}`}>
                              {brandResearchText(paragraph)}
                            </p>
                          ))}
                        </section>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-12 text-[13px] text-[#5D6670]">
                      <span>Posted in: {getPostedIn(article)}</span>
                      <Link
                        href={`/peptide-research/${article.slug}`}
                        className="rounded-md px-2 py-1 text-[14px] font-medium text-[#F04423] transition hover:bg-[#FFF1EC] hover:text-[#D93618]"
                      >
                        Read More
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
