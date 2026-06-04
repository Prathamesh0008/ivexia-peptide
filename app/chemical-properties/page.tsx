import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllChemicalPropertyImages } from "@/lib/chemicalProperties";

export default function ChemicalPropertiesPage() {
  const images = getAllChemicalPropertyImages();

  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />

      <section className="bg-[linear-gradient(180deg,#FFF2EF_0%,#FAFAFA_42%,#FFFFFF_100%)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <p className="inline-flex rounded-md bg-[#F04423] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Chemical properties
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-[#111827] md:text-4xl">
            Public chemical property library
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#56585C]">
            All image assets currently available inside public/chemicalproperties.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.src}
                className="overflow-hidden rounded-md border border-[#E5E5E5] bg-white shadow-sm"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-[#FFF8F5] p-4">
                  <Image
                    src={image.src}
                    alt={image.label}
                    width={520}
                    height={390}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="border-t border-[#E5E5E5] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F04423]">
                    {image.category}
                  </p>
                  <h2 className="mt-2 text-sm font-semibold leading-6 text-[#111827]">
                    {image.label}
                  </h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
