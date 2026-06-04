"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LanguageCode =
  | "EN" | "AR" | "DE" | "ES" | "NL" | "PT" | "JA" | "ZH"
  | "FR" | "RO" | "AL" | "EL" | "BG" | "MK" | "SR" | "HR" | "BS";

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translations: Translations;
}

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | TranslationValue[]
  | { [key: string]: TranslationValue };

type TranslationObject = { [key: string]: TranslationValue };

type Translations = {
  dir?: string;
  navigation?: Record<string, string>;
  products?: Record<string, TranslationObject>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const languageMap: Record<LanguageCode, string> = {
  EN: "en",
  AR: "ar",
  DE: "de",
  ES: "es",
  NL: "nl",
  PT: "pt",
  JA: "ja",
  ZH: "zh",
  FR: "fr",
  RO: "ro",
  AL: "sq",
  EL: "el",
  BG: "bg",
  MK: "mk",
  SR: "sr",
  HR: "hr",
  BS: "bs",
};

const codeAliases: Record<string, LanguageCode> = {
  EN: "EN",
  AR: "AR",
  DE: "DE",
  ES: "ES",
  NL: "NL",
  PT: "PT",
  JA: "JA",
  ZH: "ZH",
  FR: "FR",
  RO: "RO",
  AL: "AL",
  SQ: "AL",
  EL: "EL",
  BG: "BG",
  MK: "MK",
  SR: "SR",
  HR: "HR",
  BS: "BS",
};

function normalizeLanguageCode(value: string | null): LanguageCode {
  if (!value) {
    return "EN";
  }

  return codeAliases[value.toUpperCase()] || "EN";
}

async function loadTranslations(langCode: LanguageCode): Promise<Translations> {
  try {
    const fileName = languageMap[normalizeLanguageCode(langCode)] || "en";
    const translationModule = await import(`@/data/${fileName}.js`);
    return translationModule.default || {};
  } catch {
    const translationModule = await import(`@/data/en.js`);
    return translationModule.default || {};
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] =
    useState<LanguageCode>("EN");

  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (!active) {
        return;
      }

      const savedLanguage = normalizeLanguageCode(
        localStorage.getItem("selectedLanguage")
      );

      setCurrentLanguageState(savedLanguage);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    loadTranslations(currentLanguage).then((trans) => {
      setTranslations(trans);
      localStorage.setItem("selectedLanguage", currentLanguage);
    });
  }, [currentLanguage]);

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguageState(normalizeLanguageCode(lang));
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    return {
      currentLanguage: "EN" as LanguageCode,
      setLanguage: () => {},
      translations: {},
    };
  }

  return context;
}

export function getNestedValue(obj: TranslationObject, path: string): unknown {
  return path.split(".").reduce<unknown>((current, prop) => {
    if (current && typeof current === "object" && prop in current) {
      return (current as TranslationObject)[prop];
    }

    return undefined;
  }, obj);
}
