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
  { href: "/#products", labelKey: "allPeptides", fallback: "All Peptides" },
  { href: "/#products", labelKey: "bundleSave", fallback: "Bundle & Save" },
  { href: "/peptide-research", labelKey: "peptideResearch", fallback: "Peptide Research" },
  { href: "/peptide-information", labelKey: "peptideInformation", fallback: "Peptide Information" },
  { href: "/#about", labelKey: "ourCompany", fallback: "Our Company" },
];

const buyLinks: FooterLink[] = [
  { href: "/#products", labelKey: "peptideCapsules", fallback: "Peptide Capsules" },
  { href: "/#products", labelKey: "purchasePeptides", fallback: "Purchase Peptides" },
  { href: "/#products", labelKey: "peptideBlends", fallback: "Peptide Blends" },
  { href: "/#products", labelKey: "igfProteins", fallback: "IGF-1 Proteins" },
  { href: "/#products", labelKey: "melanotanPeptides", fallback: "Melanotan Peptides" },
  { href: "/#products", labelKey: "bioregulators", fallback: "Bioregulators" },
  { href: "/#products", labelKey: "cosmeticPeptides", fallback: "Cosmetic Peptides" },
];

const legalLinks: FooterLink[] = [
  { href: "#", labelKey: "privacyPolicy", fallback: "Privacy Policy" },
  { href: "#", labelKey: "termsOfUse", fallback: "Terms of Use" },
  { href: "#", labelKey: "shippingPayments", fallback: "Shipping & Payments" },
  { href: "#", labelKey: "refundsReturns", fallback: "Refunds & Returns" },
  { href: "#", labelKey: "accessibilityStatement", fallback: "Accessibility Statement" },
  { href: "#", labelKey: "rewardProgramTerms", fallback: "Reward Program Terms" },
];

const supportLinks: FooterLink[] = [
  { href: "/contact", labelKey: "contactUs", fallback: "Contact Us" },
];

export default function Footer() {
  const { translations } = useLanguage();
  const navigation = translations.navigation || {};
  const t = (key: string, fallback: string) => navigation[key] || fallback;

  return (
    <footer className="bg-white px-5 py-9 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1.55fr_0.85fr_0.95fr_0.95fr_0.65fr_1.55fr]">
        <div>
          <Image
            src="/Ivexia_Peptide.png"
            alt="Ivexia Pharmaceuticals"
            width={420}
            height={70}
            priority
            className="-ml-3 h-auto w-[290px] max-w-full"
          />

          <p className="mt-7 max-w-[300px] text-[16px] leading-6 text-[#56585C]">
            {t(
              "footerDescription",
              "We take pride in treating every client, large or small, with the utmost regard."
            )}
          </p>
        </div>

        <FooterColumn title={t("footerInformation", "Information")} links={informationLinks} t={t} />
        <FooterColumn title={t("footerBuyPeptides", "Buy Peptides")} links={buyLinks} t={t} />
        <FooterColumn title={t("footerLegal", "Legal")} links={legalLinks} t={t} />
        <FooterColumn title={t("footerSupport", "Support")} links={supportLinks} t={t} />

        <div className="space-y-8">
          <Info
            icon={Phone}
            title={t("footerPhone", "Phone")}
            lines={["T: 1-800-986-6401", "Monday - Friday 9AM - 4PM PST"]}
          />
          <Info
            icon={Mail}
            title={t("footerEmail", "Email")}
            lines={["service@ivexiapeptide.com"]}
          />
          <Info
            icon={CalendarClock}
            title={t("footerShippingDays", "Shipping Days")}
            lines={[
              t("footerShippingText", "Mon - Fri / Except Holidays"),
              "Orders placed and paid after 12 PM PST",
              "are shipped the following business day",
            ]}
          />
          <Info
            icon={MapPin}
            title={t("footerMailingAddress", "Mailing Address")}
            lines={[
              "Ivexia Peptide",
              "110 SE 6th St #1797,",
              "Ft. Lauderdale, FL 33301",
              "USA",
            ]}
          />
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
      <h3 className="mb-5 text-[16px] font-black text-[#111111]">{title}</h3>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.labelKey}>
            <Link
              href={link.href}
              className="text-[16px] text-[#56585C] hover:text-[#F04423]"
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
    <div className="flex gap-3">
      <Icon className="mt-0.5 shrink-0 fill-[#F04423] text-[#F04423]" size={22} />
      <div>
        <h4 className="text-[16px] font-black text-[#111111]">{title}</h4>
        <div className="mt-2 space-y-1.5 text-[15px] leading-5 text-[#56585C]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
