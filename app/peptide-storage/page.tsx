import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PeptideInfoSubNav from "@/components/PeptideInfoSubNav";

const glossaryLinks = [
  { href: "/peptide-information/intro-to-peptides", label: "Introduction to Peptides" },
  { href: "/peptide-information#american-made-peptides", label: "American Made Peptides" },
  { href: "/peptide-information#peptide-bonds", label: "Peptide Bonds" },
  { href: "/peptide-information#peptide-purification", label: "Peptide Purity" },
  { href: "/peptide-information#peptide-purification", label: "Peptide Purification" },
  { href: "/peptide-information#peptide-solubility", label: "Peptide Solubility" },
  { href: "#article", label: "Peptide Storage" },
  { href: "/peptide-information#peptide-synthesis", label: "Peptide Synthesis" },
  { href: "/peptide-information#peptides-vs-proteins", label: "Peptides vs Proteins" },
  { href: "/peptide-research", label: "Research Peptides" },
];

export default function PeptideStoragePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <PeptideInfoSubNav />

      <section
        className="relative overflow-hidden bg-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url('/Hexagonal1.png')",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-8 sm:px-8 lg:grid-cols-[300px_1fr] lg:px-10">
          <aside className="flex min-h-[720px] flex-col justify-between pb-6 lg:sticky lg:top-28 lg:self-start">
            <nav>
              <h2 className="mb-8 text-[32px] font-normal leading-tight text-[#F04423]">
                Peptide Glossary
              </h2>
              <ul className="space-y-1 text-[18px] leading-[1.5] text-[#111827]">
                {glossaryLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-[#F04423]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-10">
              <div className="h-[24px] w-full max-w-[235px] border border-[#C9C9C9] bg-white/40" />
              <Link
                href="/all-peptides"
                className="inline-flex h-[48px] min-w-[235px] items-center justify-center rounded-[8px] bg-[#F04423] px-8 text-[16px] font-bold text-white transition hover:bg-[#D93618]"
              >
                All Peptides
              </Link>
            </div>
          </aside>

       <article id="article" className="max-w-[930px] pb-20 text-[14px] leading-[1.6] text-black">
  <header className="border-b border-[#CFCFCF] pb-5">
    <div className="mb-3 flex items-center gap-12">
      <span className="hidden h-[56px] w-[56px] border-2 border-black sm:block" />
      <h1 className="text-[32px] font-bold leading-tight tracking-[0.08em] text-black">
        Peptide Storage
      </h1>
    </div>

    <div className="flex flex-wrap gap-8 text-[13px] uppercase text-[#111827]">
      <span>BY PEPTIDE INFORMATION</span>
      <span>SEPTEMBER 15, 2023</span>
    </div>

    <p className="mt-9 text-[13px] font-normal leading-[1.6] text-black">
      ALL ARTICLES AND PRODUCT INFORMATION PROVIDED ON THIS WEBSITE ARE FOR
      INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. The products offered on this
      website are furnished for in-vitro studies only. In-vitro studies (Latin:
      in glass) are performed outside of the body. These products are not
      medicines or drugs and have not been approved by the FDA to prevent,
      treat or cure any medical condition, ailment or disease. Bodily
      introduction of any kind into humans or animals is strictly forbidden by
      law.
    </p>
  </header>

  <section className="space-y-7 border-b border-[#D7D7D7] py-9 text-[14px] leading-[1.6] text-black">
    <h2 className="text-[18px] font-normal leading-tight text-black">
      Best Practices For Storing Peptides
    </h2>

    <p>
      To preserve the integrity of laboratory results, proper storage of
      peptides is essential. Correct storage practices can maintain peptides for
      years and guard against contamination, oxidation, and degradation that may
      render your peptides, and therefore experiments, useless.
    </p>

    <p>
      Once peptides have been received, it is imperative that they are kept cold
      and away from light. If the peptides will be used immediately, or in the
      next several days, weeks or months, short-term refrigeration under 4C
      (39F) is generally acceptable.
    </p>

    <p>
      However, for longer term storage, it is more preferable to store peptides
      in a freezer at -80C (-112F). When storing peptides for months or even
      years, freezing is optimal in order to preserve the peptide&apos;s stability.
    </p>

    <p>
      Additionally, it is important to avoid repeated freeze-thaw cycles. This
      can increase the peptide&apos;s susceptibility to degradation.
    </p>
  </section>

  <StorageGuide />

  <ArticleSection title="Preventing Oxidation and Moisture Contamination">
    <p>
      It is imperative to avoid contaminating peptides with both air and
      moisture. Moisture contamination is especially prone to occur when using a
      peptide immediately after withdrawing it from the freezer.
    </p>

    <p>
      It is also crucially important to minimize a peptide&apos;s exposure to the
      air. A peptide&apos;s container should therefore be kept closed as much as
      possible.
    </p>

    <p>
      Because frequent thawing and refreezing as well as exposure to air can
      greatly reduce a peptide&apos;s long-term stability, many researchers prefer
      to divide peptides into separate vials as necessary.
    </p>
  </ArticleSection>

  <ArticleSection title="Storing Peptides In Solution">
    <p>
      The shelf life of peptide solutions is far less than that of lyophilized
      peptides, and peptides stored in solution are also vulnerable to bacterial
      degradation.
    </p>

    <p>
      Nevertheless, if peptides absolutely must be stored in solution, sterile
      buffers at pH 5-6 should be used, and the peptide solution should be
      separated into aliquots to avoid repeated freezing and thawing.
    </p>
  </ArticleSection>

  <ArticleSection title="Peptide Storage Containers">
    <p>
      Containers for peptide storage should be completely clean, clear, and
      structurally sound. They should also be chemically resistant and
      appropriately sized for the amount of peptide in them.
    </p>

    <p>
      While high quality glass vials offer all of the desirable characteristics
      for a peptide storage container, peptides are sometimes shipped in plastic
      vials in order to guard against breakage.
    </p>
  </ArticleSection>

  <section className="border-t border-[#D7D7D7] pt-11 text-[14px] leading-[1.6] text-black">
    <h2 className="mb-6 text-[18px] font-normal leading-tight text-black">
      Peptide Storage Guidelines: General Tips
    </h2>

    <p className="mb-7 font-normal">When storing peptides, remember to:</p>

    <ul className="space-y-1">
      <li>* Store peptide in a cold, dry, dark place</li>
      <li>* Avoid repeated freezing and thawing of peptide</li>
      <li>* Avoid overexposure to the air</li>
      <li>* Avoid light exposure</li>
      <li>* Avoid storing peptides in solution long term</li>
      <li>* Aliquot peptide according to experimental requirements</li>
    </ul>
  </section>
</article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StorageGuide() {
  return (
    <section className="mx-auto my-9 max-w-[800px] bg-white shadow-sm">
      <div className="grid border-b border-[#CFCFCF] sm:grid-cols-[120px_1fr]">
        <div className="flex items-center justify-center bg-[#F8F8F8] p-6">
          <BottleVisual fill="powder" />
        </div>
        <div className="p-5 text-[13px] leading-[1.25] text-black">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="text-[22px] leading-tight">Lyophilized (Freeze dried)</h3>
            <span className="text-right text-[13px] font-bold text-[#F04423]">
              IVEXIA PEPTIDE
            </span>
          </div>
          <p>
            <strong>Short term -</strong> Lyophilized peptides will remain
            stable at room temperature for 30-60 days. However, upon receipt all
            peptides should be stored in the refrigerator under 4C (39F) for
            maximum stability and longevity.
          </p>
          <p className="mt-3">
            <strong>Long term -</strong> If you are not going to use the peptides
            within 1-2 months it is preferable to store the peptides in a freezer.
            Freezing at -80C (-112F) is optimal to preserve stability long term.
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-[120px_1fr]">
        <div className="flex items-center justify-center bg-[#F8F8F8] p-6">
          <BottleVisual fill="liquid" />
        </div>
        <div className="p-5 text-[13px] leading-[1.25] text-black">
          <h3 className="mb-3 text-[22px] leading-tight">
            Reconstituted (Mixed)
          </h3>
          <p>
            <strong>Short term -</strong> Peptide solutions generally remain
            stable up to 30 days when stored in the refrigerator at 4C (39F)
            depending on sequence and stability factors.
          </p>
          <p className="mt-3">
            <strong>Long term -</strong> If peptides absolutely must be stored in
            solution, sterile buffers at pH 5-6 should be used and the solution
            separated into aliquots to avoid repeated freezing and thawing.
          </p>
        </div>
      </div>
    </section>
  );
}

function BottleVisual({ fill }: { fill: "liquid" | "powder" }) {
  return (
    <div className="relative h-[150px] w-[72px]">
      <div className="absolute left-1/2 top-0 h-5 w-[50px] -translate-x-1/2 rounded-[5px] border border-[#9FA4A7] bg-gradient-to-b from-[#CFD3D3] via-[#7C8588] to-[#DADCDC] shadow-sm" />
      <div className="absolute left-1/2 top-[18px] h-[22px] w-[40px] -translate-x-1/2 rounded-b-[10px] border-x border-b border-[#AEB4B6] bg-gradient-to-r from-[#E9EEEE] via-[#8E999B] to-[#F8FAFA]" />
      <div className="absolute bottom-0 left-1/2 h-[118px] w-[54px] -translate-x-1/2 overflow-hidden rounded-b-[18px] rounded-t-[9px] border border-[#AAB0B1] bg-gradient-to-r from-[#E8EEEE] via-white to-[#DCE4E5] shadow-[inset_8px_0_14px_rgba(0,0,0,0.08),inset_-7px_0_12px_rgba(0,0,0,0.06)]">
        <div className="absolute left-[7px] top-2 h-[95px] w-[9px] rounded-full bg-white/75" />
        <div className="absolute bottom-0 left-0 h-[26px] w-full bg-gradient-to-b from-white/70 to-[#CAD9DB]" />
        {fill === "powder" ? (
          <div className="absolute bottom-[13px] left-[8px] h-[18px] w-[38px] rounded-[50%] bg-[#E8EEEE]" />
        ) : (
          <div className="absolute bottom-[12px] left-[5px] h-[34px] w-[44px] rounded-b-[16px] bg-gradient-to-b from-[#F7FFFF] to-[#BFD7DC]">
            <div className="h-[8px] w-full rounded-[50%] bg-white/80" />
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="space-y-7 border-b border-[#D7D7D7] py-11 text-[18px] leading-[1.45] text-black">
      <h2 className="text-[32px] font-normal leading-tight text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}
