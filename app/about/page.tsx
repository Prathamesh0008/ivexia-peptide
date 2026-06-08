import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Ivexia Peptide",
  description:
    "Learn about Ivexia Peptide research peptides, company values, service, shipping, and customer support.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

     <section className="mx-auto max-w-[1525px] px-6 py-10 lg:px-20">
        <h1 className="mb-5 text-[28px] font-bold leading-tight text-black">
          About Ivexia Peptide
        </h1>

        <div className="grid gap-10 lg:grid-cols-[1fr_510px] lg:items-start">
          <div className="text-[14px] leading-[1.6] text-black">
            <h2 className="mb-4 text-[20px] font-bold">Our Company</h2>

            <p>
              Ivexia Peptide™ is a leading provider of USA manufactured,
              research peptides. We have negotiated and partnered with WHO/GMP
              and ISO 9001:2015 approved manufacturers for the best prices
              available and for the highest quality and highest purity products.
              We are happy to pass those savings on to our customers, and are
              proud to be a trusted resource for the products we provide to the
              scientific community. Ivexia Peptide™ offers comprehensive
              resources with the latest scientific publications to advance
              research and development of peptides and proteins.
            </p>

            <h2 className="mb-4 mt-10 text-[20px] font-bold">
              Quality. Service. Value.
            </h2>

            <p>
              Ivexia Peptide™ is your safe, convenient and private online source
              for U.S.A manufactured, highest purity, research peptides. Quality
              products and exceptional service are very important to us, and we
              work hard to bring value to our customers. We manufacture our
              products through the most reputable research chemical manufacturing
              companies in the world, and our prices are some of the lowest
              online.
            </p>

            <p className="mt-5">
              Ordering online is simple and convenient. You enjoy complete
              privacy, and can order any time 24x7. Our shopping cart is
              completely secured using the latest SSL technology, and we protect
              your information with the highest standards in privacy assurance.
              Your orders and payment information remain encrypted, protected
              and 100% discreet.
            </p>

            <h2 className="mb-4 mt-10 text-[20px] font-bold">Shipping</h2>

            <p>We offer fast and secure shipping to the USA.</p>

            <h2 className="mb-4 mt-10 text-[20px] font-bold">Our Customers</h2>

            <p>
              We take pride in our service and value every customer relationship.
              With satisfied customers around the world, you can be assured of a
              safe and satisfied shopping experience with the highest quality
              research products from Ivexia Peptide™.
            </p>

            <p className="mt-5">
              From all of us at Ivexia Peptide™, thank you. Please dont
              hesitate to contact us at{" "}
              <a
                href="mailto:service@ivexiapeptide.com"
                className="font-semibold underline"
              >
                service@ivexiapeptide.com
              </a>{" "}
              with any questions you may have.
            </p>
          </div>

          <div className="relative mt-2 h-[430px] w-full overflow-hidden">
            <Image
              src="/abaut.png.jpg"
              alt="Ivexia Peptide laboratory research"
              fill
              priority
              className="object-cover"
            />

            <Image
              src="/Ivexia_Peptide.png"
              alt="Ivexia Peptide Logo"
              width={260}
              height={90}
              className="absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}