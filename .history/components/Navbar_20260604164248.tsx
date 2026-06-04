"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";

type LanguageCode =
  | "EN" | "AR" | "DE" | "ES" | "NL" | "PT" | "JA" | "ZH"
  | "FR" | "RO" | "AL" | "EL" | "BG" | "MK" | "SR" | "HR" | "BS";

type LanguageOption = {
  fallback: string;
  code: LanguageCode;
  flagCode: string;
};

const navLinks = [
  { href: "/all-peptides", key: "allPeptides", fallback: "All Peptides" },
  { href: "/popular-peptides", key: "popularPeptides", fallback: "Popular Peptides" },
  { href: "/bundle-save", key: "bundleSave", fallback: "Bundle & Save" },
  { href: "/peptide-research", key: "peptideResearch", fallback: "Peptide Research" },
  { href: "/peptide-information", key: "peptideInformation", fallback: "Peptide Information" },
];

const languageOptions: LanguageOption[] = [
  { fallback: "English", code: "EN", flagCode: "us" },
  { fallback: "Arabic", code: "AR", flagCode: "sa" },
  { fallback: "German", code: "DE", flagCode: "de" },
  { fallback: "Spanish", code: "ES", flagCode: "es" },
  { fallback: "Dutch", code: "NL", flagCode: "nl" },
  { fallback: "Portuguese", code: "PT", flagCode: "pt" },
  { fallback: "Japanese", code: "JA", flagCode: "jp" },
  { fallback: "Chinese", code: "ZH", flagCode: "cn" },
  { fallback: "French", code: "FR", flagCode: "fr" },
  { fallback: "Romanian", code: "RO", flagCode: "ro" },
  { fallback: "Albanian", code: "AL", flagCode: "al" },
  { fallback: "Greek", code: "EL", flagCode: "gr" },
  { fallback: "Bulgarian", code: "BG", flagCode: "bg" },
  { fallback: "Macedonian", code: "MK", flagCode: "mk" },
  { fallback: "Serbian", code: "SR", flagCode: "rs" },
  { fallback: "Croatian", code: "HR", flagCode: "hr" },
  { fallback: "Bosnian", code: "BS", flagCode: "ba" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { itemCount } = useCart();
  const { currentLanguage, setLanguage, translations } = useLanguage();

  const navigation = translations.navigation || {};

  const selectedLanguage =
    languageOptions.find((language) => language.code === currentLanguage) ||
    languageOptions[0];

  const t = (key: string, fallback: string) => navigation[key] || fallback;

  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setLanguageOpen(false);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto flex min-h-[88px] w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex h-16 w-auto items-center"
        >
          <Image
            src="/Ivexia_Peptide.png"
            alt="Ivexia Peptide"
            width={420}
            height={110}
            priority
            className="h-11 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[220px]"
          />
        </Link>

        <div className="hidden flex-1 lg:block">
          <div className="mx-auto flex h-[48px] w-full max-w-2xl items-center rounded-lg border border-[#C7C7C7] bg-white px-4 focus-within:ring-2 focus-within:ring-[#F04423]/20">
            <Search size={18} strokeWidth={2} className="text-[#575B61]" />
            <input
              className="ml-4 w-full text-sm leading-none text-[#24272B] outline-none placeholder:text-[#4B5563]"
              placeholder={t("search", "Search")}
            />
          </div>
        </div>

        <div className="hidden shrink-0 flex-col items-end gap-3 lg:flex">
          <div className="flex items-center gap-7">
            <LanguageMenu
              languageOpen={languageOpen}
              selectedLanguage={selectedLanguage}
              toggleLanguageOpen={() => setLanguageOpen((current) => !current)}
              changeLanguage={changeLanguage}
            />

            <Link
              href="/sign-in"
              className="flex items-center gap-2 text-[15px] font-normal text-black"
            >
              <AccountIcon size={22} />
              {t("signIn", "Sign in")}
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 text-[15px] font-normal text-black"
            >
              <CartIcon itemCount={itemCount} size={23} />
              {t("myCart", "My Cart")}
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="ml-auto lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav className="hidden h-[52px] px-4 sm:px-6 lg:block">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center gap-2 overflow-hidden">
          <div className="flex items-center justify-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="rounded-md px-3 py-2 text-[15px] font-normal text-[#06101F] transition hover:bg-[#FFF2EF] hover:text-[#F04423]"
              >
                {t(link.key, link.fallback)}
              </Link>
            ))}
            <Link
              href="/#about"
              className="rounded-md px-3 py-2 text-[15px] font-normal text-[#06101F] transition hover:bg-[#FFF2EF] hover:text-[#F04423]"
            >
              {t("ourCompany", "Our Company")}
            </Link>

            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-[15px] font-normal text-[#06101F] transition hover:bg-[#FFF2EF] hover:text-[#F04423]"
            >
              {t("contactUs", "Contact Us")}
            </Link>
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#E5E5E5] bg-white px-5 py-5 lg:hidden">
          <div className="mb-5 flex items-center rounded-md border border-[#E5E5E5] px-4 py-3">
            <Search size={18} />
            <input
              className="ml-3 w-full text-sm outline-none"
              placeholder={t("search", "Search")}
            />
          </div>

          <div className="flex flex-col gap-4">
            <LanguageMenu
              languageOpen={languageOpen}
              selectedLanguage={selectedLanguage}
              toggleLanguageOpen={() => setLanguageOpen((current) => !current)}
              changeLanguage={changeLanguage}
              mobile
            />  

            <Link href="/sign-in" className="flex items-center gap-2 text-sm font-medium">
              <AccountIcon size={20} />
              {t("signIn", "Sign in")}
            </Link>

            <Link href="/cart" className="flex items-center gap-2 text-sm font-medium">
              <CartIcon itemCount={itemCount} size={20} />
              {t("myCart", "My Cart")}
            </Link>

            {[
              ...navLinks,
              { href: "/#about", key: "ourCompany", fallback: "Our Company" },
              { href: "/contact", key: "contactUs", fallback: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {t(link.key, link.fallback)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageMenu({
  languageOpen,
  selectedLanguage,
  toggleLanguageOpen,
  changeLanguage,
  mobile = false,
}: {
  languageOpen: boolean;
  selectedLanguage: LanguageOption;
  toggleLanguageOpen: () => void;
  changeLanguage: (code: LanguageCode) => void;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "relative w-fit" : "relative"}>
      <button
        type="button"
        onClick={toggleLanguageOpen}
        className={
          mobile
            ? "flex items-center gap-2 rounded-md border border-[#D8D8D8] px-3 py-2 text-sm font-medium text-[#06101F]"
            : "flex items-center gap-1.5 text-[15px] font-normal text-black"
        }
      >
        {selectedLanguage.code}
        <ChevronDown size={mobile ? 16 : 15} strokeWidth={2} />
      </button>

      {languageOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[190px] overflow-hidden rounded-lg border border-[#E5E5E5] bg-white py-1 shadow-lg lg:left-auto lg:right-0">
          {languageOptions.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => changeLanguage(language.code)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-[#06101F] hover:bg-[#F7F7F7]"
            >
              <span>{language.fallback}</span>
              <span className="text-xs text-[#6B7280]">{language.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountIcon({ size }: { size: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13" cy="7" r="3.65" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5.05 21.15v-1.3c0-3.15 3.55-5.45 7.95-5.45s7.95 2.3 7.95 5.45v1.3c-2.05.55-4.75.85-7.95.85s-5.9-.3-7.95-.85Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon({ itemCount, size }: { itemCount: number; size: number }) {
  return (
    <span className="relative">
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.15 5.2h2.55l1.8 10.15c.15.82.85 1.4 1.68 1.4h8.55c.76 0 1.42-.5 1.63-1.23l1.45-5.12H8.02"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10.9" cy="21.2" r="1.15" fill="currentColor" />
        <circle cx="18.2" cy="21.2" r="1.15" fill="currentColor" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F04423] px-1 text-[11px] font-semibold text-white">
          {itemCount}
        </span>
      )}
    </span>
  );
}
