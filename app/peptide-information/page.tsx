import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const glossaryLinks = [
  "Introduction to Peptides",
  "American Made Peptides",
  "Peptide Bonds",
  "Peptide Purity",
  "Peptide Purification",
  "Peptide Solubility",
  "Peptide Storage",
  "Peptide Synthesis",
  "Peptides vs Proteins",
  "Research Peptides",
];

const informationCards = [
  {
    title: "Intro to Peptides",
    date: "OCT 20, 2023",
    href: "/peptide-information#intro-to-peptides",
  },
  {
    title: "American Made Peptides",
    date: "OCT 06, 2023",
    href: "/peptide-information#american-made-peptides",
  },
  {
    title: "Peptide Synthesis",
    date: "SEP 27, 2023",
    href: "/peptide-information#peptide-synthesis",
  },
  {
    title: "Peptide Solubility",
    date: "SEP 21, 2023",
    href: "/peptide-information#peptide-solubility",
  },
  {
    title: "Peptide Purification",
    date: "SEP 19, 2023",
    href: "/peptide-information#peptide-purification",
  },
  {
    title: "Peptide Bonds",
    date: "SEP 17, 2023",
    href: "/peptide-information#peptide-bonds",
  },
  {
    title: "Peptide Storage",
    date: "SEP 15, 2023",
    href: "/peptide-storage",
  },
  {
    title: "Research Peptides",
    date: "SEP 09, 2023",
    href: "/peptide-research",
  },
  {
    title: "Peptides vs Proteins",
    date: "AUG 07, 2023",
    href: "/peptide-information#peptides-vs-proteins",
  },
];

export default function PeptideInformationPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section
        className="relative overflow-hidden bg-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.70), rgba(255,255,255,0.70)), url('/Hexagonal1.png')",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto grid max-w-[1360px] gap-12 px-5 py-8 sm:px-8 lg:grid-cols-[320px_1fr] lg:px-10">
          <InformationSidebar />

          <article id="top" className="max-w-[930px] pb-20 text-black">
        <header className="mb-7">
  <div className="mb-4 flex items-center gap-5">
    <span className="hidden h-[36px] w-[36px] border-2 border-black sm:block" />
    <h1 className="text-[28px] font-semibold leading-tight tracking-[0.03em] text-black">
      Peptide Information
    </h1>
  </div>

  <section className="border-b border-[#CFCFCF] pb-5">
<h2 className="mb-3 ml-10 text-left-10 text-[26px] font-semibold leading-tight tracking-[0.02em] text-black">
  Peptide Purity
</h2>
                <p className="text-[15px] font-normal leading-[1.65] text-black">
                  How is Peptide Purity Achieved and Verified? At
                  ivexiapeptide.com, we provide peptides that exceed 99% purity.
                  Using state-of-the-art solution and solid phase peptide
                  synthetic technology, Ivexia Peptide is able to offer the
                  finest quality peptides and proteins fit for any research
                  study or application. Peptide purity is achieved and verified
                  through uncompromising manufacturing and production...
                </p>

                <div className="mt-4 flex flex-wrap gap-10 text-[13px] uppercase text-[#111827]">
                  <span>BY PEPTIDE INFORMATION</span>
                  <span>OCT 21, 2023</span>
                </div>
              </section>
            </header>

            <section className="grid gap-x-12 gap-y-3 md:grid-cols-2">
              {informationCards.map((card) => (
                <InformationCard key={card.title} {...card} />
              ))}
            </section>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InformationSidebar() {
  return (
    <aside className="flex min-h-[720px] flex-col justify-between pb-6 lg:sticky lg:top-28 lg:self-start">
      <div>
        <div className="mb-12 flex items-center">
          <input
            aria-label="Search articles"
            className="h-[52px] w-full max-w-[250px] bg-white/65 px-7 text-[15px] outline-none placeholder:text-[#5E6670]"
            placeholder="Search ..."
            type="search"
          />
        </div>

        <div className="mb-12 h-1 w-full max-w-[358px] bg-[#CFCFCF]" />

        <nav>
          <h2 className="mb-8 text-[30px] font-normal leading-tight tracking-[0.04em] text-[#F04423]">
            Peptide Glossary
          </h2>
          <ul className="space-y-1 text-[17px] font-normal leading-[1.5] text-[#111827]">
            {glossaryLinks.map((item) => (
              <li key={item}>
                <Link
                  href={item === "Peptide Storage" ? "/peptide-storage" : "#top"}
                  className="transition hover:text-[#F04423]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-10 pt-10">
        <div className="h-[18px] w-full max-w-[210px] border border-[#C9C9C9] bg-white/40" />
        <Link
          href="/#all-peptides"
          className="inline-flex h-[48px] min-w-[235px] items-center justify-center rounded-[8px] bg-[#F04423] px-8 text-[16px] font-semibold text-white transition hover:bg-[#D93618]"
        >
          All Peptides
        </Link>
      </div>
    </aside>
  );
}

function InformationCard({
  date,
  href,
  title,
}: {
  date: string;
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="grid min-h-[88px] grid-cols-[96px_1fr] gap-5 transition hover:text-[#F04423]"
    >
      <span className="flex h-[72px] w-[96px] items-center justify-center border border-[#BFC4C7] bg-white/35">
        <Image
          src="/Hexagonal1.png"
          alt=""
          width={96}
          height={72}
          className="h-full w-full object-cover opacity-75"
        />
      </span>
      <span className="pt-1">
        <span className="block text-[21px] font-semibold leading-tight tracking-[0.03em] text-black">
          {title}
        </span>
        <span className="mt-2 block text-[12px] font-normal uppercase tracking-[0.02em] text-black">
          {date}
        </span>
      </span>
    </Link>
  );
}
