"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const banners = ["/Banner1.png", "/b4.jpg", "/b3.png"];

export default function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-[380px] overflow-hidden border-b border-[#E5E5E5] bg-cover bg-center bg-no-repeat px-4 py-10 transition-all duration-1000 md:min-h-[550px] sm:px-6"
      style={{ backgroundImage: `url(${banners[currentBanner]})` }}
    >
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative mx-auto flex min-h-[300px] w-[95%] max-w-5xl overflow-hidden rounded-2xl bg-white/70 shadow-xl backdrop-blur-md lg:mt-2">
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-7 sm:px-10 lg:w-[52%]">
          <p className="text-xl font-bold leading-tight text-[#F04423] sm:text-2xl lg:text-3xl">
            USA Made Products
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-black lg:text-[38px]">
            Ivexia Peptide
          </h1>

          <p className="mt-4 max-w-[520px] text-sm leading-6 text-black sm:text-base">
            Highly Purified Melanotan II, CJC-1295, GHRP-2, Hexarelin, IGF-1,
            Sermorelin, TB-500 and more!
          </p>

          <p className="mt-4 text-sm font-semibold text-[#F04423] sm:text-base">
            99%+ Purity Guaranteed!
          </p>

          <Link
            href="/all-peptides"
            className="mt-6 inline-flex h-[42px] w-[160px] items-center justify-center rounded-md bg-[#F04423] text-sm font-semibold text-white transition hover:bg-[#D93618] sm:text-base"
          >
            Learn More
          </Link>
        </div>

        <div className="relative hidden min-h-[300px] flex-1 overflow-visible bg-white/25 p-5 lg:block">
          <Image
            src="/B1.png"
            alt="Ivexia Peptide product vials"
            fill
            priority
            sizes="520px"
            className="scale-110 object-contain drop-shadow-2xl"
          />
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/75 to-transparent" />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show background ${index + 1}`}
            onClick={() => setCurrentBanner(index)}
            className={`h-2.5 rounded-full transition-all ${
              currentBanner === index ? "w-8 bg-[#F04423]" : "w-2.5 bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
