import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSidebar from "@/components/ProductSidebar";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#090909]">
      <Navbar />
      <HeroSection />

      <section id="products" className="bg-white px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1680px] gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <ProductSidebar />
          <ProductGrid />
        </div>
      </section>

      <AboutSection />
      <Footer />
    </main>
  );
}
