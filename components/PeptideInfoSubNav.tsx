"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Glossary Home", href: "/peptide-information", aliases: [] },
  {
    label: "Intro to Peptides",
    href: "/peptide-information/intro-to-peptides",
    aliases: [],
  },
  {
    label: "Peptide Storage",
    href: "/peptide-information/peptide-storage",
    aliases: ["/peptide-storage"],
  },
];

export default function PeptideInfoSubNav() {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-[#D1D5DB] bg-[#E5E7EB]">
      <div className="mx-auto flex max-w-7xl justify-center gap-10 px-4 py-3 text-sm sm:px-6">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`) ||
            link.aliases.includes(pathname);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-1 transition ${
                active
                  ? "font-semibold text-[#F04423]"
                  : "text-[#374151] hover:text-[#F04423]"
              }`}
            >
              {link.label}
              {active && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#F04423]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
