"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  "/Banner1.png",
  "/b4.jpg",
  "/b3.png",
];

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
      className="relative min-h-[540px] overflow-hidden bg-cover bg-center bg-no-repeat px-5 py-12 transition-all duration-1000 sm:px-8 lg:px-10"
      style={{
        backgroundImage: `url(${banners[currentBanner]})`,
      }}
    >
      <Link
        href="/#products"
        className="absolute left-0 top-1/2 z-20 hidden h-[78px] -translate-y-1/2 items-center gap-3 rounded-r-[8px] bg-[#F04423] px-5 text-base font-semibold text-white shadow-lg transition hover:bg-[#D93618] lg:flex"
      >
        Product List
        <span className="text-3xl leading-none">›</span>
      </Link>

      <div className="relative mx-auto flex min-h-[300px] w-full max-w-[1040px] overflow-hidden rounded-[28px] bg-white/75 shadow-sm backdrop-blur-md lg:mt-2">
        <div className="relative z-10 flex w-full flex-col justify-center px-7 py-8 sm:px-9 lg:w-[58%] lg:px-10">
          <p className="text-2xl font-bold leading-tight text-[#F04423] sm:text-3xl lg:text-[34px]">
            USA Made Products
          </p>

          <h1 className="mt-3 text-3xl font-normal leading-tight text-black lg:text-[38px]">
            Ivexia Peptide
          </h1>

          <p className="mt-5 max-w-[520px] text-base leading-7 text-black">
            Highly Purified Melanotan II, CJC-1295, GHRP-2, Hexarelin,
            IGF-1, Sermorelin, TB-500 and more!
          </p>

          <p className="mt-4 text-base font-medium text-[#F04423]">
            99%+ Purity Guaranteed!
          </p>

          <Link
            href="/#products"
            className="mt-6 inline-flex h-[46px] w-[170px] items-center justify-center rounded-[9px] bg-[#F04423] text-base font-semibold text-white transition hover:bg-[#D93618]"
          >
            Learn More
          </Link>
        </div>

        <div className="relative hidden min-h-[300px] flex-1 overflow-hidden bg-white/35 p-5 lg:block">
          <Image
            src="/banner2.png"
            alt="Ivexia Peptide product vials"
            fill
            priority
            sizes="520px"
            className="object-contain"
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
              currentBanner === index
                ? "w-8 bg-[#F04423]"
                : "w-2.5 bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
