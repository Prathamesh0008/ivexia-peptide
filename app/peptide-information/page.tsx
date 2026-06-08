//app\peptide-information\page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import { INFO_ARTICLES } from "@/data/information";

const informationArticles = INFO_ARTICLES.map((article) => ({
  ...article,
  id: String(article.id).trim(),
  href: `/peptide-information/${String(article.id).trim()}`,
}));

type InfoArticle = (typeof informationArticles)[number];

export default function PeptideInformationPage() {
  const [query, setQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return informationArticles;

    return informationArticles.filter((article) =>
      article.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  const featuredArticle =
    filteredArticles.find((article) => article.id === "purity") ||
    filteredArticles[0] ||
    informationArticles[0];

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <PeptideInfoSubNav />

      <div className="w-full border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-[#56585C] sm:px-6">
          <Link href="/" className="font-medium hover:text-[#F04423]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-black">Peptide Information</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-3">
            <InformationSidebar
              items={filteredArticles}
              query={query}
              onQueryChange={setQuery}
            />
          </div>

          <section className="order-1 space-y-5 px-0 sm:space-y-6 lg:order-2 lg:col-span-9 lg:space-y-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-black sm:text-[34px]">
              Peptide Information
            </h1>

            <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 md:grid-cols-5">
              <div className="md:col-span-2">
                <Link
                  href={featuredArticle.href}
                  className="relative block aspect-[4/3] w-full max-w-[340px] overflow-hidden bg-[#FFF7F4]"
                >
                  <Image
                    src={featuredArticle.img}
                    alt={featuredArticle.title}
                    fill
                    priority
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </Link>
              </div>

              <div className="md:col-span-3">
                <Link
                  href={featuredArticle.href}
                  className="block text-[22px] font-extrabold text-black hover:text-[#F04423]"
                >
                  {featuredArticle.title}
                </Link>

                <p className="mt-2 text-[15px] leading-relaxed text-[#56585C]">
                  {featuredArticle.preview}
                </p>

                <p className="mt-3 text-xs text-[#6B7280]">
                  Peptide Information &bull; {featuredArticle.date}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={article.href}
                  className="group block py-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded bg-[#FFF7F4]">
                      <Image
                        src={article.img}
                        alt={article.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <h2 className="text-[16px] font-bold text-black group-hover:text-[#F04423]">
                        {article.title}
                      </h2>

                      <span className="mt-1 inline-block text-[13px] font-semibold text-[#F04423]">
                        Read More
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function InformationSidebar({
  items,
  onQueryChange,
  query,
}: {
  items: InfoArticle[];
  onQueryChange: (value: string) => void;
  query: string;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="m-0 p-0 lg:sticky lg:top-28">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1 overflow-hidden rounded-md border border-[#D1D5DB]">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search peptides..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="w-full px-3 py-2 text-sm outline-none"
          />
        </div>

        <button
          type="button"
          aria-label="Search"
          onClick={() => searchInputRef.current?.focus()}
          className="rounded-md border border-[#D1D5DB] p-2 text-[#6B7280] transition hover:border-[#F04423] hover:text-[#F04423]"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-[#F04423]">
        Peptide Glossary
      </h3>

      <ul className="m-0 space-y-2 p-0 text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="block text-[#374151] transition hover:text-[#F04423]"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mb-4 mt-4">
        <div className="relative h-[160px] w-full overflow-hidden ">
          <Image
            src="/capsulebottle.png"
            alt="Peptide research reference banner"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <Link
        href="/all-peptides"
        className="mt-2 block rounded-md bg-[#F04423] px-5 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#D93618]"
      >
        All Peptides
      </Link>
    </aside>
  );
}