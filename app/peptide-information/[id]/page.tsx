import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";
import { INFO_ARTICLES } from "@/data/information";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const aliasMap: Record<string, string> = {
  "intro-to-peptides": "intro",
  "peptide-storage": "storingPeptides",
  "peptide-synthesis": "synthesis",
  "peptide-solubility": "solubility",
  "peptide-bonds": "peptideBonds",
  "peptides-vs-proteins": "peptidesVsProteins",
  "research-peptides": "researchPeptidesForDiscovery",
  "peptide-purification": "purity",
};

export default async function PeptideInformationArticlePage({
  params,
}: PageProps) {
  const { id } = await params;

  const finalId = aliasMap[id] || id;

  const article = INFO_ARTICLES.find(
    (item) => String(item.id).trim() === finalId,
  );

  if (!article) notFound();

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
          <Link
            href="/peptide-information"
            className="font-medium hover:text-[#F04423]"
          >
            Peptide Information
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-black">{article.title}</span>
        </div>
      </div>

      <article className="mx-auto max-w-[980px] px-4 py-8 sm:px-6 lg:py-12">
        <p className="mb-3 text-sm font-semibold text-[#F04423]">
          Peptide Information &bull; {article.date}
        </p>

        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-[#56585C]">
          {article.preview}
        </p>

        <div className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-2xl bg-[#FFF7F4]">
          <Image
            src={article.img}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 text-[16px] leading-8 text-[#374151]">
          {article.content?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/peptide-information"
            className="inline-flex rounded-md bg-[#F04423] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D93618]"
          >
            Back to Peptide Information
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}