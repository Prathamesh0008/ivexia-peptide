"use client";

import Image from "next/image";
import { Building2, ThumbsUp, UsersRound } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const blocks = [
  {
    icon: Building2,
    titleKey: "aboutCompanyTitle",
    titleFallback: "Our Company",
    textKey: "aboutCompanyText",
    textFallback:
      "Ivexia Peptide is focused on providing clean, organized, and research-use-only peptide product information for scientific reference and investigative purposes.",
  },
  {
    icon: ThumbsUp,
    titleKey: "aboutQualityTitle",
    titleFallback: "Quality. Service. Value.",
    textKey: "aboutQualityText",
    textFallback:
      "Our platform is designed with a simple product structure, clear research notices, and professional product presentation for laboratory-focused audiences.",
  },
  {
    icon: UsersRound,
    titleKey: "aboutCustomersTitle",
    titleFallback: "Our Customers",
    textKey: "aboutCustomersText",
    textFallback:
      "We value every research-focused visitor and aim to provide a smooth browsing experience with clear categories, product details, and support information.",
  },
];

export default function AboutSection() {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const t = (key: string, fallback: string) => navigation[key] || fallback;

  return (
    <section id="about" className="bg-[#F7F7F7] px-5 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2">
        <div className="py-16 pr-0 md:pr-10 lg:pr-16">
          <h2 className="mb-12 text-4xl font-black md:text-5xl">
            {t("aboutTitle", "About Ivexia Peptide")}
          </h2>

          <div className="space-y-10">
            {blocks.map((block) => {
              const Icon = block.icon;

              return (
                <div
                  key={block.titleKey}
                  className="border-b border-[#E5E5E5] pb-9"
                >
                  <div className="flex gap-6">
                    <Icon className="mt-1 text-[#F04423]" size={34} />

                    <div>
                      <h3 className="text-xl font-black">
                        {t(block.titleKey, block.titleFallback)}
                      </h3>
                      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#090909]">
                        {t(block.textKey, block.textFallback)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[520px] lg:min-h-full">
          <Image
            src="/abaut.png.jpg"
            alt="Ivexia Peptide laboratory"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            {/* <Image
              src="/images/logo-icon.png"
              alt="Ivexia icon"
              width={260}
              height={260}
              className="opacity-90"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
