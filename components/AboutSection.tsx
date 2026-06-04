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
    <section id="about" className="border-t border-[#E5E5E5] bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div className="space-y-12 text-sm text-[#56585C]">
          <h2 className="text-3xl font-bold text-[#090909]">
            {t("aboutTitle", "About Ivexia Peptide")}
          </h2>

          <div className="space-y-12">
            {blocks.map((block) => {
              const Icon = block.icon;

              return (
                <div key={block.titleKey} className="border-b border-[#E5E5E5] pb-8 last:border-b-0">
                  <div className="flex gap-3">
                    <Icon className="mt-1 text-[#F04423]" size={20} />

                    <div>
                      <h3 className="text-lg font-semibold text-[#090909]">
                        {t(block.titleKey, block.titleFallback)}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed">
                        {t(block.textKey, block.textFallback)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-xl shadow-lg md:min-h-[650px]">
          <Image
            src="/abaut.png.jpg"
            alt="Ivexia Peptide laboratory"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
