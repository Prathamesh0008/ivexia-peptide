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

      <section id="products" className="bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <ProductSidebar />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </section>

      <AboutSection />
      <Footer />
    </main>
  );
}
