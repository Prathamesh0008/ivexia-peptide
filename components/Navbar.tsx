"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { PRODUCTS } from "@/data/products.js";
import type { Product } from "@/data/productTypes";
import { signOut } from "@/app/auth/actions";

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

const secondaryLinks = [
  { href: "/about", key: "ourCompany", fallback: "Our Company" },
  { href: "/contact", key: "contactUs", fallback: "Contact Us" },
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
const profileRef = useRef<HTMLDivElement>(null);

  const { itemCount } = useCart();
  const { currentLanguage, setLanguage, translations } = useLanguage();

  const navigation = translations.navigation || {};

  const selectedLanguage =
    languageOptions.find((language) => language.code === currentLanguage) ||
    languageOptions[0];

  const t = (key: string, fallback: string) => navigation[key] || fallback;

  const products = PRODUCTS as Product[];

  const suggestions = searchQuery.trim()
    ? products
        .filter((product) => {
          const query = searchQuery.toLowerCase();
          return (
            product.name?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query)
          );
        })
        .slice(0, 6)
    : [];

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });
        const data = await res.json();

        setSessionEmail(data.loggedIn ? data.email : null);
      } catch {
        setSessionEmail(null);
      }
    }

    checkSession();
  }, []);
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfileOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setLanguageOpen(false);
    setOpen(false);
  };

  const submitSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
    setSearchFocused(false);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto flex h-[92px] w-full max-w-[1725px] items-center px-[88px] max-xl:px-10 max-lg:h-[82px] max-lg:px-5">
        <Link href="/" className="flex h-full w-[385px] shrink-0 items-center max-xl:w-[320px] max-lg:w-auto">
          <Image
            src="/Ivexia_Peptide.png"
            alt="Ivexia Peptide"
            width={390}
            height={88}
            priority
            className="h-auto w-[380px] object-contain max-xl:w-[310px] max-lg:w-[240px]"
          />
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="relative flex h-[60px] w-full max-w-[933px] items-center rounded-[9px] border border-[#C8C8C8] bg-white px-[28px]">
            <button type="button" onClick={submitSearch} aria-label="Search">
              <Search size={23} strokeWidth={2} className="text-[#5F6368]" />
            </button>

            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitSearch();
              }}
              className="ml-[22px] w-full bg-transparent text-[16px] text-black outline-none placeholder:text-[#5F6368]"
              placeholder={t("search", "")}
            />

            {searchFocused && (
              <SearchSuggestions
                query={searchQuery}
                suggestions={suggestions}
                onKeyword={(keyword) => {
                  setSearchQuery(keyword);
                  router.push(`/search?query=${encodeURIComponent(keyword)}`);
                  setSearchFocused(false);
                }}
              />
            )}
          </div>
        </div>

       <div className="hidden h-full w-[430px] shrink-0 items-center justify-end gap-[24px] lg:flex">
          <LanguageMenu
            languageOpen={languageOpen}
            selectedLanguage={selectedLanguage}
            toggleLanguageOpen={() => setLanguageOpen((current) => !current)}
            changeLanguage={changeLanguage}
          />

  {sessionEmail ? (
  <div ref={profileRef} className="relative shrink-0">
    <button
      type="button"
      onClick={() => setProfileOpen((prev) => !prev)}
      className="flex items-center gap-[8px] whitespace-nowrap text-[17px] font-normal text-black transition hover:text-[#F04423]"
    >
      <AccountIcon size={29} />
      Profile
      <ChevronDown size={15} />
    </button>

    {profileOpen && (
      <div className="absolute right-0 top-full z-[9999] mt-3 w-[190px] overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-xl">
        <Link
          href="/account"
          onClick={() => setProfileOpen(false)}
          className="block px-4 py-3 text-sm font-medium text-[#111827] transition hover:bg-[#FFF2EF] hover:text-[#F04423]"
        >
          My Profile
        </Link>

        <Link
          href="/account/orders"
          onClick={() => setProfileOpen(false)}
          className="block px-4 py-3 text-sm font-medium text-[#111827] transition hover:bg-[#FFF2EF] hover:text-[#F04423]"
        >
          My Orders
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            Logout
          </button>
        </form>
      </div>
    )}
  </div>
) : (
  <Link
    href="/sign-in"
    className="flex shrink-0 items-center gap-[12px] whitespace-nowrap text-[18px] font-normal text-black"
  >
    <AccountIcon size={31} />
    {t("signIn", "Sign in")}
  </Link>
)}

          <Link href="/cart" className="flex items-center gap-[12px] text-[18px] font-normal text-black">
            <CartIcon itemCount={itemCount} size={31} />
            {t("myCart", "My Cart")}
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((current) => !current)} className="ml-auto lg:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav className="hidden h-[70px] lg:block">
        <div className="mx-auto flex h-full w-full max-w-[1725px] items-center justify-between overflow-hidden px-[175px] max-xl:px-20">
          <div className="flex items-center gap-[40px]">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="whitespace-nowrap text-[18px] font-normal text-[#06101F] transition hover:text-[#F04423]"
              >
                {t(link.key, link.fallback)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-[48px]">
            {secondaryLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="whitespace-nowrap text-[18px] font-normal text-[#06101F] transition hover:text-[#F04423]"
              >
                {t(link.key, link.fallback)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#E5E5E5] bg-white px-5 py-5 lg:hidden">
          <div className="mb-5 flex items-center rounded-md border border-[#E5E5E5] px-4 py-3">
            <button type="button" onClick={submitSearch} aria-label="Search">
              <Search size={18} />
            </button>

            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitSearch();
              }}
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

            {sessionEmail ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <AccountIcon size={20} />
                  Profile
                </Link>

                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-left text-sm font-semibold text-[#F04423]"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/sign-in" className="flex items-center gap-2 text-sm font-medium">
                <AccountIcon size={20} />
                {t("signIn", "Sign in")}
              </Link>
            )}

            <Link href="/cart" className="flex items-center gap-2 text-sm font-medium">
              <CartIcon itemCount={itemCount} size={20} />
              {t("myCart", "My Cart")}
            </Link>

            {[...navLinks, ...secondaryLinks].map((link) => (
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

function SearchSuggestions({
  onKeyword,
  query,
  suggestions,
}: {
  onKeyword: (keyword: string) => void;
  query: string;
  suggestions: Product[];
}) {
  const popularKeywords = ["BPC-157", "TB-500", "GHRP-2", "CJC-1295", "GHK-Cu"];

  return (
    <div className="absolute left-0 top-full z-[1000] mt-2 w-full rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-xl">
      {query.trim() === "" ? (
        <>
          <p className="mb-2 text-xs font-semibold text-[#6B7280]">Popular Keywords</p>
          <div className="flex flex-wrap gap-2">
            {popularKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onKeyword(keyword)}
                className="rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs text-[#374151] hover:bg-[#FFF2EF] hover:text-[#F04423]"
              >
                {keyword}
              </button>
            ))}
          </div>
        </>
      ) : suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((product) => {
            const productKey = product.slug || product.id;

            return (
              <Link
                key={productKey}
                href={`/products/${productKey}`}
                className="block rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#FFF2EF] hover:text-[#F04423]"
              >
                <span className="font-semibold">{product.name}</span>
                {product.category && (
                  <span className="ml-2 text-xs text-[#6B7280]">{product.category}</span>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-[#6B7280]">No products found.</p>
      )}
    </div>
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
            : "flex items-center gap-1.5 text-[16px] font-normal text-black"
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
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
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