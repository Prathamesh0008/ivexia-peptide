"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type FooterLink = {
  href: string;
  labelKey: string;
  fallback: string;
};

const informationLinks: FooterLink[] = [
  { href: "/all-peptides", labelKey: "allPeptides", fallback: "All Peptides" },
  { href: "/bundle-save", labelKey: "bundleSave", fallback: "Bundle & Save" },
  { href: "/peptide-research", labelKey: "peptideResearch", fallback: "Peptide Research" },
  { href: "/peptide-information", labelKey: "peptideInformation", fallback: "Peptide Information" },
  { href: "/about", labelKey: "ourCompany", fallback: "Our Company" },
];

const buyLinks: FooterLink[] = [
  { href: "/all-peptides", labelKey: "peptideCapsules", fallback: "Peptide Capsules" },
  { href: "/all-peptides", labelKey: "purchasePeptides", fallback: "Purchase Peptides" },
  { href: "/all-peptides", labelKey: "peptideBlends", fallback: "Peptide Blends" },
  { href: "/all-peptides", labelKey: "igfProteins", fallback: "IGF-1 Proteins" },
  { href: "/all-peptides", labelKey: "melanotanPeptides", fallback: "Melanotan Peptides" },
  { href: "/all-peptides", labelKey: "bioregulators", fallback: "Bioregulators" },
  { href: "/all-peptides", labelKey: "cosmeticPeptides", fallback: "Cosmetic Peptides" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy-policy", labelKey: "privacyPolicy", fallback: "Privacy Policy" },
  { href: "/terms-of-use", labelKey: "termsOfUse", fallback: "Terms of Use" },
  { href: "/shipping-payments", labelKey: "shippingPayments", fallback: "Shipping & Payments" },
  { href: "/refunds-returns", labelKey: "refundsReturns", fallback: "Refunds & Returns" },
  { href: "/accessibility-statement", labelKey: "accessibilityStatement", fallback: "Accessibility Statement" },
  { href: "/reward-program-terms", labelKey: "rewardProgramTerms", fallback: "Reward Program Terms" },
];

const supportLinks: FooterLink[] = [
  { href: "/contact", labelKey: "contactUs", fallback: "Contact Us" },
];

export default function Footer() {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const t = (key: string, fallback: string) => navigation[key] || fallback;

  return (
    <footer className="relative mt-16 bg-white text-[#56585C]">
      <div className="border-t border-[#E5E5E5]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-6 lg:gap-12">
          <div className="space-y-4 lg:col-span-2">
            <Image
              src="/Ivexia_Peptide.png"
              alt="Ivexia Pharmaceuticals"
              width={420}
              height={70}
              priority
              className="h-auto w-[240px] max-w-full object-contain"
            />

            <p className="max-w-md text-sm leading-relaxed">
              {t(
                "footerDescription",
                "We take pride in treating every client, large or small, with the utmost regard.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:col-span-4 lg:grid-cols-4">
            <FooterColumn title={t("footerInformation", "Information")} links={informationLinks} t={t} />
            <FooterColumn title={t("footerBuyPeptides", "Buy Peptides")} links={buyLinks} t={t} />
            <FooterColumn title={t("footerLegal", "Legal")} links={legalLinks} t={t} />

            <div className="space-y-4">
              <FooterColumn title={t("footerSupport", "Support")} links={supportLinks} t={t} />
              <Info icon={Phone} title={t("footerPhone", "Phone")} lines={["T: 1-800-986-6401"]} />
              <Info icon={Mail} title={t("footerEmail", "Email")} lines={["service@ivexiapeptide.com"]} />
              <Info
                icon={CalendarClock}
                title={t("footerShippingDays", "Shipping Days")}
                lines={[t("footerShippingText", "Mon - Fri / Except Holidays")]}
              />
              <Info
                icon={MapPin}
                title={t("footerMailingAddress", "Mailing Address")}
                lines={["Ivexia Peptide", "110 SE 6th St #1797", "Ft. Lauderdale, FL 33301"]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5] px-4 py-8 text-center text-xs text-[#6B7280] sm:px-6">
        <div className="mx-auto max-w-6xl space-y-3">
          <p className="font-medium text-[#111827]">
            Ivexia Peptide. Research use only.
          </p>
          <p>
            Products and information are intended for laboratory research purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  t,
}: {
  title: string;
  links: FooterLink[];
  t: (key: string, fallback: string) => string;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#111111]">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.labelKey}>
            <Link
              href={link.href}
              className="text-sm text-[#56585C] transition hover:text-[#F04423]"
            >
              {t(link.labelKey, link.fallback)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
}) {
  return (
    <div className="grid grid-cols-[20px_1fr] gap-3">
      <Icon className="mt-1 shrink-0 text-[#F04423]" size={18} />
      <div>
        <h4 className="text-sm font-semibold text-[#111111]">{title}</h4>
        <div className="mt-1 space-y-1 text-sm leading-5 text-[#56585C]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
