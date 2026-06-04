import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";

export const metadata = {
  title: "Intro to Peptides | Ivexia Peptide",
  description: "Introductory peptide glossary information from Ivexia Peptide.",
};

export default function IntroToPeptidesPage() {
  return (
    <main className="min-h-screen bg-white text-[#374151]">
      <Navbar />
      <PeptideInfoSubNav />

      <article className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-2 text-4xl font-bold text-[#090909]">
          Intro to Peptides
        </h1>

        <p className="mb-6 text-sm text-[#6B7280]">
          Peptide Information &bull; October 20, 2023
        </p>

        <div className="mb-8 border border-[#D1D5DB] bg-[#F3F4F6] p-4 text-sm text-[#56585C]">
          <strong>Research-use-only notice</strong>
          <br />
          This article is provided for informational and educational purposes
          only. Ivexia Peptide products are furnished for in-vitro research use
          only and are not medicines or drugs.
        </div>

        <div className="space-y-8 text-[16px] leading-relaxed text-[#374151]">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#090909]">
              What Are Peptides?
            </h2>
            <p className="mb-3">
              Peptides are short chains of amino acids connected by peptide
              bonds. They are commonly discussed in research because amino acid
              sequence, chain length, and structure can influence biological
              signaling and laboratory analysis.
            </p>
            <p>
              In research contexts, peptides are studied as reference compounds
              for analytical, biochemical, and cellular workflows.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#090909]">
              How Peptides Are Formed
            </h2>
            <p>
              Peptide bonds form when amino acids join together through a
              condensation reaction. The resulting chain can be described by its
              amino acid sequence and studied for purity, solubility, and
              molecular characteristics.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#090909]">
              Common Terms
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Amino acid: the building block of peptides and proteins.</li>
              <li>Peptide bond: the chemical bond connecting amino acids.</li>
              <li>Sequence: the order of amino acids in a peptide chain.</li>
              <li>Purity: an analytical measurement used in research settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#090909]">
              Peptides vs Proteins
            </h2>
            <p>
              Peptides are generally shorter amino acid chains, while proteins
              are longer and often fold into more complex structures. Both are
              important in biochemical research.
            </p>
          </section>

          <p className="italic text-[#56585C]">
            Continue to{" "}
            <Link href="/peptide-information/peptide-storage" className="font-semibold text-[#F04423]">
              peptide storage information
            </Link>{" "}
            for handling and storage context.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
