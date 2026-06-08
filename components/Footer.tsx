"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Truck } from "lucide-react";
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
  { href: "/all-peptides?category=peptide-capsules", labelKey: "peptideCapsules", fallback: "Peptide Capsules" },
  { href: "/all-peptides", labelKey: "purchasePeptides", fallback: "Purchase Peptides" },
  { href: "/all-peptides?category=peptide-blends", labelKey: "peptideBlends", fallback: "Peptide Blends" },
  { href: "/all-peptides?category=igf-1-proteins", labelKey: "igfProteins", fallback: "IGF-1 Proteins" },
  { href: "/all-peptides?category=melanotan-peptides", labelKey: "melanotanPeptides", fallback: "Melanotan Peptides" },
  { href: "/all-peptides?category=bioregulators", labelKey: "bioregulators", fallback: "Bioregulators" },
  { href: "/all-peptides?category=cosmetic-peptides", labelKey: "cosmeticPeptides", fallback: "Cosmetic Peptides" },
];

const legalLinks: FooterLink[] = [
  { href: "/privacy-policy", labelKey: "privacyPolicy", fallback: "Privacy Policy" },
  { href: "/terms-of-use", labelKey: "termsOfUse", fallback: "Terms of use" },
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
    <footer className="mt-16 bg-white text-[#56585C]">
      <section className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-20">
          <div>
            <h2 className="text-[32px] font-bold leading-tight text-black">
              Be the first to know
            </h2>
            <p className="mt-2 text-[15px] text-black">
              Receive all the latest information on events, sales, &amp; offers.
            </p>
          </div>

          <form className="flex w-full max-w-[390px] overflow-hidden rounded-[7px] border border-[#cfcfcf] bg-white">
            <input
              type="email"
              placeholder="Email Address"
              className="h-10 min-w-0 flex-1 px-5 text-[13px] outline-none placeholder:text-[#555]"
            />
            <button
              type="submit"
              className="h-10 bg-[#F04423] px-5 text-[13px] font-medium text-white transition hover:bg-[#D93A18]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-[#E5E5E5]">
        <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[290px_1fr_285px] lg:gap-10 lg:px-20">
          <div>
            <Image
              src="/Ivexia_Peptide.png"
              alt="Ivexia Peptide"
              width={420}
              height={80}
              priority
              className="h-auto w-[265px] max-w-full object-contain"
            />

            <p className="mt-8 max-w-[250px] text-[13px] leading-6 text-[#56585C]">
              {t(
                "footerDescription",
                "We take pride in treating every client, large or small, with the utmost regard."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-[1fr_1.15fr_1.45fr_0.9fr]">
            <FooterColumn
              title={t("footerInformation", "Information")}
              links={informationLinks}
              t={t}
            />
            <FooterColumn
              title={t("footerBuyPeptides", "Buy Peptides")}
              links={buyLinks}
              t={t}
            />
            <FooterColumn
              title={t("footerLegal", "Legal")}
              links={legalLinks}
              t={t}
            />
            <FooterColumn
              title={t("footerSupport", "Support")}
              links={supportLinks}
              t={t}
            />
          </div>

          <div className="space-y-6">
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
              icon={Truck}
              title={t("footerShippingDays", "Shipping Days")}
              lines={[
                "Mon - Fri / Except Holidays",
                "Orders placed and paid after 12 PM PST are shipped the following business day",
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
      </section>

      <section className="border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-[1360px] px-6 py-5 text-center text-[11px] leading-5 text-[#4B5563] lg:px-20">
          <p>© 2025</p>
          <p>IvexiaPeptide.com. All Rights Reserved.</p>

          <p className="mt-3">
            All products on this site are for Research, Development use only.
            Products are Not for Human consumption of any kind.
          </p>

          <p>
            The statements made within this website have not been evaluated by the US Food and Drug Administration.
            The statements and products of this company are not intended to diagnose, treat, cure or prevent any disease.
          </p>
        </div>
      </section>
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
      <h3 className="mb-5 text-[13px] font-bold text-black">{title}</h3>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.labelKey}>
            <Link
              href={link.href}
              className="whitespace-nowrap text-[13px] text-[#4B5563] transition hover:text-[#F04423]"
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
      <Icon className="mt-[2px] text-[#F04423]" size={18} strokeWidth={2.8} />

      <div>
        <h4 className="text-[13px] font-bold text-black">{title}</h4>

        <div className="mt-2 space-y-1 text-[13px] leading-5 text-[#4B5563]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
