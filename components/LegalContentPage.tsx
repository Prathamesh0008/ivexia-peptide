import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalContentPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="mt-6 space-y-5 rounded-xl border border-[#E5E5E5] bg-white p-6 text-sm leading-7 text-[#56585C]">
          <p>{description}</p>
          <p>
            Ivexia Peptide products and content are provided for research-use-only
            informational purposes. For specific support questions, please contact
            our team.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
